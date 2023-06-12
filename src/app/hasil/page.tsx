import PieChart from "@/components/PieChart"
import CandidateList from "@/lib/candidateList"
import Navbar from "@/components/Navbar"
import Link from "next/link"
import { getServerSession } from "next-auth"

export const revalidate = 10

export const metadata = {
    title: 'Hasil Voting',
}

export default async function Result() {
    const session = await getServerSession()
    const dataVoting: any = await CandidateList()
    const voteData = {
        labels: dataVoting.map((voted: any) => voted.nama),
        datasets: [
            {
                label: "Popularity",
                data: dataVoting.map((voted: any) => voted.jumlah_pemilih),
                backgroundColor: ['red', 'green', 'blue', 'orange', 'yellow', 'purple', 'gray', 'violet', 'teal', 'pink', 'gold', 'cyan', 'black'],
                borderColor: '#f4436',
                borderWidth: 2
            }
        ]
    }

    return (
        <>
            <Navbar title="Hasil Voting" user={session?.user?.name!}>
                <Link href={'/'}>Home</Link>
            </Navbar>
            <PieChart chartData={voteData} />
        </>

    )
}