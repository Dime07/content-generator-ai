import { Elysia } from "elysia";

export const AuthRouter = new Elysia()
    .get("/sign-in", () => "Sign up router")
    .get("/sign-up", () => "Sign up router")