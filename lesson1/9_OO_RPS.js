/* eslint-disable max-len */
/*
The classical approach to planning an object-oriented application includes several steps:

1. Write a textual description of the problem or exercise.
2. Extract the significant nouns and verbs from the description.
3. Organize and associate the verbs with the nouns.
*/

/*
Step 1:
  RPS is a game where the 2 ppl (in this case, user and comp) choose an attack, either rock, ppr, scssrs and a winner is determined
  by comparing the choices.
  Rock > Scissors
  Scissors > Paper
  Paper > Rock

Step 2:
  Nouns:
    Player:
      User
      Computer
    Rule
    choices:
      rock, paper, scissors

  Verbs:
    choose
    compare

Step 3:
  Player:
    choose
  Rule:
    compare
  Choices
*/
let readline = require("readline-sync");

function prompt(question) {
  console.log(`=> ${question}`);
}

function createPlayer() {
  return {
    move: null,
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      const choices = ['rock', 'paper', 'scissors'];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    },
  };
  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let userChoice;
      while (true) {
        prompt(`Please enter your choice of Rock/Paper/Scissors`);
        userChoice = readline.question().toLowerCase();
        if (['rock', 'paper', 'scissors'].includes(userChoice)) break;
        prompt(`Invalid choice.`);
      }
      this.move = userChoice;
    },
  };
  return Object.assign(playerObject, humanObject);
}

// function createChoices() {
//   return {

//   };
// }

// function createRule() {
//   return {

//   };
// }

// let compare = function(move1, move2) {

// };

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  displayWelcomeMessage() {
    console.log(`Welcome to Rock Paper Scissors!`);
  },

  displayGoodbyeMessage() {
    console.log(`Thanks for playing Rock, Paper, Scissors. Goodbye!`);
  },

  // eslint-disable-next-line max-lines-per-function
  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
    let winner;
    console.log(`You chose: ${humanMove}`);
    console.log(`The computer chose: ${computerMove}`);

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
        (humanMove === 'paper' && computerMove === 'rock') ||
        (humanMove === 'scissors' && computerMove === 'paper')) {
      winner = 'User';
    } else if ((computerMove === 'rock' && humanMove === 'scissors') ||
    (computerMove === 'paper' && humanMove === 'rock') ||
    (computerMove === 'scissors' && humanMove === 'paper')) {
      winner = 'Computer';
    } else {
      winner = false;
    }
    if (winner) {
      console.log(`${winner} wins!`);
    } else {
      console.log(`It's a tie!`);
    }
  },

  playAgain() {
    let response;
    while (true) {
      console.log(`Would you like to play again? (yes/no)`);
      response = readline.question().toLowerCase();
      if (['yes', 'no'].includes(response)) break;
      console.log(`Not a valid response.`);
    }
    if (response === 'yes') {
      RPSGame.play();
    } else {
      this.displayGoodbyeMessage();
    }
  },

  play() {
    this.displayWelcomeMessage();
    this.human.choose();
    this.computer.choose();
    this.displayWinner();
    this.playAgain();
  },
};

RPSGame.play();