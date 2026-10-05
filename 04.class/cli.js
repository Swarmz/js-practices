import readline from "readline";
import select from "@inquirer/select";

export default class CLI {
  constructor(repository) {
    this.repo = repository;
  }

  async addMemo() {
    const body = await this.#getMemoBody();

    await this.repo.insertMemo(body);
  }

  async listMemos() {
    const memos = await this.repo.getMemos();

    memos.forEach((memo) => console.log(memo.title()));
  }

  async referenceMemos() {
    const memos = await this.repo.getMemos();

    const selectedMemo = await select({
      message: "Choose a note you want to see:",
      choices: memos.map((memo) => ({
        name: memo.title(),
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
        name: memo.title(),
        value: memo.id,
        description: memo.body,
      })),
    });

    await this.repo.deleteMemo(selectedMemo);
  }

  #getMemoBody() {
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const lines = [];

      rl.on("line", (line) => lines.push(line));

      rl.on("close", () => {
        const body = lines.join("\n");

        if (body.trim() === "") {
          reject(new Error("Memo cannot be blank."));
        } else {
          resolve(body);
        }
      });
    });
  }
}
