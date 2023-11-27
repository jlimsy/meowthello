

// function createIds(x, y){
//     let cellIds = [];
//     for (x = 0; x < 6; x++){
//         for (y = 0; y < 6; y++){
//             let cellId = x.toString() + "-" + y.toString();
//             cellIds.push(cellId);
//         }
//     }
//     return cellIds;
//   }
  

//   console.log(createIds(0,0));

// function createGrid(rows, columns){
//     let grid = [];
//     for (let i = 0; i < rows; i++){
//         for (let j = 0; j < columns; j++){
//             grid.push([i,j]);
//         }
//     }
//     return grid;
//     }
    

// console.log(createGrid(4, 4));

/*
expected output =[ 
    [0,0], [0,1], [0,2],
    [1,0], [1,1], [1,2],
    [2,0], [2,1], [2,2]
    ]
*/


/*

4 by 4 grid
[
  [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ],
  [ 1, 0 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ],
  [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ],
  [ 3, 0 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ]
]



6 by 6 grid
[
  [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], 
  [ 1, 0 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ],
  [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ], [ 2, 4 ], [ 2, 5 ], 
  [ 3, 0 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 3, 4 ], [ 3, 5 ],
  [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], 
  [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ],
]



/* 
in a 4 by 4 grid, the center cells are occupied:
[ 1, 1 ][ 1, 2 ]
[ 2, 1 ][ 2, 2 ]

in a 6 by 6 grid, the center cells are occupied:
[ 2, 2 ][ 2, 3 ]
[ 3, 2 ][ 3, 3 ]

identifying the center 2x2 grid
[ (rowNum-2)/2, (rowNum-2)/2 ] , [ (rowNum-2)/2, rowNum/2 ]
[ rowNum/2, (rowNum-2)/2 ] , [ rowNum/2, rowNum/2 ]

*/

// function centerIds(gridWidth){
//     let array = [];
//     array.push([ (gridWidth-2)/2, (gridWidth-2)/2 ]);
//     array.push([ (gridWidth-2)/2, gridWidth/2 ]);
//     array.push([ gridWidth/2, (gridWidth-2)/2 ]);
//     array.push([ gridWidth/2, gridWidth/2 ]);
//     return array;
// }

// let startCells = centerIds(6)
// console.log(startCells[0].toString())
// console.log(startCells[3])
// // console.log(centerIds(8))
// // console.log(centerIds(10))


// function adjCellsId(x,y){
//   let arrayOfAdjIds = [];
//   let rowNum = x;
//   let colNum = y;
//   // let neg = function(x) {
//   //   x < 0;
//   // }
  
//   for (let x = rowNum; x < 6; x++){
//     for (let y = colNum; y < 6; y++){
//       arrayOfAdjIds.push([x,y]);
//       }
//     }

//       // if (dirAdjIds[i].some(neg)){
//       //   console.log("neg number present")
//       // }

//     return arrayOfAdjIds;

// }

// console.log(adjCellsId(1,0));

// directly adjacent cells

// function getAdjIds(array){
//   let dirAdjIds = [];
//   let x = array[0];
//   let y = array[1];

//   dirAdjIds.push(
//     [x-1, y],[x+1, y], //vertically adjacent 
//     [x, y-1], [x, y+1], //horizontally adjacent
//     [x-1, y-1], [x+1, y+1], //diagonally adjacent
//     [x-1, y+1], [x+1, y-1], //diagonally adjacent
//     ); 

//   let validDirAdjIds = dirAdjIds.filter(
//     (array) => array.every( 
//       (num) => num >= 0 && num < LEVEL_EASY)
//   );

//   return validDirAdjIds;

//   }

// console.log(getAdjIds([0,5]));

// [ [], [], [] ]


/* 
expected output:
vertically adjacent [0,1], [2,1]
horizontally adjacent [1,0], [1,2] 
diagonally adjacent [0,0], [2,2], [0,2], [2,0]
*/


// function to convert numIdtoStr

// function numIdToStr(array){
//   let strX = array[0].toString();
//   let strY = array[1].toString();
//   let strId = `${strX},${strY}`

//   return strId;
// }

// console.log(numIdToStr([0, 1]));

const playerX = "X";
const playerO = "O";


function switchPlayer(currPlayer){
  let currPlayer = playerX;
  if (currPlayer === playerX){
    currPlayer === playerO;
    console.log(playerO);
  } else if (currPlayer === playerO) {
    currPlayer === playerX;
    console.log(playerX);
  }
  return currPlayer
}

switchPlayer(currPlayer);
switchPlayer(currPlayer);
switchPlayer(currPlayer);
