
import { Elysia, t } from "elysia";
import { createUser, getUserByEmail } from "../services/user.service";
import {  authMiddleware, jwtPlugin } from "../utils/plugin";

export const AuthRouter = new Elysia()
    .use(jwtPlugin)
    .use(authMiddleware)
    .get("/me", async ({ dataTest }) => {
        return {
            message: "User retrieved successfully",
            data: dataTest
        }
    })
    .post("/sign-in", async ({ body, jwt }) => {
        const { email, password } = body;

        // check user
        const user = await getUserByEmail(email);
        if (!user) {
            return { message: "User not found" };
        }
        // check password
        const isPasswordValid = await Bun.password.verify(password, user.password);
        if (!isPasswordValid) {
            return { message: "Invalid password" };
        }
        // generate token
        const token =await  jwt.sign({ id: user.id, email: user.email });

        console.log(token)

        return {
            message: "User signed in successfully",
            data: {
                id: user.id,
                email: user.email,
                token
            }
        }
    }, {
        body: t.Object({
            email: t.String(),
            password: t.String()
        }),
    })
    .post("/sign-up", async ({ body, jwt }) => {
        const { email, password, name } = body;

        // check user
        const user = await getUserByEmail(email);
        if (user) {
            return { message: "User already exists" };
        }
        // hash password
        const hashedPassword = await Bun.password.hash(password);
        // create user
        const newUser = await createUser({ email, password: hashedPassword, name });

        // generate token
        const token = await jwt.sign({ id: newUser.id, email: newUser.email });

        return {
            message: "User created successfully",
            data: {
                id: newUser.id,
                email: newUser.email,
                token
            }
        }
    }, {
        body: t.Object({
            email: t.String(),
            password: t.String(),
            name: t.String()
        })
    })

    
