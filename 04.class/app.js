#!/usr/bin/env node

import sqlite3 from "sqlite3";
import Memo from "./Memo.js";
import minimist from "minimist";
import readline from "readline";
import select from "@inquirer/select";

const args = minimist(process.argv.slice(2));
const db = new sqlite3.Database("./memo_data.db");

db.run(
  "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, body TEXT NOT NULL)",
);

const addMemo = () => {
  console.log("Press Ctrl+D on an empty line to save.");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const lines = [];

  rl.on("line", (line) => lines.push(line));
  rl.on("close", () => {
    const value = lines.join("\n");
    db.run("INSERT INTO memos (body) VALUES (?)", value, () => {
      db.close();
    });
  });
};

const buildMemosList = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM memos", (err, rows) => {
      if (err) return reject(err);

      resolve(rows.map((row) => new Memo(row.id, row.body)));
    });
  });
};

const displayMemos = async () => {
  const memos = await buildMemosList();
  memos.forEach((m) => console.log(m.firstLine()));
};

const referenceMemos = async () => {
  const memos = await buildMemosList();

  const selectedMemo = await select({
    message: "Choose a note you want to see:",
    choices: memos.map((memo) => ({
      name: memo.firstLine(),
      value: memo.body,
      description: memo.body,
    })),
    theme: {
      style: {
        answer: () => "",
      },
    },
  });
  return console.log(selectedMemo);
};

const deleteMemo = async () => {
  const memos = await buildMemosList();

  const selectedMemo = await select({
    message: "Choose a note you want to delete:",
    choices: memos.map((memo) => ({
      name: memo.firstLine(),
      value: memo.id,
      description: memo.body,
    })),
  });

  db.run("DELETE FROM memos WHERE id = ?", [selectedMemo]);
};

if (args.l) {
  displayMemos();
} else if (args.r) {
  referenceMemos();
} else if (args.d) {
  deleteMemo();
} else {
  addMemo();
}
