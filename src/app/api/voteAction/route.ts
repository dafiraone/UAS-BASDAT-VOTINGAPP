import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { session, voteId } = await req.json()
    await prisma.$queryRaw`UPDATE User SET status_pilih = false WHERE email = ${session}`
    await prisma.$queryRaw`UPDATE Pilihan SET jumlah_pemilih = jumlah_pemilih + 1 where id = ${voteId}`
    return NextResponse.json({ voteId }, { status: 200 })
}