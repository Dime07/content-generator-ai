import { Elysia } from "elysia";
import { AuthRouter } from "./router/auth.router";
import { ContentRouter } from "./router/content.router";

const app = new Elysia()
  .use(ContentRouter)
  .use(AuthRouter)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
