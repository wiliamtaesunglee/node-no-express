import fs from "node:fs/promises";

const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf8")
      .then((data) => {
        console.log({ data });
        this.#database = JSON?.parse(data);
      })
      .catch(() => (this.#database = {}));
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    console.log({ select: this.#database });
    return this.#database[table] ?? [];
  }

  insert(table, data) {
    const database = this.#database[table] ?? [];
    database.push(data);
    this.#database[table] = database;

    this.#persist();

    return data;
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data };
      this.#persist();
    }
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
