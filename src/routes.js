import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const users = database.select("users");

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      console.log({ body: req.body });

      const { name, email } = req.body;

      const user = {
        id: randomUUID(),
        name,
        email,
      };

      database.insert("users", user);

      return res.writeHead(201).end();
    },
  },
  {
    method: "UPDATE",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      const { name, email } = req.body;
      database.update("users", {
        name,
        email,
        id: req.params.id,
      });
      return res.end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      console.log(req.params);
      database.delete("users", req.params.id);
      return res.end();
    },
  },
];
