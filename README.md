# Reversi

Reversi is a two-player game on a 8 x 8 board. Each player is represented a coloured disc - black or white. The objective is to have the most number of discs of your colour at the end of the game.

The game begins from the center of the grid with 2 discs representing each player. Player 1 (e.g. black) places his disc on an empty cell adjacent to discs of Player 2 (e.g. white), and all the discs of Player 2 (white) situated between the newly placed disc and will have their colour reversed to Player 1's colour (black).

**Rules**

- Discs can only be placed on an empty cell adjacent to cell occupied by color of the opposing player.
- Disc at the end has to be of the same colour.

## Coding the game -

### Screens:

#### 1. screenStart

**HTML Elements**

- buttonStart
- buttonLevel
- buttonInstructions (optional)

**DOM**

- buttonStart > screenGame (see 2)
- buttonInstructions > screenInstructions

#### 2. screenGame

**HTML Elements**

- Create 8 x 8 board
- id each boardCell:
- [0][0], [0][1], [0][2], [0][3], [0][4], [0][5]
- [1][0], [1][1], [1][2]
- selectColour - select your color (or automatically assigned such that first player will always be black)

**DOM**

- selectTile - select adjacent empty grid cell to place disc > blackDisc appears

### Logic

- Initial tiles are fixed at positions:
- board[2][2]: O | board[2][3]: X
- board[3][2]: X | board[3][3]: 0 (6 by 6 grid)
- discs can only be placed in cells:
  - IF it is empty: [x][y] = ""
  - AND when the horizontally adjacent ([x-1][y] || [x+1][y]) have a disc that is !== currPlayer
  - AND when the vertically adjacent: ([x][y-1] || [x][y+1]) have a disc that is !== currPlayer
  - AND when the diagonally adjacent: [x-1][y-1] || [x+1][y-1] || [x-1][y+1] || [x+1][y+1] !== currPlayer
  - AND when the cell at the end of a line of discs of prevPlayer (horizontally, vertically, diagnonally) == currPlayer

_How is this done?_

currPlayer wnat to place a disc [x][y], if any of the cells (indicated above) !== ""
check vertically upwards:

- IF [x][y-1] !== "", check if [x][y-2], [x][y-3], [x][y-4]... === disc of currPlayer
- IF [x][]

- Once a cell with disc !== currPlayer has been detected,

### Model - Source of truth / things to keep track of?

- Level and grid size
- Registering which cell has been occupied
- Registering the current player, so that that it will be the next player's turn
- countOfDiscs at the end for winner
