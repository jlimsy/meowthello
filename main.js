/*----- constants -----*/
const playerX = "X";
const playerO = "O";
const GRID_SMALL = 6;
const GRID_MEDIUM = 8;
const GRID_LARGE = 10;
const directions = [
  {x: -1, y: 0}, //up
  {x: +1, y: 0}, //down
  {x: 0, y: -1}, //left
  {x: 0, y: +1}, //right
  {x: +1, y: +1}, //southeast
  {x: -1, y:-1}, //northwest
  {x: -1, y: +1}, //northeast
  {x: +1, y: -1}, //southwest
]

let currPlayer = playerO;


/*----- cached UI elements  -----*/
const grid = document.querySelector(".grid");
const cells = document.querySelectorAll(".cell"); 
const currPlayerDisplay = document.getElementById("current");
const statusMessage = document.querySelector('.message');
const winnerStatus = document.querySelector(".winner");


/*----- event listeners -----*/

//
function setUpButtons() {
  document.querySelector("#buttonEasy").addEventListener("click", )
}

/*----- functions -----*/

function setGrid(){
  tagCellsWithId(matrixOfIds(GRID_SMALL, GRID_SMALL));
  centerIds(GRID_SMALL);
  highlightCells();
  placeDisc(); 
}

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

function matrixOfIds(rows, columns){
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

function withinGridSize(row, col, gridSize){
  return row >=0 && row < gridSize && col >=0 && col < gridSize
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
        (num) => num >= 0 && num < GRID_SMALL)
    );

    return validDirAdjIds;
};

function switchPlayer(player){

  if(player.innerText === currPlayer){
    if (currPlayer === playerX){
      currPlayer = playerO;
      currPlayerDisplay.innerText = currPlayer
    } else if (currPlayer === playerO) {
      currPlayer = playerX;
      currPlayerDisplay.innerText = currPlayer
    }
  }

};

function fillGrid(){
  const players = [playerX, playerO];

  document.querySelectorAll(".cell").forEach(
    (cell) => {
      const randomIndex = Math.floor(Math.random() * players.length);
      const randomPlayers = players[randomIndex];
      cell.innerText = randomPlayers
    }
  )
};

function flipDiscs(arrayOfIds){
  arrayOfIds.map(
    (cell) => {
      document.getElementById(numIdToStr(cell)).innerText = currPlayer
    }
  ); 
};

// function getHorAndVerDirAdjIds(array){  
//   let horAndVerdirAdjIds = [];
//   let x = array[0];
//   let y = array[1];
//   horAndVerdirAdjIds.push(
//     [x-1, y],[x+1, y], //vertically adjacent 
//     [x, y-1], [x, y+1], //horizontally adjacent
//   );
//   return horAndVerdirAdjIds;
// };

// function getLineOfCells(array){
//   let lineOfCells = [];
//   let x = array[0];
//   let y = array[1];

//   // horizontal

//   y = array[1];
//   for (x = array[0]-1; x >= 0; x--){
//     lineOfCells.push(
//       [x, y]
//       ); 
//   }

//   for (x = array[0]+1; x < GRID_SMALL; x++){
//     lineOfCells.push(
//       [x, y]
//       ); 
//   }

//   // vertical

//   x = array[0];
//   for (y = array[1]-1; y >= 0; y--){
//     lineOfCells.push(
//       [x, y]
//       ); 
//   }

//   for (y = array[1]+1; y < GRID_SMALL; y++){
//     lineOfCells.push(
//       [x, y]
//       ); 
//   }

//   // diagonal \northwest

//   x = array[0];
//   y = array[1];

//   for (x = array[0], y = array[1]; x < GRID_SMALL && y < GRID_SMALL ; x++, y++){
//       if (x === GRID_SMALL-1 || y === GRID_SMALL-1  ){
//         break;
//       } else {
//         lineOfCells.push(
//           [x+1, y+1],
//           )
//         }
//     }

//   // diagional \southeast

//   x = array[0];
//   y = array[1];

//   for (x = array[0], y = array[1]; x >= 0 && y >= 0 ; x--, y--){
//     if (y === 0 || x === 0){
//       break;
//     } else {
//       lineOfCells.push(
//         [x-1, y-1],
//         )
//       }
//   }

//   //diagonal /northeast

//   x = array[0];
//   y = array[1];

//   for (x = array[0], y = array[1]; x >=0 && y < GRID_SMALL; x--, y++){
//     if (x === 0 || y === GRID_SMALL-1){
//       break;
//     } else {
//       lineOfCells.push(
//         [x-1, y+1],
//         )
//       }
//     }

