let readline = require('readline-sync');

let Square = {
  UNUSED_SQUARE: ' ',
  HUMAN_MARKER: 'X',
  COMPUTER_MARKER: 'O',
  POSSIBLE_WINNING_ROWS: [
    [ "1", "2", "3" ],
    [ "4", "5", "6" ],
    [ "7", "8", "9" ],
    [ "1", "4", "7" ],
    [ "2", "5", "8" ],
    [ "3", "6", "9" ],
    [ "1", "5", "9" ],
    [ "3", "5", "7" ],
  ],

  init(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
    return this;
  },

  toString() {
    return this.marker;
  },

  setMarker(marker) {
    this.marker = marker;
  },

  getMarker() {
    return this.marker;
  }
};

let Board = {
  init() {
    this.squares = {};
    for (let counter = 1; counter <= 9; counter++) {
      this.squares[counter] = Object.create(Square).init();
    }
    return this;
  },

  display() {
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
  },

  markSpaceAt(choice, marker) {
    this.squares[choice].setMarker(marker);
  },

  unusedSquares() {
    let unusedSquareArray = [];
    let keys = Object.keys(this.squares);
    keys.forEach(key => {
      if (this.squares[key].toString() === Square.UNUSED_SQUARE) {
        unusedSquareArray.push(key);
      }
    }, this);
    return unusedSquareArray;
  },

  isFull() {
    let availableSquares = this.unusedSquares();
    return availableSquares.length === 0;
  },

  isWinner(player) {
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
  },

  displayWithClear() {
    console.clear();
    console.log('');
    this.display();
  },
};


const PlayerPrototype = {
  initialize(marker) {
    this.marker = marker;
    return this;
  },

  getMarker() {
    return this.marker;
  },
};

let Human = Object.create(PlayerPrototype);
Human.init = function() {
  return this.initialize(Square.HUMAN_MARKER);
};

let Computer = Object.create(PlayerPrototype);
Computer.init = function() {
  return this.initialize(Square.COMPUTER_MARKER);
};

let TTTGame = {
  init() {
    this.board = Object.create(Board).init();
    this.human = Object.create(Human).init();
    this.computer = Object.create(Computer).init();
    return this;
  },

  play() {
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
  },

  displayWelcomeMessage() {
    console.log(`Welcome to Tic Tac Toe!`);

  },

  displayGoodbyeMessage() {
    console.log(`Thanks for playing Tic Tac Toe! Goodbye!`);
  },

  displayResults() {
    if (this.board.isWinner(this.human)) {
      console.log(`Human wins!`);
    } else if (this.board.isWinner(this.computer)) {
      console.log(`Computer wins!`);
    } else {
      console.log(`That game was a tie.`);
    }
  },

  humanMoves() {
    let choice;
    let availableSquares = this.board.unusedSquares();
    while (true) {
      choice = readline.question(`Choose a square from the available squares ${availableSquares}: `);
      if (availableSquares.includes(choice)) break;
      console.log('Please enter a valid choice');
    }

    this.board.markSpaceAt(choice, this.human.getMarker());
  },

  computerMoves() {
    let availableSquares = this.board.unusedSquares();
    let idx = Math.floor(Math.random() * availableSquares.length);
    let choice = availableSquares[idx];
    if (!(availableSquares.length === 0)) {
      this.board.markSpaceAt(choice, this.computer.getMarker());
    }
  },

  gameOver() {
    return this.board.isFull() || this.board.isWinner(this.human) ||
    this.board.isWinner(this.computer);
  },
};

let game = Object.create(TTTGame).init();
game.play();