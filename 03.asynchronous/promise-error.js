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
    return run(db, "INSERT INTO books (title) VALUES (NULL)");
  })
  .catch((err) => {
    console.error(err);
  })
  .then(() => {
    return get(db, "SELECT author FROM books");
  })
  .catch((err) => {
    console.error(err);
  })
  .then(() => {
    return run(db, "DROP TABLE books");
  })
  .finally(() => {
    db.close();
  });
