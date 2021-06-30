class Auto {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
  info() {
    return `${this.make} ${this.model}`;
  }

  getWheels(wheels) {
    return wheels;
  }
}

class Car extends Auto {
  getWheels() {
    return 4;
  }
}

class Motorcycle extends Auto {
  getWheels() {
    return 2;
  }
}

class Truck extends Auto {
  constructor(make, model, payload) {
    super(make, model);
    this.payload = payload;
  }

  // getWheels() {
  //   return 6;
  // }
}

let truck = new Truck('toyota', 'tundra', '500');
console.log(truck.getWheels(6));