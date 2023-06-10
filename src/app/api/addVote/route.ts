import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { name, visi, misi } = await req.json()
    try {
        await prisma.$queryRaw`INSERT INTO pilihan VALUES (null, ${name}, ${visi}, ${misi}, 0)`
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            code: error.code,
            meta: error.meta
        }, { status: 500 })
    }
    return NextResponse.json({ pilihan: { name, visi, misi } })
}