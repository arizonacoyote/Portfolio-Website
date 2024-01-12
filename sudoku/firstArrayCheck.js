function firstArrayCheck(array){
    for (let i=0; i<array.length; i++){
        let skipTheRest = false;
        let skipTheRest2 = false;
        let cellOptionsRow = [];
        let cellOptionsColumn =[];
      
        let examinedCell = array[i];
        if(typeof examinedCell == 'object'){
            let cellName = locationArr[i];
            let row = cellName[0];          //first letter in the string
            let column = cellName[1];
            let rowOptions = [];
            let columnOptions = [];
            
            //get possibile entries for the empty cells in the same row as the cell under examination
            for(let j=0; j<81; j++){
                let cellName2 = locationArr[j];
                let row2 = cellName2[0];  
                //if the cell isn't the in the same position as the one under examination, it contains an array, and is in the same row, add its numbers.
                         
                if(i!=j && typeof array[j]=='object' && row==row2 ){  
                    let tempRow=array[j];
                    tempRow.forEach((x)=>{
                      rowOptions.push(x)
                      });
                }
            }
            
            //see if any of the possible entries in the cell under examination is unique among the other row possibilities.  
            //If so, then that number must belong to the current position.  Indexed by 'i'.
          examinedCell.forEach((x)=>{
              if(!(rowOptions.includes(x))){
                  cellOptionsRow.push(x);
              }
           })
  
          if(cellOptionsRow.length==1){
            sudokuArray[i]=cellOptionsRow[0].toString();
            skipTheRest=true;
            
          }
  
          if(skipTheRest){
            break;} 
  
          if(!skipTheRest){
            //get possible entries for the empty cells in the same column as the cell under examination
            for(let k=0; k<81; k++){
                let cellName3= locationArr[k];
                let column3 = cellName3[1];
                if(i!=k && typeof array[k]=='object' && column==column3){
                    let tempCol = array[k];
                    tempCol.forEach((x)=>{columnOptions.push(x)});
                   // console.log('column Options: ',columnOptions);
                }
            }
  
            //see if any of the possible entries in the cell under examination is unique among the other column possibilities.  
            //If so, then that number must belong to the current position.  
            examinedCell.forEach((x)=>{
               if(!(columnOptions.includes(x))){
                cellOptionsColumn.push(x);   
               }
            })
  
             if(cellOptionsColumn.length==1){
              sudokuArray[i]=cellOptionsColumn[0].toString();
              break;
              skipTheRest2 = true;
              
          }
          // If looking for matches based on possibilities within rows and columns doesn't turn up new numbers,
          //look for matches within mini-grids.  If two cells can both only be either of the two same values, the other cells in the 3x3 grid can't be either of those values.
          //So remove them as possibilities from those cells. Similar logic holds for three cells with the same three potential values, and four, etc.  Not sure that needs to be programmed.
          if(!skipTheRest2){
            
            //look for matches of two-value arrays within mini-grids. 
          
            // function currentMiniGridNumbers(cell,arr){
              let miniGridIndex = 0;
              let miniGrids = [["A1","A2","A3","B1","B2","B3","C1","C2","C3"],
              ["A4","A5","A6","B4","B5","B6","C4","C5","C6"],
              ["A7","A8","A9","B7","B8","B9","C7","C8","C9"],
               ["D1","D2","D3","E1","E2","E3","F1","F2","F3"],
              ["D4","D5","D6","E4","E5","E6","F4","F5","F6"],
               ["D7","D8","D9","E7","E8","E9","F7","F8","F9"],
              ["G1","G2","G3","H1","H2","H3","I1","I2","I3"],
               ["G4","G5","G6","H4","H5","H6","I4","I5","I6"],
              ["G7","G8","G9","H7","H8","H9","I7","I8","I9"]]
            
              miniGrids.forEach((subArray,index)=>{
                if (subArray.includes(cellName)){                    //'cellName' is the cell being examined, not the cells whose 'potential' values are examined.
                  miniGridIndex = index;
                }
              })
               
              let subArrayOfPossibilities = [];
              let subArray= miniGrids[miniGridIndex];               //the array of 'A1', 'A2',... locations in the 3x3 grid. 
  
              for(let i=0; i<subArray.length; i++){                 //go to each entry in the 3x3 'mini-grid' and extract the potential value arrays into another array.
                for(let j=0; j<locationArr.length; j++){            // find the index in the 81-entry 'arrayOfPossibilities' by referring to the 'locationArr'
                  if ((subArray[i]==locationArr[j])&&(subArray[i]!=cellName)){
                    let tempCell = array[j];
                    if(typeof tempCell == 'object'){tempCell.sort(function(a, b){return a - b});}
                    subArrayOfPossibilities.push(tempCell);        //order the sub-array within the 3x3 'minigrid' from lowest to highest so that [1,2] and [2,1] are evaluated as identical.
                   }
                }
              }
  
              //look for matches of 2 entry arrays.  
              let tempArr = examinedCell;
              let tempArrMatches = [];
              for(let k=0; k<subArrayOfPossibilities.length; k++){
                  for(let m=0; m<subArrayOfPossibilities.length; m++){
                    if((JSON.stringify(subArrayOfPossibilities[k])==JSON.stringify(subArrayOfPossibilities[m])) && (m!=k)){         //if a match of two different entries is found
                      if(subArrayOfPossibilities[k].length == 2){                               // and if the matched entry is two entries in length, remove all matching values from the cell under examination
                       console.log('found two sub arrays within the mini grid of length two, having two matching entries');
                       tempArrMatches.push(subArrayOfPossibilities[m][0]);                      //the arrays found will have two entries.  Push each number.
                       tempArrMatches.push(subArrayOfPossibilities[m][1]);
                      }}}}
              
              let examinedCellReduced = [];
              for(let n=0; n<tempArr.length; n++){              //run through the cell entry having the possible values for the cell in an array as numbers.  Only push if the value isn't included in the matched array entries.  This reduces the possible values.
                if(!(tempArrMatches.includes(tempArr[n]))){
                   examinedCellReduced.push(tempArr[n]);
                }
              }
  
              
            
              if(examinedCellReduced.length==1){                //after the values 'taken' by other cells in  the 3x3 grid are subtracted from the cell under examination, if there is only one possible value, set it.
                let tempOutput = examinedCellReduced[0].toString();
                sudokuArray[i]=tempOutput;
                break;
              }
  
                
          }
        }
           
              
    }
  }
  }