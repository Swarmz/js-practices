#!/usr/bin/env node

import { db } from "./db.js";
import { run, get, close } from "./sqlite-promises.js";

try {
  await run(
    db,
    `
    CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
    )`,
  );

  const result = await run(db, "INSERT INTO books (title) VALUES (?)", [
    "Alice in Wonderland",
  ]);
  console.log(result.lastID);

  const row = await get(db, "SELECT * FROM books WHERE id = ?", [
    result.lastID,
  ]);
  console.log(row);
} catch (err) {
  console.error(err);
} finally {
  await run(db, "DROP TABLE books");
  await close(db);
}
