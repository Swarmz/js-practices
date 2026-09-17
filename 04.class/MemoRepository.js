import Memo from "./Memo.js";

export default class MemoRepository {
  constructor(db) {
    this.db = db;
  }

  createTable() {
    return new Promise((resolve, reject) => {
      this.db.run(
        "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, body TEXT NOT NULL)",
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
    });
  }

  getMemos() {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM memos", (err, rows) => {
        if (err) return reject(err);

        resolve(rows.map((row) => new Memo(row.id, row.body)));
      });
    });
  }

  insertMemo(body) {
    return new Promise((resolve, reject) => {
      this.db.run("INSERT INTO memos (body) VALUES (?)", body, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  deleteMemo(memo) {
    return new Promise((resolve, reject) => {
      this.db.run("DELETE FROM memos WHERE id = ?", [memo], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  memoTitles() {
    return this.getMemos().then((memos) => memos.map((m) => m.firstLine()));
  }
}
