class Board {
  joinOr(arr, delimiter = ', ', word = 'or') {
    let finStr = '';
    let arr1 = [];
    arr.forEach((choice, idx) => {
      if (idx !== arr.length - 1) {
        arr1.push(choice);
      }
    });
    if (arr.length === 1) {
      finStr = String(arr[0]);
    } else if (arr.length === 2) {
      finStr = arr[0] + ` ${word} ` + arr[1];
    } else {
      finStr = arr1.join(`${delimiter}`);
      finStr += `${delimiter}` + word;
      finStr += ' ' + arr[arr.length - 1];
    }
    console.log(finStr);
  }
}

let board = new Board();

// obj is the context for `joinOr`; replace it with the correct context.
board.joinOr([1, 2], '. ', 'orr')                   // => "1 or 2"
board.joinOr([1, 2, 3])                // => "1, 2, or 3"
board.joinOr([1, 2, 3], '; ')          // => "1; 2; or 3"
board.joinOr([1, 2, 3], ', ', 'and')   // => "1, 2, and 3"
board.joinOr([1], '. ', 'orr');