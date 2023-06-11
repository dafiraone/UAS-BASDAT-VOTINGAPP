import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const votes = await prisma.$queryRaw`SELECT * FROM Pilihan`
    return NextResponse.json(votes)
}