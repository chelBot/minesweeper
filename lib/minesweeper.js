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
var bomBoard = generateBombBoard(3, 4, 5);
var playerBoard = generatePlayerBoard(3, 4);
var printBoard = function printBoard(board) {
  var formattedBoard = board.map(function (row) {
    return row.join(" | ");
  });
  console.log(formattedBoard.join("\n"));
};
console.log("Player Board: ");
printBoard(playerBoard);
console.log("Bomb Board: ");
printBoard(bomBoard);