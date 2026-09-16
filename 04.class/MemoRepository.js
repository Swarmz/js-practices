import Memo from "./Memo.js";

export default class MemoRepository {
  constructor(db) {
    this.db = db;
  }

  createTable() {
    this.db.run(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, body TEXT NOT NULL)",
    );
  }

  getMemos() {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM memos", (err, rows) => {
        if (err) return reject(err);

        resolve(rows.map((row) => new Memo(row.id, row.body)));
      });
    });
  }

  addMemo(body) {
    this.db.run("INSERT INTO memos (body) VALUES (?)", body);
  }

  deleteMemo(memo) {
    this.db.run("DELETE FROM memos WHERE id = ?", [memo]);
  }

  memoTitles() {
    return this.getMemos()
      .then((memos) => memos.map((m) => m.firstLine()));
  }
}
