const textArea = document.getElementById('text-input');
// import { puzzlesAndSolutions } from './puzzle-strings.js';

let gridRecordArr = [];
let gridRecordStr = '';

//**********************Clear the text area and the grid******* */
document.getElementById("clear-button").addEventListener('click', clearFunction);

function clearFunction(e) {
  for (let j = 0; j < 81; j++) {  //sets all the form values to '.'
    allTiles[j].value = '.';
    gridRecordArr[j] = ".";
  }
  let tempStr = '';
  for (let i = 0; i < 81; i++) {
    tempStr = tempStr + ".";
  }
  textArea.value = tempStr;
  errorMsgArea.textContent = "";
}



/*************************************************************** */

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area
  textArea.value = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
  gridRecordStr = textArea.value;
  gridRecordArr = gridRecordStr.split('');
  //
  //check the length of the string provided
  if (gridRecordStr.length == 81) {
    console.log("string length is the correct size");
  }
  else if (gridRecord < 81) {
    console.log("a string length of 81 is required");

  }
  else { console.log("the provided string is too long.  The first 81 characters will be used") };
  //this for loop will be run after the allTiles variable is set below due to the 'DOMContentLoaded' event listener triggering this function.  I believe this happens in a reliable manner.  So no need to define it. 
  for (let j = 0; j < gridRecordArr.length; j++) {
    allTiles[j].value = gridRecordArr[j];
  }

});




// set up event listeners for each tile in the sudoku grid
let allTiles = document.getElementsByClassName('sudoku-input');
let locationArr = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9'];


//monitor the input tiles for a change, then update the text area if there is one
//loop through the collection and add a listener for each tile
for (let i = 0; i < allTiles.length; i++) {
  allTiles[i].addEventListener('change', changeToTile);
};


var errorMsgArea = document.getElementById("error-msg");

function changeToTile(e) {
  //On a change in tile value, the location is determined by the id, then the corresponding index in the string, then the position in the array representing the grid is altered.  Then a new string is made from that array of record and inserted into the text area.
  let locationStr = e.target.id;
  let position = locationArr.indexOf(locationStr);
  let valueToAdd = e.target.value;
  let regex = /[^1-9\.]/g;        //make sure the character entered is legit
  if (regex.test(valueToAdd)) {     //The HTML form ensures only one digit is entered
    errorMsgArea.textContent = "Please ensure all characters are either numbers, or a period.";

  }
  else {
    errorMsgArea.textContent = "";  //clear any error message sparked by previous error
    gridRecordArr[position] = e.target.value;
    let changeString = gridRecordArr.join("");
    textArea.value = changeString;
    gridRecordStr = changeString; //track the current string in this value

  };



}
//************************************************************************* */



//Monitor the text area and make a change to the tiles corresponding to the text area.
//************************************************************************* */
textArea.addEventListener('change', changeToTextArea);

function changeToTextArea(e) {
  let newTextAreaStr = e.target.value;
  let regex = /[^1-9\.]/g;        //make sure the character entered is legit
  if (regex.test(newTextAreaStr)) {
    console.log("please enter valid characters")
  }
  else {
    let mapToGridArr = newTextAreaStr.split('');
    //console.log(mapToGridArr.length!=81?"Wrong number of characters":"The modified text area has the correct number of characters.  Thanks.");
    for (let k = 0; k < mapToGridArr.length; k++) {
      document.getElementById(locationArr[k]).value = mapToGridArr[k];
    };
    gridRecordStr = newTextAreaStr;
    gridRecordArr = mapToGridArr;   //update the current grid values in these variables.
  }
};
//************************************************************************* */


//Main function used to gather possible numbers for each tile
function possibleNumbers(cell, arr) {
  let possibleNums = [];
  // let currentString = textArea.value;
  let currentArray = arr;
  let rowCurrentNumbers = currentNumbersRow(cell, currentArray);
  let columnCurrentNumbers = currentColumnNumbers(cell, currentArray);
  let currentMiniGrid = currentMiniGridNumbers(cell, currentArray);
  let joinArr = rowCurrentNumbers.concat(columnCurrentNumbers, currentMiniGrid);

  /*After gathering all the numbers present in the row, column, and 'mini-grid' to
   which cell under inspection belongs, see what numbers the open spot could be 
   without repeating a number*/
  for (let i = 1; i <= 9; i++) {
    let indexStr = i.toString();
    if (!(joinArr.includes(indexStr))) {
      possibleNums.push(i);
    }
  }
  return possibleNums;

}


