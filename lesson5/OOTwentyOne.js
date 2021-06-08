/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
let readline = require('readline-sync');

class Card {
  constructor() {
    this.deck = [];
  }

  createDeck() {
    this.deck = [];
    for (let suit = 1; suit <= 4; suit++) {
      for (let value = 1; value <= 13; value++) {
        let faceVal = this.getFaceValue(value);
        let suitVal = this.getSuitValue(suit);
        this.deck.push([suitVal, faceVal]);
      }
    }
  }

  getFaceValue(val) {
    switch (val) {
      case 1:
        return 'Ace';
      case 11:
        return 'Jack';
      case 12:
        return 'Queen';
      case 13:
        return 'King';
      default:
        return String(val);
    }
  }

  getSuitValue(suit) {
    switch (suit) {
      case 1:
        return 'Hearts';
      case 2:
        return 'Diamonds';
      case 3:
        return 'Clubs';
      default:
        return 'Spades';
    }
  }

  deal() {

  }
}

class Participant {
  constructor() {
    this.currentHand = [];
  }

  emptyHand() {
    this.currentHand = [];
  }
}

class Player extends Participant {
  constructor() {
    super();
    this.dollars = 5;
  }
}

class Dealer extends Participant {
  constructor() {
    super();
  }
}

class TwentyOneGame {
  constructor() {
    this.card = new Card();
    this.player = new Player();
    this.dealer = new Dealer();
  }

  start() {
    console.clear();
    this.displayWelcomeMessage();
    this.mainGameLoop();
    this.displayGoodbyeMessage();
  }

  mainGameLoop() {
    while (this.player.dollars > 0 && this.player.dollars < 11) {
      this.player.emptyHand();
      this.dealer.emptyHand();
      this.card.createDeck();
      this.dealFirstTwoCards(this.player);
      this.dealFirstTwoCards(this.dealer);
      this.showCards(this.player);
      this.showOneDealerCard();
      this.displayCurrentHandScore(this.player);
      this.hitOrStay();
      this.displayBust(this.player);
      if (!this.checkIfBusted(this.player)) {
        this.showCards(this.dealer);
        this.displayCurrentHandScore(this.dealer);
        this.dealerPlays();
        this.displayBust(this.dealer);
      }
      if (!this.checkIfBusted(this.dealer) &&
        !this.checkIfBusted(this.player)) {
        this.checkWinner();
      }
      console.log(this.player.dollars);
    }
  }

  displayWelcomeMessage() {
    console.log(`Welcome to the game of 21! Score as close to 21 as possible to win, Good Luck!`);
    console.log('You are starting with $5.00.');
    console.log('For each round you win, you will gain $1.00, each round loss will be a deduction of $1.00.');
    console.log('If you reach $0.00 or $10.00 you will lose/win and the game will then quit.');
  }

  displayGoodbyeMessage() {
    console.log(`Thank you for playing. Have a good day!`);
  }

  checkWinner() {
    if (this.calculateHand(this.player) > this.calculateHand(this.dealer)) {
      console.log(`You won!`);
      this.player.dollars += 1;
    } else if (this.calculateHand(this.player) <
      this.calculateHand(this.dealer)) {
      console.log(`Dealer won!`);
      this.player.dollars -= 1;
    } else {
      console.log(`It was a tie!`);
    }
    console.log(`The final score was: Player - ${this.calculateHand(this.player)}. Dealer - ${this.calculateHand(this.dealer)}`);
  }

  dealFirstTwoCards(user) {
    let rndmNum = this.getRandomNum();
    user.currentHand.push(this.card.deck[rndmNum]);
    this.card.deck.splice([rndmNum], 1);
    rndmNum = this.getRandomNum();
    user.currentHand.push(this.card.deck[rndmNum]);
    this.card.deck.splice([rndmNum], 1);
  }

  getRandomNum() {
    return Math.floor(Math.random() * this.card.deck.length);
  }

  showCards(user) {
    if (user === this.player) {
      console.log(`Your current hand is:`);
    } else {
      console.log(`Dealers' current hand is:`);
    }

    for (let idx = 0; idx < user.currentHand.length; idx++) {
      console.log(`- ${user.currentHand[idx][1]} of ${user.currentHand[idx][0]}`);
    }
    console.log('');
  }

  showOneDealerCard() {
    console.log(`Dealers' current hand is:`);
    console.log(`- ${this.dealer.currentHand[0][1]} of ${this.dealer.currentHand[0][0]}`);
    console.log(`- **HIDDEN**`);
    console.log('');
  }

  displayCurrentHandScore(user) {
    if (user === this.player) {
      console.log(`Your current score is: ${this.calculateHand(this.player)}`);
      console.log('');
    } else {
      console.log(`Dealers' current score is: ${this.calculateHand(this.dealer)}`);
      console.log('');
    }
  }

  calculateHand(user) {
    let values = user.currentHand.map(card => card[1]);

    let sum = 0;
    values.forEach(value => {
      if (value === "Ace") {
        sum += 11;
      } else if (['Jack', 'Queen', 'King'].includes(value)) {
        sum += 10;
      } else {
        sum += Number(value);
      }
    });

    values.filter(value => value === "Ace").forEach(_ => {
      if (sum > 21) sum -= 10;
    });

    return sum;
  }

  hitOrStay() {
    let ans;
    while (true) {
      while (true) {
        console.log(`Would you like to hit or stay? (h or s)`);
        ans = readline.question().toLowerCase();
        if (['h', 's'].includes(ans)) break;
        console.log(`Please enter a valid response`);
      }
      if (ans === 's') {
        console.log(`You chose to stay!`);
        console.log(``);
        break;
      }
      console.log(`You chose to hit!`);
      console.log(``);
      this.dealACard(this.player);
      if (this.checkIfBusted(this.player)) break;
    }
  }

  dealACard(user) {
    let rndmNum = this.getRandomNum();
    user.currentHand.push(this.card.deck[rndmNum]);
    this.card.deck.splice([rndmNum], 1);
    this.showCards(user);
    this.displayCurrentHandScore(user);
  }

  checkIfBusted(user) {
    return this.calculateHand(user) > 21;
  }

  displayBust(user) {
    if (this.calculateHand(user) > 21) {
      if (user === this.player) {
        console.log(`You busted with a score of ${this.calculateHand(user)}!`);
        this.player.dollars -= 1;
      } else {
        console.log(`Dealer busted with a score of ${this.calculateHand(user)}!`);
        this.player.dollars += 1;
      }
    }
  }

  dealerPlays() {
    while (this.calculateHand(this.dealer) < 17) {
      console.log(`Dealer chose to hit!`);
      console.log('');
      this.dealACard(this.dealer);
    }
    if (!this.checkIfBusted(this.dealer)) {
      console.log(`Dealer chose to stay with a score of ${this.calculateHand(this.dealer)}!`);
    }
  }
}

let game = new TwentyOneGame();
game.start();
