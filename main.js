/*----- constants -----*/
const playerX = "X";
const playerO = "O";
// Levels represent the number of rows and columns
const LEVEL_EASY = 6;
const LEVEL_MEDIUM = 8;
const LEVEL_HARD = 10;

let currPlayer = playerO;

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

function setGrid(){
  tagCellsWithId(matrix0fIds(LEVEL_EASY, LEVEL_EASY));
  centerIds(LEVEL_EASY);
  placeDisc(); 
}

// every div has an event listener - regardles of conditions to place X / O
          // check only when pressed
// check when i 

//function to convert string from event.target.id into an array of 2 numbers

function tagCellsWithId(matrix) {
  matrix.forEach( ([row, column]) => {
    const cell = document.createElement('div');
    cell.className = "cell";
    cell.id = `${row},${column}`;
    grid.appendChild(cell);
  }
  )
};

function centerIds(gridWidth){
  let array = [];
  array.push([ (gridWidth-2)/2, (gridWidth-2)/2 ]);
  array.push([ (gridWidth-2)/2, gridWidth/2 ]);
  array.push([ gridWidth/2, (gridWidth-2)/2 ]);
  array.push([ gridWidth/2, gridWidth/2 ]);
  return array;
};

function matrix0fIds(rows, columns){
  let matrix = [];
  for (let i = 0; i < rows; i++){
      for (let j = 0; j < columns; j++){
          matrix.push([i,j]);
      }
  }
  return matrix;
};

function strIdToNum(strId){
  //convert id from string to number
  let idExt = strId.split(",");
  let rowNum = parseInt(idExt[0]); 
  let colNum = parseInt(idExt[1]);
  //pasrseInt does not mutate the original string input, so have to combine them back together, but should I feed it back to original array?
  idExt = [rowNum, colNum];
  //console.log(idExt);
  return idExt;
};

function numIdToStr(array){
  let strX = array[0].toString();
  let strY = array[1].toString();
  let strId = `${strX},${strY}`;
  return strId;
};

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
};

function getHorAndVerDirAdjIds(array){  
  let horAndVerdirAdjIds = [];
  let x = array[0];
  let y = array[1];
  horAndVerdirAdjIds.push(
    [x-1, y],[x+1, y], //vertically adjacent 
    [x, y-1], [x, y+1], //horizontally adjacent
  );
  return horAndVerdirAdjIds;
};

function getLine0fCells(array){
  let lineOfCells = [];
  let x = array[0];
  let y = array[1];

  // horizontal

  y = array[1];
  for (x = array[0]-1; x >= 0; x--){
    lineOfCells.push(
      [x, y]
      ); 
  }

  for (x = array[0]+1; x < LEVEL_EASY; x++){
    lineOfCells.push(
      [x, y]
      ); 
  }

  // vertical

  x = array[0];
  for (y = array[1]-1; y >= 0; y--){
    lineOfCells.push(
      [x, y]
      ); 
  }

  for (y = array[1]+1; y < LEVEL_EASY; y++){
    lineOfCells.push(
      [x, y]
      ); 
  }

  // diagonal \northwest

  x = array[0];
  y = array[1];

  for (x = array[0], y = array[1]; x < LEVEL_EASY && y < LEVEL_EASY ; x++, y++){
      if (x === LEVEL_EASY-1 || y === LEVEL_EASY-1  ){
        break;
      } else {
        lineOfCells.push(
          [x+1, y+1],
          )
        }
    }

  // diagional \southeast

  x = array[0];
  y = array[1];

  for (x = array[0], y = array[1]; x >= 0 && y >= 0 ; x--, y--){
    if (y === 0 || x === 0){
      break;
    } else {
      lineOfCells.push(
        [x-1, y-1],
        )
      }
  }

  //diagonal /northeast

  x = array[0];
  y = array[1];

  for (x = array[0], y = array[1]; x >=0 && y < LEVEL_EASY; x--, y++){
    if (x === 0 || y === LEVEL_EASY-1){
      break;
    } else {
      lineOfCells.push(
        [x-1, y+1],
        )
      }
    }

  //diagonal /southwest
  x = array[0];
  y = array[1];

  for (x = array[0], y = array[1]; x < LEVEL_EASY && y > 0; x++, y--){
    if (x === LEVEL_EASY-1 ){
      break;
    } else {
      lineOfCells.push(
        [x+1, y-1],
        )
      }
    }

  return lineOfCells;

};
    