//xxxxxxxx Sub-functions used to gather prohibited numbers for each cell xxxxxxx

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


function currentNumbersRow(cell, arr) {
  let returnArray = [];
  let row = cell[0];
  let currentEntries = [];

  for (let i = 0; i < arr.length; i++) {
    let arrStr = locationArr[i];
    let arrStrNum = parseInt(arr[i]);
    //iterate through the entire 81 entry array.  When going through the array, check the row of the current entry.  If it matches the row of the cell passed in, push the entry into a return array.  If it is a period, don't put it in the array.
    if (arrStr[0] == row && arrStrNum > 0 && arrStrNum < 10)
      returnArray.push(arr[i]);
  }
  return returnArray;
}


function currentColumnNumbers(cell, arr) {
  let col = parseInt(cell[1]);  //the second character in the location reference
  let returnArray = [];

  for (let i = 0; i < 9; i++) {
    let columnToIndex = (col - 1) + (9 * i); //get array positions 0,9,18... 1,10,19... etc
    let arrEntry = arr[columnToIndex];
    if (arrEntry > 0 && arrEntry < 10) {
      returnArray.push(arrEntry);
    }
  }
  return returnArray;
}


function currentMiniGridNumbers(cell, arr) {
  let miniGridIndex = 0;
  let miniGrids = [["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"],
  ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"],
  ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"],
  ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"],
  ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"],
  ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"],
  ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"],
  ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"],
  ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"]]

  miniGrids.forEach((subArray, index) => {
    if (subArray.includes(cell)) {
      miniGridIndex = index;
    }
  })


  let subArray = miniGrids[miniGridIndex];
  let returnArr = [];
  for (let i = 0; i < subArray.length; i++) {
    for (let j = 0; j < locationArr.length; j++) {
      if (subArray[i] == locationArr[j]) {
        if (arr[j] > 0 && arr[j] < 10) {
          returnArr.push(arr[j]);
        }

      }
    }
  }

  return returnArr;
}
/*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-  End  -XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
/*Loop through the large grid until a number cycles do not find any additional numbers to add.  Use the functions above to exclude possible numbers for each cell.  When only one number is possible, put it into the empty cell.  Rinse and repeat. */

let solveButton = document.getElementById("solve-button");
solveButton.addEventListener('click', solveSudoku);
let sudokuArray = [];
let addition = 0;

function solveSudoku() {

  let sudokuStr = textArea.value;
  sudokuArray = sudokuStr.split('');
  if (sudokuArray.length != 81) {
    errorMsgArea.textContent = "Error: Expected puzzle to be 81 characters long.";
    //if the wrong number of characters are passed to the function send an error message and break;
    return;
  };
  let repeatNoAdditions = 0;
  let y = [];
  let arrayOfPossibilities = [];



  do {
    //make sure the 'sudokuStr' reflects the sudokuArray value.  That the two reflect the same entries in the puzzle.
    sudokuStr = sudokuArray.join('');

    addition = 0;
    let doSecondCheck = true;

    //First, run through the sudoku array and see what can be filled in based on the row, column and grid in common with the cell.
    for (let i = 0; i < locationArr.length; i++) {
      let x = parseInt(sudokuArray[i]);
      if (!(x > 0 && x < 10)) {                                   //make sure the cell is empty
        y = possibleNumbers(locationArr[i], sudokuArray);
        if (y.length == 1) {
          sudokuArray[i] = y[0].toString();
          addition++;                                       //increment this variable to indicate that a number was found.
        }
      }
    }

    //after running through the sudoku array with the loop above, construct a nested array for each empty cell containing an array of numbers that aren't excluded.
    //If in a given row or column, there is only one cell that can contain a particular number, then that cell must contain it. 
    arrayOfPossibilities = [];
    y = [];
    let string1 = JSON.stringify(arrayOfPossibilities);
    for (let i = 0; i < locationArr.length; i++) {
      let x = parseInt(sudokuArray[i]);
      if (!(x > 0 && x < 10)) {                          //If there isn't a number already set, see what is possible for that position based on a simple check.  
        y = possibleNumbers(locationArr[i], sudokuArray);
        if (y.length == 1) {
          sudokuArray[i] = y[0].toString();
          addition++;
          doSecondCheck = false;
          break;                                                //if a number is found. Set it and restart the above loop.    
        }                                                       //Bypass the more complicated checks by setting the 'doSecondCheck' variable to false.
        else {
          arrayOfPossibilities.push(y);                            //set the array entry to an array of what is possible.
        }
      }
      else {
        arrayOfPossibilities.push(x);                               //set the array entry to the number that has already been set.
      }
    }
    string1 = JSON.stringify(arrayOfPossibilities);
    var modified = [];
    if (doSecondCheck) { modified = arrayOfPossibilitiesRefine(arrayOfPossibilities, locationArr) };  //skip this if a new number was found.  Repeat the simple check first.
    if (doSecondCheck || (modified.length > 5)) { firstArrayCheck(modified) }        //run the check based on possible numbers of other cells if nothing was found in the 'first-level' search.
    // if(modified.length==1){addition++};   //causes a infinite loop
    if (addition == 0) { repeatNoAdditions++; console.log('looped without finding a number=================================================================') }
  } while (repeatNoAdditions < 25);

  //check that there are no repeats by verifying that all nine numbers are used in 
  //each row,and in each 'mini-grid'. **********************************************

  let tempSudokuArr = sudokuArray;
  let idealArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  let rowRepeat = false;
  let columnRepeat = false;
  let miniGridRepeat = false;

  //Loop through each row, column and mini-grid and look for repeat entries.

  for (let i = 0; i < 81; i = i + 9) {
    let x1 = currentNumbersRow(locationArr[i], tempSudokuArr);
    let temp = x1.sort();
    for (let j = 0; j < 9; j++) {
      if (temp[j] != idealArray[j]) {
        rowRepeat = true;     //if there is a repeat in the row,  flip this variable and trigger an error message below.
      }
    }
    if (rowRepeat) {
      errorMsgArea.textContent = "Error: puzzle invalid.  Row numbers repeated.";
      // return;
    }
  }

  for (let i = 0; i < 9; i++) {
    let x2 = currentColumnNumbers(locationArr[i], tempSudokuArr);
    let temp = x2.sort();
    for (let j = 0; j < 9; j++) {
      if (temp[j] != idealArray[j]) {
        columnRepeat = true;     //if there is a repeat in the row,  flip this variable and trigger an error message below.
      }
    }
    if (columnRepeat) {
      errorMsgArea.textContent = "Error: puzzle invalid. Column numbers repeated.";
      // return;
    }
  }

  for (let i = 0; i < 81; i = i + 3) {
    let x3 = currentMiniGridNumbers(locationArr[i], tempSudokuArr);
    let temp = x3.sort();
    for (let j = 0; j < 9; j++) {
      if (temp[j] != idealArray[j]) {
        miniGridRepeat = true;     //if there is a repeat in the row,  flip this variable and trigger an error message below.
      }
    }
    if (miniGridRepeat) {
      errorMsgArea.textContent = "Error: puzzle invalid. Repeated numbers in a mini-grid";
      // return;
    }
  }

  if (!(rowRepeat || columnRepeat || miniGridRepeat)) {    //valid if no error triggered
    errorMsgArea.textContent = "Puzzle is valid";

  }
  // ****************** End check solution validity **********************

  gridRecordArr = sudokuArray;   //change the array of record for display
  gridRecordStr = sudokuArray.join(''); //change the string of record for display
  textArea.value = gridRecordStr;
  let passObj = { target: { value: gridRecordStr } };
  //make an object with the expected structure so it can be passed to the existing function.
  changeToTextArea(passObj);
  if (sudokuArray.includes('.')) {
    alert("A solution wasn't found");
  }
}

