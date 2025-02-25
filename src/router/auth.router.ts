import { Elysia } from "elysia";

export const AuthRouter = new Elysia()
    .get("/sign-in", () => "Sign in router")
    .get("/sign-up", () => "Sign in router")