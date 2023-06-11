import PieChart from "@/components/PieChart"
import CandidateList from "@/lib/candidateList"
export const revalidate = 10
export default async function Result() {
    const dataVoting: any = await CandidateList()
    const voteData = {
        labels: dataVoting.map((voted: any) => voted.nama),
        datasets: [
            {
                label: "Popularity",
                data: dataVoting.map((voted: any) => voted.jumlah_pemilih),
                // backgroundColor: ['red', 'green', 'blue', 'orange', 'yellow', 'purple', 'gray', 'violet', 'teal', 'pink', 'gold', 'cyan', 'black'],
                backgroundColor: ['red'],
                borderColor: '#f4436',
                borderWidth: 2
            }
        ]
    }

    return (
        <section className="w-1/2">
            <PieChart chartData={voteData} />
        </section>
    )
}