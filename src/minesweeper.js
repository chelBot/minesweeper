const generatePlayerBoard = function(numberOfRows, numberOfColumns){
  const board = [];
  for(let i = 0; i < numberOfRows; i++){
    let row = [];
    for(let j = 0; j < numberOfColumns; j++){
      row.push(" ");
    }
    board.push(row);
  }
  return board;

};

const generateBombBoard = function(numberOfRows, numberOfColumns, numberOfBombs){
  const board = generatePlayerBoard(numberOfRows, numberOfColumns);
  let bombs = 0;
  while(bombs < numberOfBombs){
    let ranRowIndex = Math.floor(Math.random() * numberOfRows);
    let ranColIndex = Math.floor(Math.random() * numberOfColumns);
    if(board[ranRowIndex][ranColIndex] === " "){
        board[ranRowIndex][ranColIndex] = "B";
        bombs++;
    }
  }

  return board;
};
const bomBoard = generateBombBoard(3, 4, 5);
const playerBoard = generatePlayerBoard(3, 4);
const printBoard = function(board){
  let formattedBoard = board.map(function(row){
    return row.join(" | ");
  });
  console.log(formattedBoard.join("\n"));

};
console.log("Player Board: ");
printBoard(playerBoard)
console.log("Bomb Board: ");
printBoard(bomBoard);
