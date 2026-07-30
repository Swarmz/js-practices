#!/usr/bin/env node

import { db } from "./db.js";

db.run(
  `
  CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
  )`,
  () => {
    db.run(
      "INSERT INTO books (title) VALUES (?)",
      ["Alice in Wonderland"],
      function () {
        console.log(this.lastID);

        db.get(
          "SELECT * FROM books WHERE id = ?",
          [this.lastID],
          (_err, row) => {
            console.log(row);

            db.run("DROP TABLE books", () => {
              db.close();
            });
          },
        );
      },
    );
  },
);
