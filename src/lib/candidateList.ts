import { prisma } from "./prisma"

export default async function CandidateList() {
    return await prisma.$queryRaw`SELECT * FROM pilihan`
}