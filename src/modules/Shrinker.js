import * as config from "../config";

export class Shrinker {
  constructor() {
    this.ALPHABET = config.alphabet;
    this.BASE = this.ALPHABET.length;
  }

  encode(n) {
    let literal = "";
    while (n > 0) {
      literal = literal + this.ALPHABET[parseInt(n % this.BASE)];
      n = parseInt(n / this.BASE);
    }
    return literal.split('').reverse().join('');
  };

  decode(literal) {
    let n = 0;
    for (let i = 0; i < literal.length; i++) {
      n = n * this.BASE + this.ALPHABET.indexOf(literal[i]);
    }
    return n;
  };
}
