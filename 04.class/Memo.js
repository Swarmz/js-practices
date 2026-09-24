export default class Memo {
  constructor(id, body) {
    this.id = id;
    this.body = body;
  }

  title() {
    const lines = this.body.split("\n");

    return lines[0];
  }
}
