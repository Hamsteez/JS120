/* eslint-disable no-extend-native */
// name property added to make objects easier to identify
let foo = {name: 'foo'};
let bar = Object.create(foo);
bar.name = 'bar';
let baz = Object.create(bar);
baz.name = 'baz';
let qux = Object.create(baz);
qux.name = 'qux';

foo.ancestors = function() {
  let results = [];
  let ancestor = Object.getPrototypeOf(this);
  while (ancestor.name !== undefined) {
    results.push(ancestor.name);
    ancestor = Object.getPrototypeOf(ancestor);
  }
  results.push('Object.prototpye');
  console.log(results);
  return results;
};

qux.ancestors();  // returns ['baz', 'bar', 'foo', 'Object.prototype']
baz.ancestors();  // returns ['bar', 'foo', 'Object.prototype']
bar.ancestors();  // returns ['foo', 'Object.prototype']
foo.ancestors();  // returns ['Object.prototype']