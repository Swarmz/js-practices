#!/usr/bin/env node

import sqlite3 from "sqlite3";
import minimist from "minimist";
import MemoRepository from "./memoRepository.js";
import CLI from "./cli.js";
import { close } from "./sqlitePromises.js";

const args = minimist(process.argv.slice(2));
const db = new sqlite3.Database("./memoData.db");
const repository = new MemoRepository(db);
const cli = new CLI(repository);

try {
  await repository.createTable();

  if (args.l) {
    await cli.listMemos();
  } else if (args.r) {
    await cli.referenceMemos();
  } else if (args.d) {
    await cli.deleteMemo();
  } else {
    console.log("Press Ctrl+D on an empty line to save.");
    await cli.addMemo();
  }
} catch (err) {
  console.error(err.message);
} finally {
  await close(db);
}
