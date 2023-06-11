import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { voteId } = await req.json()
    console.log(voteId)
    const votes = await prisma.$queryRaw`DELETE FROM Pilihan WHERE id = ${voteId}`
    return NextResponse.json(votes)
}