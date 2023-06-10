import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

async function main() {
    const password = await hash('dafira.one@nextvote', 12)
    const user = await prisma.user.upsert({
        where: {
            email: 'daffa@admin.com'
        },
        update: {},
        create: {
            email: 'daffa@admin.com',
            name: 'Daffa',
            password,
            role: 'Admin',
            status_pilih: true
        }
    })
    console.log({ user })
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })