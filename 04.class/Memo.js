export default class Memo {
  constructor(id, body) {
    this.id = id;
    this.body = body;
  }

  firstLine() {
    const lines = this.body.split("\n");
    return lines[0];
  }
}
