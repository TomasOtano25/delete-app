import * as express from "express";
import * as next from "next";
const nextI18NextMiddleware = require("next-i18next/middleware");

import nextI18next from "../i18n";

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {
  await app.prepare();

  const server = express();

  server.use(nextI18NextMiddleware(nextI18next));

  server.get("*", (req: any, res: any) => handle(req, res));

  await server.listen(port, (error: any) => {
    if (error) throw error;
    console.log(`> Ready on http://localhost:${port}`);
  });
})();
