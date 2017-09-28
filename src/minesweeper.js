class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    // Instance properties
    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    //TODO: why use Board. vs this.
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    const board = [];
    for (let i = 0; i < numberOfRows; i++) {
      let row = [];
      for (let j = 0; j < numberOfColumns; j++) {
        row.push(" ");
      }
      board.push(row);
    }
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    const board = this.generatePlayerBoard(numberOfRows, numberOfColumns);
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
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const bombBoard = this._bombBoard;
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
  }

  flipTile(rowIndex, columnIndex) {
    const playerBoard = this._playerBoard;
    const bombBoard = this._bombBoard;
    if (playerBoard[rowIndex][columnIndex] !== " ") {
      return "This tile has already been flipped!"
    }
    if (bombBoard[rowIndex][columnIndex] === "B") {
      playerBoard[rowIndex][columnIndex] = "B";
      return "You Die!";
    }
    const bombs = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    playerBoard[rowIndex][columnIndex] = bombs;
    this._numberOfTiles--;
  }

  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  printBoard() {
    const board = this._playerBoard;
    let formattedBoard = board.map(function(row) {
      return row.join(" | ");
    });
    console.log(formattedBoard.join("\n"));
  };
}

class Game {
  constructor(rows, columns, bombs) {
    this._board = new Board(rows, columns, bombs);
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex - 1, columnIndex - 1);
    this._board.printBoard();
    if (this._board.playerBoard[rowIndex - 1][columnIndex - 1] === "B") {
      console.log("You Die!")
    }
    else if (!this._board.hasSafeTiles()) {
      console.log("You Win!");
    }
    console.log("\n");
  }
}

const game = new Game(3, 3, 3);
game.playMove(1, 1);
game.playMove(3, 3);
game.playMove(2, 3);
game.playMove(1, 3);
