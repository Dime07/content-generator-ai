import jwt from "@elysiajs/jwt";
import Elysia from "elysia";

export const jwtPlugin = new Elysia().use(jwt({
    name: "jwt",
    secret: "planning-on-the-go", // Consider using environment variable for production
}))