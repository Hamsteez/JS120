function objectsEqual(obj1, obj2) {
  let obj1keys = Object.keys(obj1);
  let obj2keys = Object.keys(obj2);
  let equals1 = obj1keys.every(key => obj1[key] === obj2[key]);
  let equals2 = obj2keys.every(key => obj1[key] === obj2[key]);
  if (obj1keys.length !== obj2keys.length) return false;
  return equals1 && equals2;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false