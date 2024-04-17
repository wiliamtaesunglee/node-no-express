import http from "node:http";
import { routes } from "./routes.js";
import { json } from "./middleware/json.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    console.log(route.method, route.path.test(url));
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);
    console.log({ routeParams });
    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3000);
