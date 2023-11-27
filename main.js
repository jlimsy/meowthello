/*----- constants -----*/
const playerX = "X";
const playerO = "O";
// Levels represent the number of rows and columns
const LEVEL_EASY = 6;
const LEVEL_MEDIUM = 8;
const LEVEL_HARD = 10;

/*----- cached UI elements  -----*/
const grid = document.querySelector(".grid");
const cells = document.querySelectorAll(".cell"); 
              //array-like output that does not work when assigned to a constant
              //should you select the divs based on the document.createElement("div")


/*----- event listeners -----*/

//
function setUpButtons() {
  document.querySelector("#buttonEasy").addEventListener("click", )
}

/*----- functions -----*/

//function to convert string from event.target.id into an array of 2 numbers

function tagCellsWithId(matrix) {
  matrix.forEach( ([row, column]) => {
    const cell = document.createElement('div');
    cell.className = "cell";
    cell.id = `${row},${column}`;
    grid.appendChild(cell);
  }
  )
}

function centerIds(gridWidth){
  let array = [];
  array.push([ (gridWidth-2)/2, (gridWidth-2)/2 ]);
  array.push([ (gridWidth-2)/2, gridWidth/2 ]);
  array.push([ gridWidth/2, (gridWidth-2)/2 ]);
  array.push([ gridWidth/2, gridWidth/2 ]);
  return array;
}

function matrix0fIds(rows, columns){
  let matrix = [];
  for (let i = 0; i < rows; i++){
      for (let j = 0; j < columns; j++){
          matrix.push([i,j]);
      }
  }
  return matrix;
}

function strIdToNum(strId){
  //convert id from string to number
  let idExt = strId.split(",");
  let rowNum = parseInt(idExt[0]); 
  let colNum = parseInt(idExt[1]);
  //pasrseInt does not mutate the original string input, so have to combine them back together, but should I feed it back to original array?
  idExt = [rowNum, colNum];
  //console.log(idExt);
  return idExt;
}

function numIdToStr(array){
  let strX = array[0].toString();
  let strY = array[1].toString();
  let strId = `${strX},${strY}`;
  return strId;
}

function getDirAdjIds(array){
  let dirAdjIds = [];
  let x = array[0];
  let y = array[1];
  dirAdjIds.push(
    [x-1, y],[x+1, y], //vertically adjacent 
    [x, y-1], [x, y+1], //horizontally adjacent
    [x-1, y-1], [x+1, y+1], //diagonally adjacent
    [x-1, y+1], [x+1, y-1], //diagonally adjacent
    ); 

    //how to exclude negative x and y values?

    let validDirAdjIds = dirAdjIds.filter(
      (array) => array.every( 
        (num) => num >= 0 && num < LEVEL_EASY)
    );

    return validDirAdjIds;
    }

function countScore(){};  


/*----- render functions -----*/
// what goes here?

/*----- code is based on flow rather than MVC -----*/

// 1. set up grid size - probably don't need this

    // function gridSize(x) {
    //   return x * x
    // }

    // totalCells = gridSize(LEVEL_EASY);

//gridWidth = 100px * LEVEL_EASY 

  // create div tag
  // set cell class
  // append
// for (let i = 0; i < totalCells; i++) {  // i = LEVEL_EASY*LEVEL_EASY
//   let cell = document.createElement("div");
//   cell.className = "cell";
//   document.querySelector(".grid").appendChild(cell);
// }

// make gridCells be stored as a 2-d array so that each gridCell is accessible by [x][y]
  // for each div, assign [x][y] values:
    //let [x] = 0, until [y] reaches [6],
    //then [x] becames [1]


    // function createIds(x, y){
    //   let cellIds = [];
    //     for (x = 0; x < 6; x++){
    //         for (y = 0; y < 6; y++){
    //             let cellId = x.toString() + "-" + y.toString();
    //             cellIds.push(cellId);
    //         }
    //     }

    //     return cellIds;
    //   }

/*
1.  Set up a matrix of IDs to represent the individual cells of the grid (divs) - function matrix0fIds
2.  With each array generated from matrix0fIds, divs with className and Ids are created and appended to div.grid. - function tagCellsWithId
3.  Select center cells which are occupied by discs of opposing players. - function centerIds
4.  For the first move of the game, first identify:
    4A. cells that are empty
    4B. adjacent cells that are occupied
    4C. at least one occupied adjacent cells is not your team - not done
5. How do you change player in alternate rounds?
6. Change innerText;


const gridIds = matrix0fIds(LEVEL_EASY, LEVEL_EASY);
/* 
output is an array of coordinates in the following format:
[ 
[0,0], [0,1], [0,2],
[1,0], [1,1], [1,2],
[2,0], [2,1], [2,2],
]
*/

function setGrid(){
  tagCellsWithId(matrix0fIds(LEVEL_EASY, LEVEL_EASY));
  centerIds(LEVEL_EASY);
  placeDisc();
}

setGrid();

// output is observed in the browser



