#!/usr/bin/env node

import sqlite3 from "sqlite3";
import minimist from "minimist";
import readline from "readline";
import select from "@inquirer/select";
import MemoRepository from "./MemoRepository.js";

const args = minimist(process.argv.slice(2));
const db = new sqlite3.Database("./memo_data.db");
const repository = new MemoRepository(db)

const addMemo = () => {
  console.log("Press Ctrl+D on an empty line to save.");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const lines = [];

  rl.on("line", (line) => lines.push(line));
  rl.on("close", () => {
    const body = lines.join("\n");
    repository.addMemo(body);
    db.close();
  });
};

const displayMemos = async () => {
  const titles = await repository.memoTitles();
  titles.forEach((title) => console.log(title));
};

const referenceMemos = async () => {
  const memoList = await repository.getMemos();

  const selectedMemo = await select({
    message: "Choose a note you want to see:",
    choices: memoList.map((memo) => ({
      name: memo.firstLine(),
      value: memo.body,
    })),
    theme: {
      style: {
        answer: () => "",
      },
    },
  });

  console.log(selectedMemo);
};

const deleteMemo = async () => {
  const memos = await repository.getMemos();

  const selectedMemo = await select({
    message: "Choose a note you want to delete:",
    choices: memos.map((memo) => ({
      name: memo.firstLine(),
      value: memo.id,
      description: memo.body,
    })),
  });

  repository.deleteMemo(selectedMemo);
};

repository.createTable();

if (args.l) {
  displayMemos();
} else if (args.r) {
  referenceMemos();
} else if (args.d) {
  deleteMemo();
} else {
  addMemo();
}
