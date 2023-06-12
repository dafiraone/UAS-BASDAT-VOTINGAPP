"use client"

import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { useEffect } from "react"
ChartJS.register(ArcElement, Tooltip, Legend)

export default function PieChart({ chartData }: { chartData: any }) {

  useEffect(() => {
    setInterval(() => {
      window.location.reload()
    }, 5000)
  }, [])
  return <main className="md:max-w-screen md:max-h-screen flex flex-wrap justify-center items-center md:p-24">
    <Pie data={chartData} />
  </main>
}
