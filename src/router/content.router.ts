import { Elysia, t } from "elysia";
import { getAllContent } from "../services/content.service";

export const ContentRouter = new Elysia()
    .get("/content", () => {
        const contents = getAllContent()
        return contents
    })
    .post("/content", ({body}) => {
        const {duration, niche, targetAudience, tone} = body
        
        return "Content Generated"
    }, {
        body: t.Object({
            duration: t.String(),
            niche: t.String(),
            targetAudience: t.String(),
            tone: t.String(),
        })
    })