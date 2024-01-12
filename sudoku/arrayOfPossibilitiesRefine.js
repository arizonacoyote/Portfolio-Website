function arrayOfPossibilitiesRefine(array, locationArr){
    //check the entries of each row.  If two arrays in the same row, both the same value, and are both of length 2, then both numbers can be removed from the other cells as possibilities. 
    var modifiedArr = array;
    let dstr = JSON.stringify(array);
    var entryFound = false;
    do{
        entryFound = false;
    for(let i=0; i<81; i=i+9){       //start at the first cell in each row
        let cellUnderExamination = locationArr[i];
        let rowUnderExamination = cellUnderExamination[0];
        let rowArrayOfArrays = [];
        for(let j=0; j<9; j++){                               //add each cell in the row to the rowArrayOfArrays;
            let whatKind1=typeof modifiedArr[i];
            let whatKind2=typeof modifiedArr[(i+j)];
            if((whatKind1=='object')&&(whatKind2=='object')){      //not interested in the entries already set as numbers.
                let tempArr = modifiedArr[(j+i)];
                tempArr.sort(function(a,b){return a-b});         //sort the arrays so that order doesn't cause missed entries.
                rowArrayOfArrays.push(tempArr);
            }
            if(j==8 && rowArrayOfArrays.length>0){
                for(let k=0; k<rowArrayOfArrays.length; k++){
                    for(let m=0; m<rowArrayOfArrays.length; m++){
                        if((m!=k)&&(JSON.stringify(rowArrayOfArrays[k])==JSON.stringify(rowArrayOfArrays[m]))&&(rowArrayOfArrays[k].length==2)){   //need to do this JSON.stringify to compare the arrays for equality
                           
                        
                           let stringToConsole = JSON.stringify(rowArrayOfArrays);
                           let remove1 = rowArrayOfArrays[k][0]; 
                           let remove2 = rowArrayOfArrays[k][1];
                           //go through the row and remove the numbers from each array, except the two arrays of length two, which are equal,
                           // which is where the numbers are located, in some order unknown.
                           for(let n=0; n<9; n++){
                               if(JSON.stringify(modifiedArr[n+i])!=JSON.stringify(rowArrayOfArrays[k])){    
                                   let tempEntry = modifiedArr[(n+i)];        //n+i is the position of the 'sub-array' within the 'arrayOfPossibilities' copy equal to 'modifiedArr' being modified.
                                //   console.log('tempEntry',tempEntry);
                                   if(typeof tempEntry == 'object'){               //only do all this if the entry is not already resolved as a number.
                                        let x1 = tempEntry.indexOf(remove1);
                                        if(x1>=0){
                                            tempEntry.splice(x1,1);
                                            entryFound = true;                                     //flip this variable so the process repeats until no more refinements are found.
                                          
                                        }
                                        let x2=tempEntry.indexOf(remove2);
                                        if(x2>=0){
                                            tempEntry.splice(x2,1);
                                            entryFound = true;                                     //flip this variable so the process repeats until no more refinements are found.
                                          
                                        }
                                        if(tempEntry.length==1){
                                            sudokuArray[(n+i)]=tempEntry[0].toString();
                                            modifiedArr[(n+i)]=tempEntry[0];       //mark the resolved number in the modified array as well
                                            let returnArr = [100];
                                            return returnArr;
                                            
                                        }
                                        else{
                                            modifiedArr[(n+i)]=tempEntry;           //after modifying the entry, set the array
                                            }

                                        //log the modified array.    
                                        let b=""; 
                                        for(let p=0; p<9; p++){
                                            let a = JSON.stringify(modifiedArr[(p+i)]);
                                            b += a;
                                            }
                                           
                                    }
                               }
                           }
                        }                                                                                         
                    }
                }
            }
            
        }
      
    }

 //88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    //after checking the entries in the same row as the cell under inspection, repeat the process for the columns.
    console.log('entered second loop-------8888888888888888888888888888888888888888888888888888888');
    for(let i=0; i<9; i++){       //start at the first cell in each column
        
        let cellUnderExamination = locationArr[i];
        let columnUnderExamination = cellUnderExamination[1];
        let rowUnderExamination = cellUnderExamination[0];
        let columnArrayOfArrays = [];
        for(let j=0; j<9; j++){                               //add each cell in the row to the rowArrayOfArrays;
            let whatKind1=typeof modifiedArr[i];
            let whatKind2=typeof modifiedArr[(i+(j*9))];
            if((whatKind1=='object')&&(whatKind2=='object')){      //not interested in the entries already set as numbers.
                let tempArr = array[((j*9)+i)];
                tempArr.sort(function(a,b){return a-b});         //sort the arrays so that order doesn't cause missed entries.
                columnArrayOfArrays.push(tempArr);
            }
            if(j==8 && columnArrayOfArrays.length>0){
                for(let k=0; k<columnArrayOfArrays.length; k++){
                    for(let m=0; m<columnArrayOfArrays.length; m++){
                        if((m!=k)&&(JSON.stringify(columnArrayOfArrays[k])==JSON.stringify(columnArrayOfArrays[m]))&&(columnArrayOfArrays[k].length==2)){   //need to do this JSON.stringify to compare the arrays for equality
                          
                          let stringToConsole = JSON.stringify(columnArrayOfArrays);
                           let remove1 = columnArrayOfArrays[k][0]; 
                           let remove2 = columnArrayOfArrays[k][1];
                           //go through the row and remove the numbers from each array, except the two arrays of length two, which are equal,
                           // which is where the numbers are located, in some order unknown.
                           for(let n=0; n<9; n++){
                               if(JSON.stringify(modifiedArr[((n*9)+i)])!=JSON.stringify(columnArrayOfArrays[k])){    
                                   let tempEntry = modifiedArr[((9*n)+i)];        //(9*n)+i is the position of the 'sub-array' within the 'arrayOfPossibilities' copy equal to 'modifiedArr' being modified.
                                   if(typeof tempEntry == 'object'){               //only do all this if the entry is not already resolved as a number.
                                        let x1 = tempEntry.indexOf(remove1);
                                        if(x1>=0){
                                            tempEntry.splice(x1,1);
                                            entryFound = true;                                     //flip this variable so the process repeats until no more refinements are found.

                                        }
                                        let x2=tempEntry.indexOf(remove2);
                                        if(x2>=0){
                                            tempEntry.splice(x2,1);
                                            entryFound = true;                                     //flip this variable so the process repeats until no more refinements are found.

                                        if(tempEntry.length==1){
                                            sudokuArray[((n*9)+i)]=tempEntry[0].toString();
                                            modifiedArr[((n*9)+i)]=tempEntry[0];       //mark the resolved number in the modified array as well
                                            let returnArr = [100];
                                            return returnArr;       //send a one-entry array with a value of 100 to indicate that a value was set.
                                        }
                                        else{
                                            modifiedArr[(n*9)+i]=tempEntry;           //after modifying the entry, set the array
                                            }

                                        //log the modified array.    
                                        let b=""; 
                                        for(let p=0; p<9; p++){
                                            let a = JSON.stringify(modifiedArr[((9*p)+i)]);
                                            b += a;
                                            }
                                        }
                                           
                                    }
                               }
                           }
                        }                                                                                         
                    }
                }
            }
            
        }
      
    }
//888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
//repeat a similar process for 3x3 mini-grids.  If two cells within a mini-grid have the same two values, and only those values, those values can be taken away from the other cells as
//possible values.

//make arrays of each mini-grid.  Loop through the resulting arrays in the same way as the arrays above.  When a match is found, exclude all the values in the 2 entry array, unless it is 
//identical, as it would be against the rules if there were more than two such arrays.
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

miniGrids.forEach((miniGrid,gridIndex)=>{
    let tmpArr =  [];
    for(let i=0; i<miniGrid.length; i++){
        let x = locationArr.indexOf(miniGrid[i]);       //location of the entry in the locationArr and on the 'modifiedArr'
        tmpArr.push(modifiedArr[x]);                    //entries of the grid into a more easily processed array.
    }
    console.log("temp array for finding matched 2 entry arrays in minigrids: ",tmpArr);
    
    
    
    for(let k=0; k<tmpArr.length; k++){
        for(let m=0; m<tmpArr.length; m++){
            if((m!=k)&&(JSON.stringify(tmpArr[k])==JSON.stringify(tmpArr[m]))&&(tmpArr[k].length==2)){   //need to do this JSON.stringify to compare the arrays for equality
               
               let stringToConsole = JSON.stringify(tmpArr);
              let remove1 = tmpArr[k][0]; 
               let remove2 = tmpArr[k][1];
               //go through the row and remove the numbers from each array, except the two arrays of length two, which are equal,
               // which is where the numbers are located, in some order unknown.
               for(let n=0; n<9; n++){
                   if(!(JSON.stringify(tmpArr[n])==JSON.stringify(tmpArr[k]) && tmpArr[n].length==2)){    
                       let modArrIndex = locationArr.indexOf(miniGrids[gridIndex][n]);        //n+i is the position of the 'sub-array' within the 'arrayOfPossibilities' copy equal to 'modifiedArr' being modified.
                       let tempEntry = modifiedArr[modArrIndex];
                       if(typeof tempEntry == 'object'){               //only do all this if the entry is not already resolved as a number.
                            let x1 = tempEntry.indexOf(remove1);
                            if(x1>=0){
                                tempEntry.splice(x1,1);
                                entryFound = true;                                     //flip this variable so the process repeats until no more refinements are found.
                            }
                            let x2=tempEntry.indexOf(remove2);
                            if(x2>=0){
                                tempEntry.splice(x2,1);
                                entryFound = true;                                     //flip this variable so the process repeats until no more refinements are found.
                            }
                            if(tempEntry.length==1){
                                sudokuArray[(modArrIndex)]=tempEntry[0].toString();
                                modifiedArr[modArrIndex]=tempEntry[0];       //mark the resolved number in the modified array as well
                                let returnArr = [100];
                                return returnArr;
                            }
                            else{
                                modifiedArr[modArrIndex]=tempEntry;           //after modifying the entry, set the array
                                }

                            //log the modified array.    
                            let b=""; 
                            for(let p=0; p<9; p++){
                                let ind = locationArr.indexOf(miniGrids[gridIndex][p]);
                                let a = JSON.stringify(modifiedArr[ind]);
                                b += a;
                                }
                        }
                   }
               }
            }                                                                                         
        }
    }

});



//8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    let modString = JSON.stringify(modifiedArr);
    console.log('modifiedArr ', modString);
    
  }while(entryFound);  
    return modifiedArr;
}