import { Elysia, t } from "elysia";
import { generateContentByAi } from "../services/openai.service";
import { saveGeneratedContent } from "../services/content.service";
import jwt from "@elysiajs/jwt";

export const ContentRouter = new Elysia()
    .post("/content", async ({body}) => {
        const {duration, niche, targetAudience, tone} = body

        const result = await generateContentByAi({duration, niche, targetAudience, tone})
        
        await saveGeneratedContent({
            userInput: {duration, niche, targetAudience, tone},
            generatedContent: result
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