//   //diagonal /southwest
//   x = array[0];
//   y = array[1];

//   for (x = array[0], y = array[1]; x < GRID_SMALL && y > 0; x++, y--){
//     if (x === GRID_SMALL-1 ){
//       break;
//     } else {
//       lineOfCells.push(
//         [x+1, y-1],
//         )
//       }
//     }

//   return lineOfCells;

// };

function countScore(string){
  let score = 0;
    document.querySelectorAll(".cell").forEach(
      (cell) => {
        if(cell.innerText === string){
          score++;
        }
      })
    //console.log(`count`, score)
    return score;
};

function scoreReport(scoreX, scoreO){    
  document.querySelector(".game").innerText = "Game Over!"
    if (scoreX > scoreO) {
      let winner = "Player X";
      winnerStatus.innerText = `${winner} has won!`
    } else if (scoreO > scoreX) {
      let winner = "Player O";
      winnerStatus.innerText = `${winner} has won!`
    } else if (scoreX === scoreO) {
      winnerStatus.innerText = `It's a tie!`
  }
}


/*----- render functions -----*/
// what goes here?
setGrid();

/*----- code is based on flow rather than MVC -----*/


const startCells = centerIds(GRID_SMALL); // produce an array of the center coordinates from grid size (determined by level) 
document.getElementById(startCells[0].toString()).innerText = playerX;
document.getElementById(startCells[1].toString()).innerText = playerO;
document.getElementById(startCells[2].toString()).innerText = playerO;
document.getElementById(startCells[3].toString()).innerText = playerX;

statusMessage.innerText = "Select a cell to place disc:";
currPlayerDisplay.innerText = currPlayer

function placeDisc(){

  let isValidCell;
  
  document.querySelectorAll(".cell").forEach(
    (cell) => {
      cell.addEventListener("click", function(event){
        console.log("---------- EVENT TARGET:", event.target.id);
  
        //SPECIFY THE INVALID CELLS
        if (event.target.innerText !== ""){
          statusMessage.innerText = "Invalid Cell: This cell is occupied.";
          return isValidCell = false;
        }

        let targetNumId = strIdToNum(event.target.id); //event target id is a string - needs to be converted to num
        let dirAdjCells = getDirAdjIds(targetNumId); //numId of event target listener generates an output of ids for adjacent cells
        // console.log("array of ids of directly adjacent cells", dirAdjCells);

        let strIdOfDirAdjCells = dirAdjCells.map(
          (cell) => numIdToStr(cell)
        )
        // console.log("array of ids of directly adjacent cells converted to strings", strIdOfDirAdjCells)

       let allAdjCellsEmpty = strIdOfDirAdjCells.every(
          (cell) => document.getElementById(cell).innerText === ""
       )

       if (allAdjCellsEmpty){
        statusMessage.innerText = "Invalid Move: All adjacent cells are empty.";
        return isValidCell = false;
       };

       // SPECIFY THE VALID CELLS

      function checkAdjCells(array){
        let idsToFlip = [];

        for (let dir in directions){
          let row = array[0] + directions[dir].x;
          let col = array[1] + directions[dir].y;

          let strIdAdjCells = document.getElementById(numIdToStr([row, col]));
          // console.log(strId.id, "innerText:", strId.innerText);

          if (withinGridSize(row, col, GRID_SMALL)){
            if (strIdAdjCells.innerText === "" || strIdAdjCells.innerText === currPlayer){
              // console.log("adjacent cell:", strId.id, "innerText", strId.innerText);
              continue;
            }
            
            if (strIdAdjCells.innerText !== currPlayer) {

              // console.log("adjacent cell:", strId.id, "innerText", strId.innerText);
                
              for (let step = 1; step < GRID_SMALL-1; step++){
                let rowChain = array[0] + (step * directions[dir].x);
                let colChain = array[1] + (step * directions[dir].y);
                // console.log("chain of coordinates", rowChain, colChain);

                if (withinGridSize(rowChain, colChain, GRID_SMALL)){

                  let strIdEndOfChain = document.getElementById(numIdToStr([rowChain, colChain]));
                  // console.log(strIdEnd.id, `${strIdEnd.innerText}`);
                  
                  if (strIdEndOfChain.innerText === currPlayer) {
                    document.querySelector('.message').innerText = "Valid Cell";
                    event.target.innerText = currPlayer; //place the disc
                    
                    for (let i = 1; i < step; i++) {
                      let rowFlip = array[0] + i * directions[dir].x;
                      let colFlip = array[1] + i * directions[dir].y;
                      idsToFlip.push([rowFlip, colFlip]);
                    }

                    // console.log("idsToFlip:", idsToFlip);

                    break;
                    
                  } 
                }
              }
              flipDiscs(idsToFlip)
            }

          };

        }
        
        let scoreX = countScore(playerX);
        let scoreO = countScore(playerO);
        document.querySelector("#countX").innerText = scoreX;
        document.querySelector("#countO").innerText = scoreO;
        
      }

      checkAdjCells(targetNumId);
      // SWITCH PLAYER INSIDE OF placeDisc() BUT OUTSIDE checkAdjCells();
      switchPlayer(event.target);

      function gameStatus(){
        let gameOver;
        
        let allCellsOccupied = Array.from(document.querySelectorAll(".cell")).every(
            (cell) => cell.innerText !== ""
          )

          if (allCellsOccupied){
            document.querySelector(".game").innerText = "Game Over!"
            let scoreX = countScore(playerX);
            let scoreO = countScore(playerO)
            scoreReport(scoreX, scoreO);
            return gameOver = true;
          }

      }

      gameStatus();
      
    }
    )
  })
}

