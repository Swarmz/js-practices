#!/usr/bin/env node

import { db } from "./db.js";
import { run, get, close } from "./sqlite-promises.js";

try {
  await run(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );

  try {
    const result = await run(db, "INSERT INTO books (title) VALUES (NULL)");
    console.log(result.lastID);
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT") {
      console.error(err);
    } else {
      throw err;
    }
  }

  try {
    const row = await get(db, "SELECT author FROM books");
    console.log(row);
  } catch (err) {
    if (err.code === "SQLITE_ERROR") {
      console.error(err);
    } else {
      throw err;
    }
  }

  await run(db, "DROP TABLE books");
} finally {
  await close(db);
}
