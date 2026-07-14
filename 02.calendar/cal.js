#!/usr/bin/env node

import minimist from "minimist";

const args = minimist(process.argv.slice(2));

const today = new Date();
const month = args.m ?? today.getMonth() + 1;
const year = args.y ?? today.getFullYear();

const firstDay = new Date(year, month - 1, 1);
const lastDay = new Date(year, month, 0);

const yearMonth = `${month}月 ${year}`;

console.log(yearMonth.padStart((20 + yearMonth.length) / 2));
console.log("日 月 火 水 木 金 土");

process.stdout.write("   ".repeat(firstDay.getDay()));
for (
  let day = new Date(firstDay);
  day <= lastDay;
  day.setDate(day.getDate() + 1)
) {
  process.stdout.write(`${String(day.getDate()).padStart(2, " ")}`);
  
  if (day.getDay() !== 6 && day.getDate() !== lastDay.getDate()) {
    process.stdout.write(" ");
  }

  if (day.getDay() === 6) {
    process.stdout.write("\n");
  }
}
process.stdout.write("\n");
