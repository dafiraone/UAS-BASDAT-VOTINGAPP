import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const votes = await prisma.$queryRaw`SELECT image, id FROM Pilihan`
    return NextResponse.json(votes)
}