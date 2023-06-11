import { prisma } from "./prisma"

export default async function GetImage(email: string) {
    return await prisma.$queryRaw`SELECT image FROM User WHERE email = ${email}`
}