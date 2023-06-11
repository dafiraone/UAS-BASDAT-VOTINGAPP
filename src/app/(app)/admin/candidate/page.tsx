import CandidateList from "@/lib/candidateList"
import CandidateCard from "@/components/CandidateCard"

type Votes = {
    id: number
    nama: string
    image: string
    visi: string
    misi: string
    jumlah_pemilih?: number
}

export default async function Candidate() {
    const dataVoting: any = await CandidateList()
    return (
        <>
            <section className='flex flex-wrap flex-col md:flex-row gap-10 justify-center items-center mb-16'>
                {dataVoting.map((v: Votes) => (
                    <CandidateCard key={v.id} id={v.id} nama={v.nama} visi={v.visi} misi={v.misi} image={v.image} />
                ))}
            </section>
        </>
    )
}
