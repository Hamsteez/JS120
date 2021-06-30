class Pet {
  constructor(species, animalName) {
    this.animalName = animalName;
    this.species = species;
  }

  info() {
    console.log(`a ${this.species} named ${this.animalName}`);
  }
}

class Owner {
  constructor(ownerName) {
    this.ownerName = ownerName;
    this.owns = [];
  }

  printInfo() {
    this.owns.forEach(pet => pet.info());
  }

  numberOfPets() {
    return this.owns.length;
  }
}

class Shelter {
  constructor() {
    this.owners = {};
  }
  adopt(owner, pet) {
    this.owners[owner.ownerName] = owner;
    owner.owns.push(pet);
  }

  printAdoptions() {
    for (const prop in this.owners) {
      console.log(`${prop} has adopted the following pets:`);
      this.owners[prop].printInfo();
      console.log('');
    }

  }
}


let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');
let asta         = new Pet('dog', 'Asta');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');
let animalShelter = new Owner('Animal Shelter');

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.adopt(animalShelter, asta);
shelter.printAdoptions();
console.log(`${phanson.ownerName} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.ownerName} has ${bholmes.numberOfPets()} adopted pets.`);

// P Hanson has adopted the following pets:
// a cat named Butterscotch
// a cat named Pudding
// a bearded dragon named Darwin

// B Holmes has adopted the following pets:
// a dog named Molly
// a parakeet named Sweetie Pie
// a dog named Kennedy
// a fish named Chester

// P Hanson has 3 adopted pets.
// B Holmes has 4 adopted pets.