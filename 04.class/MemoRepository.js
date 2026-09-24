import Memo from "./Memo.js";
import { all, run } from "./sqlite-promises.js";

export default class MemoRepository {
  constructor(db) {
    this.db = db;
  }

  createTable() {
    return run(
      this.db,
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, body TEXT NOT NULL)",
    );
  }

  async getMemos() {
    const rows = await all(this.db, "SELECT * FROM memos");

    return rows.map((row) => new Memo(row.id, row.body));
  }

  insertMemo(body) {
    return run(this.db, "INSERT INTO memos (body) VALUES (?)", body);
  }

  deleteMemo(memo) {
    return run(this.db, "DELETE FROM memos WHERE id = ?", memo);
  }
}
