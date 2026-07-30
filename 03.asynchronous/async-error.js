#!/usr/bin/env node

import { db } from "./db.js";
import { run, get } from "./sqlite-promises.js";

async function main() {
  try {
    await run(`
      CREATE TABLE books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL UNIQUE
      )`);

    const result = await run("INSERT INTO books (title) VALUES NULL");
    console.log(result.lastID);
  } catch (err) {
    console.error(err);
  }

  try {
    const row = await get("SELECT author FROM books");
    console.log(row);
  } catch (err) {
    console.error(err);
  } finally {
    await run("DROP TABLE books");
    db.close();
  }
}

main();
