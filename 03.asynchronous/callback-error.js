#!/usr/bin/env node

import { db } from "./sqlite-promises.js";

db.run(
  `
  CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
  )`,
  () => {
    db.run("INSERT INTO books (title) VALUES (NULL)", function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log(this.lastID);
      }

      db.get("SELECT author FROM books", (err, row) => {
        if (err) {
          console.error(err);
          return;
        } else {
          console.log(row);
        }
        db.run("DROP TABLE books", () => {
          db.close();
        });
      });
    });
  },
);
