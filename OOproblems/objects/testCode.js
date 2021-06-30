// function Book(title, author) {
//   this.title = title;
//   this.author = author;
//   this.pushTitle();
// }

// Book.TITLE_ARR = [];

// Book.prototype.read = function() {
//   console.log(`Reading ${this.title}`);
// };

// Book.prototype.pushTitle = function() {
//   Book.TITLE_ARR.push(this.title);
// };

// Book.prototype.allTitles = function() {
//   console.log(Book.TITLE_ARR);
// };

// let book1 = new Book('title for book 1', 'author for book 1');
// let book2 = new Book('title for book 2', 'author for book 2');

// book1.allTitles();
// //or can use book2.allTitles();

// class Book {
//   static TITLE_ARR = [];

//   constructor(title, author) {
//     this.title = title;
//     this.author = author;
//     this.pushTitle();
//   }

//   read() {
//     console.log(`Reading ${this.title}`);
//   }

//   allTitles() {
//     console.log(Book.TITLE_ARR);
//   }

//   pushTitle() {
//     Book.TITLE_ARR.push(this.title);
//   }
// }

// let book1 = new Book('title for book 1', 'author for book 1');
// let book2 = new Book('title for book 1', 'author for book 1');

// book1.allTitles();
// //or can use book2.allTitles();



























// //OLOO - Prototypal Inheritance - Objects inheriting directly from other objects.
// let animalPrototype = {
//   init(name, type) {
//     this.name = name;
//     this.type = type;
//     return this;
//   },

//   eat() {
//     console.log(`${this.name} is eating`);
//   },

// };

// let catPrototype = Object.create(animalPrototype).init('cheedo', 'pet');
// catPrototype.myName = function() {
//   console.log(`My name is ${this.name} and I'm a ${this.type}`);
// };
// let cat = Object.create(catPrototype);
// cat.eat();
// cat.myName();

// //Constructor Prototype - Pseudo-Classical Inheritance - class or type inheriting from other classes
// function Animal(name) {
//   this.name = name;
// }
// Animal.prototype.eat = function() {
//   console.log(`${this.name} is eating`);
// };

// let cat = new Animal('cheedo');
// cat.eat();

// function Lion() {
//   Animal.call(this);
// }
// Lion.prototype = Object.create(Animal.prototype);
// Lion.prototype.constructor = Lion;
// let lion = new Lion();
// lion.name = 'alex';
// lion.eat();


// function animal(name, type) {
//   return {
//     name: name,
//     type,
//     eat() {
//       console.log(`I am eating`);
//     }
//   };
// }

// let cat = animal('cheedo', 'long hair');
// console.log(cat.name);
// cat.eat();


// let walkTalkMixin = {
//   walk() {
//     console.log('I am walking');
//   },
//   talk() {
//     console.log('I am talking');
//   },
// };

// function robots(intelligenceLevel, modelNumber) {
//   return {
//     intelligenceLevel,
//     modelNumber,
//     problemSolve() {
//       console.log("I am solving a problem!");
//     },
//   };
// }

// function humanoids(intelligenceLevel, modelNumber) {
//   return Object.assign(walkTalkMixin, robots(intelligenceLevel, modelNumber));
// }

// function humans(name, age) {
//   let obj = {
//     name,
//     age,
//   };
//   return Object.assign(obj, walkTalkMixin);
// }

// let humanoid = humanoids(5, 1234);
// console.log(humanoid.modelNumber);
// humanoid.problemSolve();
// humanoid.walk();

// let human = humans('hamza', 23);
// console.log(human.name);
// human.walk();


// class CreateCharacter {
//   constructor(name) {
//     this.name = name;
//     this.health = 100;
//     this.strength = this.rollDice();
//     this.intelligence = this.rollDice();
//   }
//   rollDice() {
//     return (Math.floor(Math.random() * 11) + 2);
//   }
//   heal(num) {
//     this.health += num;
//   }
//   hurt(num) {
//     this.health -= num;
//   }
// }

// class Warrior extends CreateCharacter {
//   constructor(name) {
//     super(name);
//     this.strength += 2;
//   }
// }

// class Paladin extends CreateCharacter {
  
// }

// class Magician extends CreateCharacter {
//   constructor(name) {
//     super(name);
//     this.intelligence += 2;
//   }
// }

// class Bard extends Magician {
//   constructor(name) {
//     super(name);
//   }
//   createPotion() {

//   }
// }

// const Armor = {
//   attachArmor() {

//   },
//   removeArmor() {

//   }
// };

// const Spell = {
//   castSpell(spellType) {

//   }
// };

// Object.assign(Warrior.prototype, Armor);
// Object.assign(Paladin.prototype, Armor);

// Object.assign(Paladin.prototype, Spell);
// Object.assign(Magician.prototype, Spell);
// Object.assign(Bard.prototype, Spell);