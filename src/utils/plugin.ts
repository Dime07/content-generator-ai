import jwt from "@elysiajs/jwt";
import Elysia from "elysia";
import {  getUserById } from "../services/user.service";

export const jwtPlugin = new Elysia()
    .use(jwt({
        name: "jwt",
        secret: "planning-on-the-go", // Consider using environment variable for production
    }))
    .derive(async ({ jwt, cookie: { accessToken }, set }) => {
        if (!accessToken.value) {
            // handle error for access token is not available
            set.status = 401;
            throw new Error("Access token is missing");
        }

        const jwtPayload = await jwt.verify(accessToken.value);
        if (!jwtPayload) {
            // handle error for access token is tempted or incorrect
            set.status = 403;
            throw new Error("Access token is invalid");
        }

        const userId = jwtPayload.sub;
        const user = await getUserById(Number(userId));

        if (!user) {
        // handle error for user not found from the provided access token
        set.status = 403;
        throw new Error("Access token is invalid");
        }

        return {
            user
        };
    })

