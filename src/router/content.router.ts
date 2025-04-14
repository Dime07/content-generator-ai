import { Elysia, t } from "elysia";
import { generateContentByAi } from "../services/openai.service";
import { getGeneratedContent, saveGeneratedContent } from "../services/content.service";
import jwt from "@elysiajs/jwt";
import { authMiddleware, jwtPlugin } from "../utils/plugin";

export const ContentRouter = new Elysia()
    .use(jwtPlugin)
    .use(authMiddleware)
    .get("/content", async ({ user }) => {
        const content = await getGeneratedContent(user.id)
        return {
            message: "Content retrieved successfully",
            data: content
        }
    })
    .post("/content", async ({body, user}) => {
        const {duration, niche, targetAudience, tone} = body

        const result = await generateContentByAi({duration, niche, targetAudience, tone})
        
        await saveGeneratedContent({
            userInput: {duration, niche, targetAudience, tone},
            generatedContent: result,
            userId: user.id
        })

        return {
            message: "Content generated successfully",
            data: {}
        }
    }, {
        body: t.Object({
            duration: t.String(),
            niche: t.String(),
            targetAudience: t.String(),
            tone: t.String(),
        })
    })
    .onError((error) => {
        console.error("Error:", error);
        return { message: error };
    })