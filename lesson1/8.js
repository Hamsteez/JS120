function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,

    behavior() {
      if (this.read === true) {
        return `${this.title} was written by ${this.author}. I have read it.`;
      } else {
        return `${this.title} was written by ${this.author}. I haven't read it.`;
      }
    },

    readBook() {
      this.read = true;
    }
  };
}

let book1 = createBook('Mythos', 'Stephen Fry');
// let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris', false);
// let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse', true);

// console.log(book1.behavior());  // "Mythos was written by Stephen Fry."
// console.log(book2.behavior());  // "Me Talk Pretty One Day was written by David Sedaris."
// console.log(book3.behavior());  // "Aunts aren't Gentlemen was written by PG Wodehouse"

// console.log(book1.read); // => false
// console.log(book2.read); // => false
// console.log(book3.read); // => false

console.log(book1.behavior()); // => false
book1.readBook();
console.log(book1.behavior()); // => true
