import fs from "node:fs/promises";

const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => this.#persist());
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    return this.#database[table] ?? [];
  }

  insert(table, data) {
    const database = this.#database[table] ?? [];
    database.push(data);
    this.#database[table] = database;

    this.#persist();

    return data;
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    console.log(rowIndex, this.#database);
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      console.log(this.#database);
      this.#persist();
    }
  }
}
