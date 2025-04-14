import jwt from "@elysiajs/jwt";
import Elysia from "elysia";
import {  getUserById } from "../services/user.service";

export const jwtPlugin = new Elysia()
    .use(jwt({
        name: "jwt",
        secret: "planning-on-the-go", // Consider using environment variable for production
    }))


export const authMiddleware = (app: Elysia) => 
    app
    .use(jwtPlugin)
    .derive(async ({ jwt, headers, set }) => {
        // Extract token from Authorization header
        const authHeader = headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            // handle error for bearer token is not available
            set.status = 401;
            throw new Error("Authorization token is missing");
        }

        // Get the token part after "Bearer "
        const token = authHeader.substring(7);
        
        const jwtPayload = await jwt.verify(token);
        if (!jwtPayload) {
            // handle error for token is tempered or incorrect
            set.status = 403;
            throw new Error("Authorization token is invalid");
        }

        // Extract user ID from payload - use id instead of sub to match your auth.router.ts
        const userId = jwtPayload.id;
        if (!userId) {
            set.status = 403;
            throw new Error("Invalid token payload");
        }
        
        const user = await getUserById(Number(userId));

        if (!user) {
            // handle error for user not found from the provided token
            set.status = 403;
            throw new Error("User not found");
        }

        return {
            user,
            dataTest: "test"
        };
    })
