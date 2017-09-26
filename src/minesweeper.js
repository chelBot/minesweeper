const generatePlayerBoard = function(numberOfRows, numberOfColumns) {
  const board = [];
  for (let i = 0; i < numberOfRows; i++) {
    let row = [];
    for (let j = 0; j < numberOfColumns; j++) {
      row.push(" ");
    }
    board.push(row);
  }
  return board;

};

const generateBombBoard = function(numberOfRows, numberOfColumns, numberOfBombs) {
  const board = generatePlayerBoard(numberOfRows, numberOfColumns);
  let bombs = 0;
  while (bombs < numberOfBombs) {
    let ranRowIndex = Math.floor(Math.random() * numberOfRows);
    let ranColIndex = Math.floor(Math.random() * numberOfColumns);
    if (board[ranRowIndex][ranColIndex] === " ") {
      board[ranRowIndex][ranColIndex] = "B";
      bombs++;
    }
  }

  return board;
};

const getNumberOfNeighborBombs = function(bombBoard, rowIndex, columnIndex) {
  let neighborBombs = 0;
  const neighborOffsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;

  if (!(rowIndex >= 0 && rowIndex < numberOfRows)) {
    return "Row out of bounds!";
  }
  if (!(columnIndex >= 0 && columnIndex < numberOfColumns)) {
    return "Column out of bounds!";
  }

  neighborOffsets.forEach(function(offset) {
    let neighborRowIndex = rowIndex + offset[0];
    let neighborColIndex = columnIndex + offset[1];
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColIndex >= 0 && neighborColIndex < numberOfColumns) {
      if (bombBoard[neighborRowIndex][neighborColIndex] === "B") {
        neighborBombs++;
      }
    }
  });

  return neighborBombs;
};

const flipTile = function(playerBoard, bombBoard, rowIndex, columnIndex) {
  if (playerBoard[rowIndex][columnIndex] !== " ") {
    return "This tile has already been flipped!"
  }
  if (bombBoard[rowIndex][columnIndex] === "B") {
    playerBoard[rowIndex][columnIndex] = "B";
    return "You Die!"
  }
  const bombs = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  playerBoard[rowIndex][columnIndex] = bombs;
}

const printBoard = function(board) {
  let formattedBoard = board.map(function(row) {
    return row.join(" | ");
  });
  console.log(formattedBoard.join("\n"));

};

const bombBoard = generateBombBoard(3, 4, 5);
const playerBoard = generatePlayerBoard(3, 4);

console.log("Player Board: ");
printBoard(playerBoard)
console.log("Bomb Board: ");
printBoard(bombBoard);
console.log(getNumberOfNeighborBombs(bombBoard, 1, 1));
flipTile(playerBoard, bombBoard, 2, 2);
console.log("Updated Player Board: ");
printBoard(playerBoard);