function highlightCells(){
  
  let isValidCell; 

  document.querySelectorAll(".cell").forEach(
    (cell) => {
      cell.addEventListener("mouseover", function(event){
  
        //SPECIFY THE INVALID CELLS
        if (event.target.innerText !== ""){
          return isValidCell = false;
        }

        let targetNumId = strIdToNum(event.target.id); //event target id is a string - needs to be converted to num
        let dirAdjCells = getDirAdjIds(targetNumId); //numId of event target listener generates an output of ids for adjacent cells
        // console.log("array of ids of directly adjacent cells", dirAdjCells);

        let strIdOfDirAdjCells = dirAdjCells.map(
          (cell) => numIdToStr(cell)
        )
        // console.log("array of ids of directly adjacent cells converted to strings", strIdOfDirAdjCells)

       let allAdjCellsEmpty = strIdOfDirAdjCells.every(
          (cell) => document.getElementById(cell).innerText === ""
       )

       if (allAdjCellsEmpty){
        return isValidCell = false;
       };

       // SPECIFY THE VALID CELLS

      function checkAdjCells(array){
        let idsToFlip = [];
        
        for (let dir in directions){
          let row = array[0] + directions[dir].x;
          let col = array[1] + directions[dir].y;

          let strIdAdjCells = document.getElementById(numIdToStr([row, col]));
          // console.log(strId.id, "innerText:", strId.innerText);

          if (withinGridSize(row, col, GRID_SMALL)){
            if (strIdAdjCells.innerText === "" || strIdAdjCells.innerText === currPlayer){
              // console.log("adjacent cell:", strId.id, "innerText", strId.innerText);
              continue;
            }
            
            if (strIdAdjCells.innerText !== currPlayer) {

              // console.log("adjacent cell:", strId.id, "innerText", strId.innerText);
                
              for (let step = 1; step < GRID_SMALL-1; step++){
                let rowChain = array[0] + (step * directions[dir].x);
                let colChain = array[1] + (step * directions[dir].y);
                // console.log("chain of coordinates", rowChain, colChain);

                if (withinGridSize(rowChain, colChain, GRID_SMALL)){

                  let strIdEndOfChain = document.getElementById(numIdToStr([rowChain, colChain]));
                  // console.log(strIdEnd.id, `${strIdEnd.innerText}`);
                  
                  if (strIdEndOfChain.innerText === currPlayer) {
                    event.target.classList.add("available");
                    
                    for (let i = 1; i < step; i++) {
                      let rowFlip = array[0] + i * directions[dir].x;
                      let colFlip = array[1] + i * directions[dir].y;
                      idsToFlip.push([rowFlip, colFlip]);
                    }

                    break;
                    
                  } 
                }
              }
              
            }

          };

        }
        
      }

      checkAdjCells(targetNumId); 
    }
    )
    
    cell.addEventListener("mouseout", function(event){
      cell.classList.remove("available");
    })

  })
}

// scoreReport(scoreX, scoreO)

document.getElementById("fill").addEventListener("click", function(){
  fillGrid();
  let scoreX = countScore(playerX);
  let scoreO = countScore(playerO);
  document.querySelector("#countX").innerText = scoreX;
  document.querySelector("#countO").innerText = scoreO;
  scoreReport(scoreX, scoreO)
})