const startCells = centerIds(LEVEL_EASY); // produce an array of the center coordinates from grid size (determined by level) 
/*
output is an array of coordinates:
LEVEL_EASY    [ [ 2, 2 ], [ 2, 3 ], [ 3, 2 ], [ 3, 3 ] ]
LEVEL_MEDIUM  [ [ 3, 3 ], [ 3, 4 ], [ 4, 3 ], [ 4, 4 ] ]
LEVEL_HARD    [ [ 4, 4 ], [ 4, 5 ], [ 5, 4 ], [ 5, 5 ] ]
*/

// document.getElementById("2-2").innerText = "X";
// document.getElementById("2-3").innerText = "O";
// document.getElementById("3-2").innerText = "O";
// document.getElementById("3-3").innerText = "X";

// Specify should I use a for loop for this?
document.getElementById(startCells[0].toString()).innerText = playerX;
document.getElementById(startCells[1].toString()).innerText = playerO;
document.getElementById(startCells[2].toString()).innerText = playerO;
document.getElementById(startCells[3].toString()).innerText = playerX;

// if empty cell, you can click to place disc of current player // how to alternate between players

// if cell !== empty, 

let currPlayer = playerX;

function placeDisc(){
  document.querySelectorAll(".cell").forEach(
    (cell) => {
      if (cell.innerText === ""){
        cell.addEventListener("mouseover", function(event){
          let numId = strIdToNum(event.target.id);
          let dirAdjCells = getDirAdjIds(numId);
          //console.log(dirAdjCells);
          
          dirAdjCells.forEach(
          (cell) => {
            let strId = numIdToStr(cell);
            if (document.getElementById(event.target.id).innerText !== "") {
              document.getElementById(event.target.id).addEventListener("mouseover", function(event){
                event.target.classList.remove("available");
              });
            } else if (document.getElementById(strId).innerText !== ""){
              document.getElementById(event.target.id).addEventListener("mouseover", function(event){
                event.target.classList.add("available");
              });
              document.getElementById(event.target.id).addEventListener("mouseout", function(event){
                event.target.classList.remove("available");
              });
              document.getElementById(event.target.id).addEventListener("click", function(event){
                event.target.innerText = currPlayer;
                console.log(event.target.id);
              });
            }
          }
          )
        })
      }
    })
  }


document.querySelector("#countX").innerText = "Score";
document.querySelector("#countY").innerText = "Score";


function countX(){
  let countX = 0;
  document.querySelectorAll(".cell").forEach(
    (cell) => {
      cell.innerText = "X"
      countX++;
    })
}
  
       
       /*
       if forEach fails, just use this :

         for (i in document.querySelectorAll(".cell") ) {
    if (document.querySelectorAll(".cell")[i].innerText === "") { 
   
       //identify adjacent cells upon mouseover
       document.querySelectorAll(".cell")[i].addEventListener("mouseover", function(event){
         let numId = strIdToNum(event.target.id);
         // console.log(event.target.id);
         let dirAdjCells = getDirAdjIds(numId);
         // console.log(dirAdjCells);
   
         // check if each adjacent cell are not empty

         for (let i in dirAdjCells){
           let strId = numIdToStr(dirAdjCells[i]);
           if (document.getElementById(strId).innerText !== ""){
   
             // if adjacent cells are not empty, cells light up to signal availablity
   
             document.getElementById(event.target.id).addEventListener("mouseover", function(event){
                 event.target.classList.add("available");
               });
   
             document.getElementById(event.target.id).addEventListener("mouseout", function(event){
               event.target.classList.remove("available");
             });

             document.getElementById(event.target.id).addEventListener("click", function(event){
               event.target.innerText = currPlayer;
               console.log(event.target.id);

               if (currPlayer === playerX){
                currPlayer = playerO;
               } else {
                currPlayer = playerX;
              }

             });

           }
          }

           })
         }
       }

*/


// ----------


// for (i in document.querySelectorAll(".cell") ) {
//   if (document.querySelectorAll(".cell")[i].innerText === "") { 
 
//      //identify adjacent cells upon mouseover
//      document.querySelectorAll(".cell")[i].addEventListener("mouseover", function(event){
//        let numId = strIdToNum(event.target.id);
//        // console.log(event.target.id);
//        let dirAdjCells = getDirAdjIds(numId);
//        // console.log(dirAdjCells);
 
//        // check if each adjacent cell are not empty

//        dirAdjCells.forEach(
//         (cell) => {
//           let strId = numIdToStr(cell);
//           if (document.getElementById(strId).innerText !== ""){
//             document.getElementById(event.target.id).addEventListener("mouseover", function(event){
//               event.target.classList.add("available");
//             });
            
//             document.getElementById(event.target.id).addEventListener("mouseout", function(event){
//               event.target.classList.remove("available");
//             });
            
//             document.getElementById(event.target.id).addEventListener("click", function(event){
//               event.target.innerText = currPlayer;
//               console.log(event.target.id);
//             });

//           }
//         }
//        )