import { prisma } from "../utils/prisma"

export const getAllContent =async () => {
    return prisma.content.findMany()
}

