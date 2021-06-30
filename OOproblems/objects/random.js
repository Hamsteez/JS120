// // Object factories
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


// // CP - Pseudo Classical Inheritance
// function Animal(name) {
//   this.name = name;
// }
// Animal.prototype.eat = function() {
//   console.log(`${this.name} is eating`);
// };

// let cat = new Animal('cheedo');
// console.log(Object.getPrototypeOf(cat));
// console.log(cat.name);
// cat.eat();

// function Lion() {
//  Animal.call(this);
// }
// Lion.prototype = Object.create(Animal.prototype);
// Lion.prototype.constructor = Lion;
// let lion = new Lion();
// lion.name = 'alex';
// lion.eat();

// OLOO
let animalPrototype = {
  init(name, type) {
    this.name = name;
    this.type = type;
    return this;
  },

  eat() {
    console.log(`${this.name} is eating`);
  },

};

let cat = Object.create(animalPrototype).init('cheedo', 'pet');
console.log(Object.getPrototypeOf(cat));

// // class
// class Animal {
//   constructor(name, type) {
//     this.name = name;
//     this.type = type;
//   }

//   eat() {
//     console.log(`${this.name} is eating`);
//   }
// }

// class Cat extends Animal {
//  constructor() {
//  super();
//  }
//   ok() {
//     console.log('poop');
//   }
// }
// let cat = new Cat('cheedo', 'pet');
// cat.ok();