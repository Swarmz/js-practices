#!/usr/bin/env node

import { db } from "./db.js";
import { run, get } from "./sqlite-promises.js";

run(`
  CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
  )`)
  .then(() => {
    return run("INSERT INTO books (title) VALUES (NULL)");
  })
  .catch((err) => {
    console.error(err);
  })
  .then(() => {
    return get("SELECT author FROM books");
  })
  .catch((err) => {
    console.error(err);
  })
  .then(() => {
    return run("DROP TABLE books");
  })
  .finally(() => {
    db.close();
  });
