import { Elysia } from "elysia";
import { AuthRouter } from "./router/auth.router";
import { ContentRouter } from "./router/content.router";
import {  jwtPlugin } from "./utils/plugin";


const app = new Elysia()
  .use(jwtPlugin)  
  .use(AuthRouter)
  .use(ContentRouter)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
