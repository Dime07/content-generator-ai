import { Elysia, t } from "elysia";
import { getAllContent } from "../services/content.service";
import { generateContentByAi } from "../services/openai.service";

export const ContentRouter = new Elysia()
    .get("/content", () => {
        const contents = getAllContent()
        return contents
    })
    .post("/content", async ({body}) => {
        const {duration, niche, targetAudience, tone} = body

        const result = await generateContentByAi({duration, niche, targetAudience, tone})
        
        return result
    }, {
        body: t.Object({
            duration: t.String(),
            niche: t.String(),
            targetAudience: t.String(),
            tone: t.String(),
        })
    })