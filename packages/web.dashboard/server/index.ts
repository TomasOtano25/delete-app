import { createServer } from "http";
import * as next from "next";
import { routes } from "./routes";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  createServer((response, request) => {
    handler(response, request);
  }).listen(port, (error: any) => {
    if (error) throw error;
    console.log(`Ready on http://localhost:${port}`);
  });
});
