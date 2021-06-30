class Banner {
  constructor(message) {
    this.message = message;
    this.length = message.length;
  }

  displayBanner() {
    console.log([this.topAndBottomLines(), this.horizontalRule(), this.messageLine(), this.horizontalRule(), this.topAndBottomLines()].join("\n"));
  }

  horizontalRule() {
    return `| ${' '.repeat(this.length)} |`;
  }

  topAndBottomLines() {
    return `+-${'-'.repeat(this.length)}-+`;
  }

  messageLine() {
    return `| ${this.message} |`;
  }
}

let banner1 = new Banner('To boldly go where no one has gone before.');
banner1.displayBanner();
// +--------------------------------------------+
// |                                            |
// | To boldly go where no one has gone before. |
// |                                            |
// +--------------------------------------------+

let banner2 = new Banner('');
banner2.displayBanner();
// +--+
// |  |
// |  |
// |  |
// +--+