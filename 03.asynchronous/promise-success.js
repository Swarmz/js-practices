#!/usr/bin/env node

import { db } from "./db.js";
import { run, get } from "./sqlite-promises.js";

run(`
  CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
  )`)
  .then(() => {
    return run("INSERT INTO books (title) VALUES (?)", ["Alice in Wonderland"]);
  })
  .then((result) => {
    console.log(result.lastID);

    return get("SELECT * FROM books WHERE id = ?", [result.lastID]);
  })
  .then((row) => {
    console.log(row);
  })
  .then(() => {
    return run("DROP TABLE books");
  })
  .finally(() => {
    db.close();
  });
