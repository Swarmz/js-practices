#!/usr/bin/env node

import { db } from "./db.js";
import { run, get, close } from "./sqlite-promises.js";

run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => run(db, "INSERT INTO books (title) VALUES (NULL)"))
  .catch((err) => {
    console.error(err.message);
    return get(db, "SELECT author FROM books");
  })
  .catch((err) => {
    console.error(err.message);
    return run(db, "DROP TABLE books");
  })
  .finally(() => close(db));
