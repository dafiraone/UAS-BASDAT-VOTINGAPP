import { prisma } from "./prisma"

export const revalidate = 10

export default async function CandidateList() {
    return await prisma.$queryRaw`SELECT * FROM Pilihan`
}