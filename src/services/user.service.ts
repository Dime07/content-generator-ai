import { User } from "@prisma/client"
import { prisma } from "../utils/prisma"

export const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        })
        return user
    } catch (error) {
        console.error("Error retrieving user:", error)
        throw error
    }
}

export const getUserById = async (id: number): Promise<User | null> => {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        })
        return user
    } catch (error) {
        console.error("Error retrieving user:", error)
        throw error
    }
}

export const createUser = async (userData: { email: string; password: string, name: string }): Promise<User> => {
    try {
        const user = await prisma.user.create({
            data: userData,
        })
        return user
    } catch (error) {
        console.error("Error creating user:", error)
        throw error
    }
}


