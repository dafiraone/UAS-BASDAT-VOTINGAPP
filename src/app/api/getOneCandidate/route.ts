import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { voteId } = await req.json()
    const votes: any = await prisma.$queryRaw`SELECT * FROM Pilihan where id = ${voteId}`
    return NextResponse.json(votes[0])
}