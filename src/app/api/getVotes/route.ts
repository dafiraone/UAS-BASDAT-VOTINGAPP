import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const votes = await prisma.$queryRaw`SELECT * FROM pilihan`
        return NextResponse.json(votes)
    } catch (error) {

    }
}