import Link from "next/link"

export default function NotFound() {
    return <main className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-6xl">Halaman Tidak Ditemukan</h1>
        <p className="text-3xl text-red-500">404 Not Found</p>
        <Link href={'/vote'} className="mt-12 text-blue-500 underline">Mulai Vote</Link>
    </main>
}