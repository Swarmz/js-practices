#!/usr/bin/env node

import { db } from "./db.js";
import { run, get } from "./sqlite-promises.js";

run(
  db,
  `
  CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
  )`,
)
  .then(() => {
    return run(db, "INSERT INTO books (title) VALUES (?)", [
      "Alice in Wonderland",
    ]);
  })
  .then((result) => {
    console.log(result.lastID);

    return get(db, "SELECT * FROM books WHERE id = ?", [result.lastID]);
  })
  .then((row) => {
    console.log(row);
    return run(db, "DROP TABLE books");
  })
  .finally(() => {
    db.close();
  });
