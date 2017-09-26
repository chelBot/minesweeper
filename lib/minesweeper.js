"use strict";

var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
  var board = [];
  for (var i = 0; i < numberOfRows; i++) {
    var row = [];
    for (var j = 0; j < numberOfColumns; j++) {
      row.push(" ");
    }
    board.push(row);
  }
  return board;
};

var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
  var board = generatePlayerBoard(numberOfRows, numberOfColumns);
  var bombs = 0;
  while (bombs < numberOfBombs) {
    var ranRowIndex = Math.floor(Math.random() * numberOfRows);
    var ranColIndex = Math.floor(Math.random() * numberOfColumns);
    if (board[ranRowIndex][ranColIndex] === " ") {
      board[ranRowIndex][ranColIndex] = "B";
      bombs++;
    }
  }

  return board;
};

var getNumberOfNeighborBombs = function getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex) {
  var neighborBombs = 0;
  var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  var numberOfRows = bombBoard.length;
  var numberOfColumns = bombBoard[0].length;

  if (!(rowIndex >= 0 && rowIndex < numberOfRows)) {
    return "Row out of bounds!";
  }
  if (!(columnIndex >= 0 && columnIndex < numberOfColumns)) {
    return "Column out of bounds!";
  }

  neighborOffsets.forEach(function (offset) {
    var neighborRowIndex = rowIndex + offset[0];
    var neighborColIndex = columnIndex + offset[1];
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColIndex >= 0 && neighborColIndex < numberOfColumns) {
      if (bombBoard[neighborRowIndex][neighborColIndex] === "B") {
        neighborBombs++;
      }
    }
  });

  return neighborBombs;
};

var flipTile = function flipTile(playerBoard, bombBoard, rowIndex, columnIndex) {
  if (playerBoard[rowIndex][columnIndex] !== " ") {
    return "This tile has already been flipped!";
  }
  if (bombBoard[rowIndex][columnIndex] === "B") {
    playerBoard[rowIndex][columnIndex] = "B";
    return "You Die!";
  }
  var bombs = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  playerBoard[rowIndex][columnIndex] = bombs;
};

var printBoard = function printBoard(board) {
  var formattedBoard = board.map(function (row) {
    return row.join(" | ");
  });
  console.log(formattedBoard.join("\n"));
};

var bombBoard = generateBombBoard(3, 4, 5);
var playerBoard = generatePlayerBoard(3, 4);

console.log("Player Board: ");
printBoard(playerBoard);
console.log("Bomb Board: ");
printBoard(bombBoard);
console.log(getNumberOfNeighborBombs(bombBoard, 1, 1));
flipTile(playerBoard, bombBoard, 2, 2);
console.log("Updated Player Board: ");
printBoard(playerBoard);