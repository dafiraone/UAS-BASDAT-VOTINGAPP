import Navbar from "@/components/Navbar"
import { getServerSession } from "next-auth"
import Link from "next/link"
import CardCandidate from "@/components/CardCandidate"
import CandidateList from "@/lib/candidateList"

type Votes = {
    id: number
    nama: string
    image: string
    description: string
    jumlah_pemilih?: number
}

export default async function Vote() {
    const session = await getServerSession()
    const candidate: Votes[] = await CandidateList() as Votes[]
    console.log(candidate)
    return <>
        <Navbar title="VOTE" user={session?.user?.name!}>
            <Link href={'/'}>Home</Link>
            <Link href={'/hasil'}>Perolehan</Link>
        </Navbar>
        <main>
            <section className="pb-16 px-6">
                <CardCandidate candidate={candidate} session={session?.user?.email!} />
            </section>
        </main>
    </>


}