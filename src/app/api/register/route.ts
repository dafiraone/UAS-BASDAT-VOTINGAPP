import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { name, email, password } = await req.json()
    const hashed = await hash(password, 10)

    try {
        await prisma.$queryRaw`INSERT INTO user VALUES (null, ${email}, ${name}, ${hashed}, "User", true)`
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            code: error.code,
            meta: error.meta
        }, { status: 500 })
    }

    return NextResponse.json({
        user: {
            name, email, hashed
        }
    })
}