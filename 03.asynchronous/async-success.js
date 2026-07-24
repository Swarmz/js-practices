#!/usr/bin/env node

import { db, run, get } from "./sqlite-promises.js";

async function main() {
  try {
    await run(`
      CREATE TABLE books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL UNIQUE
      )`);

    const result = await run("INSERT INTO books (title) VALUES (?)", [
      "Alice in Wonderland",
    ]);
    console.log(result.lastID);

    const row = await get("SELECT * FROM books WHERE id = ?", [result.lastID]);
    console.log(row);
  } catch (err) {
    console.error(err);
  } finally {
    await run("DROP TABLE books");
    db.close();
  }
}

main();