function switchPlayer(player){
  if (player === playerX){
    player = playerO;
    console.log("playerO activated")
  } else if (player === playerO){
    player = playerX;
    console.log("playerX activated")
  }
}

function countScore(string){
  let score = 0;
    document.querySelectorAll(".cell").forEach(
      (cell) => {
        if(cell.innerText === string){
          score++;
        }
      })
    // console.log("count", score)
    return score;
}

/*----- render functions -----*/
// what goes here?
setGrid();

/*----- code is based on flow rather than MVC -----*/

/*
1.  Set up a matrix of IDs to represent the individual cells of the grid (divs) - function matrix0fIds
2.  With each array generated from matrix0fIds, divs with className and Ids are created and appended to div.grid. - function tagCellsWithId
3.  Select center cells which are occupied by discs of opposing players. - function centerIds
4.  Determine invalid divs:
      4A. cells that are not empty [SOLVED]
      4B. directly adjacent cells are all empty - function allAdjCellsEmpty [SOLVED]
5.  Determine valid div for each move:
      5A. Identify cells that are on the horizontal, vertical, and diagonal axes - function getLine0fCells [SOLVED]
      5B. Cells on all any of these axes contain at least 1 disc of currPlayer [SOLVED]
    4B. adjacent cells that are occupied - function getDirAdjIds, return if  [SOLVED]
    4C. the horizontally and vertically dirAdjCells must be innerText of opposing player [IN PROG]

5. How do you change player in alternate rounds? [SOLVED]
6. Change innerText [NOT STARTED]
7. Counts of discs on the board tabulated after disc is placed.
*/

const startCells = centerIds(LEVEL_EASY); // produce an array of the center coordinates from grid size (determined by level) 
document.getElementById(startCells[0].toString()).innerText = playerX;
document.getElementById(startCells[1].toString()).innerText = playerO;
document.getElementById(startCells[2].toString()).innerText = playerO;
document.getElementById(startCells[3].toString()).innerText = playerX;


// problem: DON ADD ANYMORE LISTENERS
// INFO CHECK DO FLIP - all within the same place function


// document.querySelectorAll(".cell").forEach(
//   (cell) => {
//     if (cell.innerText === ""){
//       cell.addEventListener("mouseover", function(event){
//         let numId = strIdToNum(event.target.id);
//         let dirAdjCells = getDirAdjIds(numId);
//         //console.log("Directly adjacent cells:", dirAdjCells);
//       })}});
          
// dirAdjCells.forEach(
// (cell) => {
//   let strIdDirAdjCells = numIdToStr(cell);

//   if (document.getElementById(strIdDirAdjCells).innerText !== ""){
//     document.getElementById(event.target.id).addEventListener("mouseover", function(event){
//       event.target.classList.add("available");
//     });
//     document.getElementById(event.target.id).addEventListener("mouseout", function(event){
//       event.target.classList.remove("available");
//     });
//     document.getElementById(event.target.id).addEventListener("click", function(event){
//       event.target.innerText = currPlayer;
//     })}})

// if (event.target.innerText === playerX){
//   currPlayer = playerO;
//   console.log("playerO activated")
// } else {
//   currPlayer = playerX;
//   console.log("playerX activated")
// }
// // console.log(event.target.id);

