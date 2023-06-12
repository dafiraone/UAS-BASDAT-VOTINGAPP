import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { name, description, image } = await req.json()
    try {
        await prisma.$queryRaw`INSERT INTO Pilihan VALUES (null, ${name}, ${image}, ${description}, 0)`
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            code: error.code,
            meta: error.meta
        }, { status: 500 })
    }
    return NextResponse.json({ pilihan: { name, description } })
}