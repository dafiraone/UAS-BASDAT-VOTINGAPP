import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { id, name, desc } = await req.json()
    try {
        await prisma.$queryRaw`UPDATE Pilihan SET nama = ${name}, description = ${desc} WHERE id = ${id}`
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            code: error.code,
            meta: error.meta
        }, { status: 500 })
    }
    return NextResponse.json({ pilihan: { name, desc } }, { status: 200 })
}