// let line0fCells = getLine0fCells(strIdToNum(event.target.id));
// line0fCells.forEach(
//   (cell) => {
//     let strIdLine0fCells = numIdToStr(cell);
//     if (document.getElementById(strIdLine0fCells).innerText === currPlayer){
//       document.getElementById(event.target.id).addEventListener("click", function(event){
//         document.getElementById(strIdLine0fCells).classList.add("test");
//       });
//     }
//   }
// )
// // console.log("Line of cells:", line0fCells);

// if (document.getElementById(event.target.id).innerText !== "") {
//   document.getElementById(event.target.id).addEventListener("mouseover", function(event){
//     event.target.classList.remove("available");
//   });
// };

// let scoreX = countScore(playerX);
// let scoreO = countScore(playerO);
// document.querySelector("#countX").innerText = ` ${scoreX}`;
// document.querySelector("#countO").innerText = ` ${scoreO}`;
// if (scoreX > scoreO) {
//   let winner = "Player X";
//   document.querySelector(".status").innerText = `${winner} has won!`
// } else if (scoreO > scoreX) {
//   let winner = "Player O";
//   document.querySelector(".status").innerText = `${winner} has won!`
// } else if (scoreX = scoreO) {
//   document.querySelector(".status").innerText = `It's a tie!`
// }

//MOVE ALONG AXES ONLY WHEN ADJACENT CONTAINS CURRPLAYER -


function placeDisc(){
  document.querySelectorAll(".cell").forEach(
    (cell) => {
      cell.addEventListener("click", function(event){
        //console.log("event target:", event.target);
        //console.log(getDirAdjIds(numId).innerText);

        if (event.target.innerText !== ""){
          console.log("cell is not empty");
          return;
        }

        let targetNumId = strIdToNum(event.target.id); //event target id is a string - needs to be converted to num
        let dirAdjCells = getDirAdjIds(targetNumId); //numId of event target listener generates an output of ids for adjacent cells

        let strIdOfDirAdjCells = dirAdjCells.map(
          (cell) => numIdToStr(cell)
        )

        // console.log("directly adjacent cells:", dirAdjCells);
        // console.log("converted to strings", strIdOfDirAdjCells)

       let allAdjCellsEmpty = strIdOfDirAdjCells.every(
          (cell) => document.getElementById(cell).innerText === ""
       )

       if (allAdjCellsEmpty){
        console.log("all adjacent cells empty")
        return
       };

      //valid

      function checkAdjCells(array){

        const directions = [
          {x: +1, y: 0}, //right
          {x: -1, y: 0}, //left
          {x: 0, y: -1}, //up
          {x: 0, y: +1}, //down
          {x: +1, y: +1}, //southeast
          {x: -1, y:-1}, //northwest
          {x: -1, y: +1}, //northeast
          {x: +1, y: -1}, //southwest
        ]

        let idsToFlip = [];

        for (let dir in directions){
          let row = array[0] + directions[dir].x;
          let col = array[1] + directions[dir].y;
          let strId = document.getElementById(numIdToStr([row, col]));
          console.log(strId, strId.innerText);
          
          if (strId.innerText === "" || strId.innerText === currPlayer){
            continue;
            // console.log(strId, strId.innerText);
          } else if (strId.innerText !== currPlayer) {
            idsToFlip.push(strId);
            console.log(idsToFlip);
            row += directions[dir].x;
            col += directions[dir].y;
            let strIdEnd = document.getElementById(numIdToStr([row, col]));
            // console.log("end" , strIdEnd);
            if (strIdEnd.innerText === currPlayer) {
              event.target.classList.add("available");
              event.target.innerText = currPlayer;
              idsToFlip.map(
                (cell) => cell.innerText = currPlayer
              )
            }
          }
        }
      }
    checkAdjCells(strIdToNum(event.target.id));
    }
      )
  })
}


              // if (currPlayer === playerX){
              //   currPlayer = playerO;
              // } else if (currPlayer === playerO) {
              //   currPlayer = playerX;
              // }

              // switchPlayer(currPlayer);

              // if (currPlayer === playerX){
              //   currPlayer = playerO;
              // } else if (currPlayer === playerO) {
              //   currPlayer = playerX;
              // }