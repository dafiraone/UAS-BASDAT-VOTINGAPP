import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const votes = await prisma.$queryRaw`SELECT * FROM pilihan`
    return NextResponse.json(votes)
}