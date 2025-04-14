import { ContentPlannerResponse, GenerateContentInput } from "../types/openai.type"
import { prisma } from "../utils/prisma"

// This function saves the generated content to the database
export const saveGeneratedContent = async ({
    userInput,
    generatedContent,
    userId
}: {userInput: GenerateContentInput, generatedContent: ContentPlannerResponse, userId: number}) => {
    const {duration, niche, targetAudience, tone} = userInput

    const contentItems = generatedContent.contentPlanner.map((item) => ({
        day: item.day,
        title: item.title,
        description: item.description,
        topic: item.topic,
        hashtags: item.hashtags,
        script: JSON.stringify(item.script),
    }))

    try {
        await prisma.content.create({
            data: {
                duration,
                niche,
                targetAudience,
                tone,
                contentItems: {
                    create: contentItems
                },
                user: {
                    connect: { id: userId },
                },
            },
        })
    } catch (error) {
        console.error("Error saving generated content:", error)
    }
}

// This function retrieves the generated content from the database
export const getGeneratedContent = async (userId: number) => {
    try {
        const content = await prisma.content.findMany({
            where: { userId },
            include: { contentItems: true },
        })

        return content
    } catch (error) {
        console.error("Error retrieving generated content:", error)
    }
}

// This function deletes the generated content from the database
export const deleteGeneratedContent = async (contentId: number) => {
    try {
        await prisma.content.delete({
            where: { id: contentId },
        })
    } catch (error) {
        console.error("Error deleting generated content:", error)
    }
}
