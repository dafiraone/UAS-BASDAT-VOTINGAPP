import Navbar from "@/components/Navbar"
import { getServerSession } from "next-auth"
import Link from "next/link"
import CardCandidate from "@/components/CardCandidate"
import CandidateList from "@/lib/candidateList"

type Votes = {
    id: number
    nama: string
    visi: string
    misi: string
    jumlah_pemilih?: number
}

export default async function Vote() {
    const session = await getServerSession()
    const candidate: Votes[] = await CandidateList() as Votes[]
    return <>
        <Navbar title="VOTE" user={session?.user?.name!}>
            <Link href={'/'}>Home</Link>
        </Navbar>
        <main>
            <h1 className="text-3xl font-bold text-center my-10 md:mb-20">Pilih Salah Satu</h1>
            <section className="flex flex-wrap flex-col md:flex-row gap-10 justify-center items-center mb-16">
                <CardCandidate candidate={candidate} session={session?.user?.email!} />
            </section>
        </main>
    </>


}