let readline = require('readline-sync');

function Square(marker) {
  this.marker = marker || Square.UNUSED_SQUARE;
}
Square.UNUSED_SQUARE = ' ';
Square.HUMAN_MARKER = 'X';
Square.COMPUTER_MARKER = 'O';
Square.POSSIBLE_WINNING_ROWS = [
  [ "1", "2", "3" ],
  [ "4", "5", "6" ],
  [ "7", "8", "9" ],
  [ "1", "4", "7" ],
  [ "2", "5", "8" ],
  [ "3", "6", "9" ],
  [ "1", "5", "9" ],
  [ "3", "5", "7" ],
];


Square.prototype.toString = function() {
  return this.marker;
};

Square.prototype.setMarker = function(marker) {
  this.marker = marker;
};

Square.prototype.getMarker = function() {
  return this.marker;
};

function Board() {
  this.squares = {};
  for (let counter = 1; counter <= 9; counter++) {
    this.squares[counter] = new Square();
  }
}

Board.prototype.display = function() {
  console.log("");
  console.log("     |     |");
  console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
  console.log("     |     |");
  console.log("-----+-----+-----");
  console.log("     |     |");
  console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
  console.log("     |     |");
  console.log("-----+-----+-----");
  console.log("     |     |");
  console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
  console.log("     |     |");
  console.log("");
};

Board.prototype.markSpaceAt = function(choice, marker) {
  this.squares[choice].setMarker(marker);
};

Board.prototype.unusedSquares = function() {
  let unusedSquareArray = [];
  let keys = Object.keys(this.squares);
  keys.forEach(key => {
    if (this.squares[key].toString() === Square.UNUSED_SQUARE) {
      unusedSquareArray.push(key);
    }
  }, this);
  return unusedSquareArray;
};

Board.prototype.isFull = function() {
  let availableSquares = this.unusedSquares();
  return availableSquares.length === 0;
};

Board.prototype.isWinner = function(player) {
  let arr = [];
  let rtrn = false;
  Square.POSSIBLE_WINNING_ROWS.forEach(row => {
    arr = [];
    row.forEach(val => {
      if (this.squares[val].toString() === player.getMarker()) {
        arr.push(val);
        if (arr.length === 3) {
          rtrn = true;
        }
      }
    });
  }, this);
  return rtrn;
};

Board.prototype.displayWithClear = function() {
  console.clear();
  console.log('');
  this.display();
};

function Player(marker) {
  this.marker = marker;
}
Player.prototype.getMarker = function() {
  return this.marker;
};

function Human() {
  Player.call(this, Square.HUMAN_MARKER);
}
Human.prototype = Object.create(Player.prototype);
Human.prototype.constructor = Human;

function Computer() {
  Player.call(this, Square.COMPUTER_MARKER);
}
Computer.prototype = Object.create(Player.prototype);
Computer.prototype.constructor = Computer;

function TTTGame() {
  this.board = new Board();
  this.human = new Human();
  this.computer = new Computer();
}

TTTGame.prototype.play = function() {
  console.clear();
  this.displayWelcomeMessage();
  this.board.display();

  while (true) {
    this.humanMoves();
    if (this.gameOver()) break;

    this.computerMoves();
    if (this.gameOver()) break;
    this.board.displayWithClear();
  }
  this.board.displayWithClear();

  this.displayResults();
  this.displayGoodbyeMessage();
};

TTTGame.prototype.displayWelcomeMessage = function() {
  console.log(`Welcome to Tic Tac Toe!`);
};

TTTGame.prototype.displayGoodbyeMessage = function() {
  console.log(`Thanks for playing Tic Tac Toe! Goodbye!`);

};

TTTGame.prototype.displayResults = function() {
  if (this.board.isWinner(this.human)) {
    console.log(`Human wins!`);
  } else if (this.board.isWinner(this.computer)) {
    console.log(`Computer wins!`);
  } else {
    console.log(`That game was a tie.`);
  }
};

TTTGame.prototype.humanMoves = function() {
  let choice;
  let availableSquares = this.board.unusedSquares();
  while (true) {
    choice = readline.question(`Choose a square from the available squares ${availableSquares}: `);
    if (availableSquares.includes(choice)) break;
    console.log('Please enter a valid choice');
  }

  this.board.markSpaceAt(choice, this.human.getMarker());
};

TTTGame.prototype.computerMoves = function() {
  let availableSquares = this.board.unusedSquares();
  let idx = Math.floor(Math.random() * availableSquares.length);
  let choice = availableSquares[idx];
  if (!(availableSquares.length === 0)) {
    this.board.markSpaceAt(choice, this.computer.getMarker());
  }
};

TTTGame.prototype.gameOver = function() {
  return this.board.isFull() || this.board.isWinner(this.human) ||
  this.board.isWinner(this.computer);
};

let game = new TTTGame();
game.play();