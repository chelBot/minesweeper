"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    // Instance properties
    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    //TODO: why use Board. vs this.
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: "getNumberOfNeighborBombs",
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var bombBoard = this._bombBoard;
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
    }
  }, {
    key: "flipTile",
    value: function flipTile(rowIndex, columnIndex) {
      var playerBoard = this._playerBoard;
      var bombBoard = this._bombBoard;
      if (playerBoard[rowIndex][columnIndex] !== " ") {
        return "This tile has already been flipped!";
      }
      if (bombBoard[rowIndex][columnIndex] === "B") {
        playerBoard[rowIndex][columnIndex] = "B";
        return "You Die!";
      }
      var bombs = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      playerBoard[rowIndex][columnIndex] = bombs;
      this._numberOfTiles--;
    }
  }, {
    key: "hasSafeTiles",
    value: function hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;
    }
  }, {
    key: "printBoard",
    value: function printBoard() {
      var board = this._playerBoard;
      var formattedBoard = board.map(function (row) {
        return row.join(" | ");
      });
      console.log(formattedBoard.join("\n"));
    }
  }, {
    key: "playerBoard",
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: "generatePlayerBoard",
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];
      for (var i = 0; i < numberOfRows; i++) {
        var row = [];
        for (var j = 0; j < numberOfColumns; j++) {
          row.push(" ");
        }
        board.push(row);
      }
      return board;
    }
  }, {
    key: "generateBombBoard",
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = this.generatePlayerBoard(numberOfRows, numberOfColumns);
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
    }
  }]);

  return Board;
}();

var Game = function () {
  function Game(rows, columns, bombs) {
    _classCallCheck(this, Game);

    this._board = new Board(rows, columns, bombs);
  }

  _createClass(Game, [{
    key: "playMove",
    value: function playMove(rowIndex, columnIndex) {
      this._board.flipTile(rowIndex - 1, columnIndex - 1);
      this._board.printBoard();
      if (this._board.playerBoard[rowIndex - 1][columnIndex - 1] === "B") {
        console.log("You Die!");
      } else if (!this._board.hasSafeTiles()) {
        console.log("You Win!");
      }
      console.log("\n");
    }
  }]);

  return Game;
}();

var game = new Game(3, 3, 3);
game.playMove(1, 1);
game.playMove(3, 3);
game.playMove(2, 3);
game.playMove(1, 3);