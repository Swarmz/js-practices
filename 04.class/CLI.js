import readline from "readline";
import select from "@inquirer/select";

export default class CLI {
  constructor(repository) {
    this.repo = repository;
  }

  readInput() {
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      const lines = [];

      rl.on("line", (line) => lines.push(line));
      rl.on("close", () => {
        resolve(lines.join("\n"));
      });
    });
  }

  async addMemo() {
    const body = await this.readInput();
    await this.repo.insertMemo(body);
  }

  async displayMemos() {
    const titles = await this.repo.memoTitles();
    titles.forEach((title) => console.log(title));
  }

  async referenceMemos() {
    const memoList = await this.repo.getMemos();

    const selectedMemo = await select({
      message: "Choose a note you want to see:",
      choices: memoList.map((memo) => ({
        name: memo.firstLine(),
        value: memo.body,
      })),
      theme: {
        style: {
          answer: () => "\n--------------------------------",
        },
      },
    });

    console.log(selectedMemo);
  }

  async deleteMemo() {
    const memos = await this.repo.getMemos();

    const selectedMemo = await select({
      message: "Choose a note you want to delete:",
      choices: memos.map((memo) => ({
        name: memo.firstLine(),
        value: memo.id,
        description: memo.body,
      })),
    });

    await this.repo.deleteMemo(selectedMemo);
  }
}
