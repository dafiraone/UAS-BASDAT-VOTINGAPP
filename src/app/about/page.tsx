import Image from "next/image"
import Navbar from "@/components/Navbar"
import Link from "next/link"
import { Metadata } from "next"
import { getServerSession } from "next-auth"

export const metadata: Metadata = {
    title: 'About Page',
}

export default async function About() {
    const session = await getServerSession()
    return <>
        <Navbar title="About Us" user={session?.user?.name!}>
            {session?.user?.name! && <Link href={'/vote'}>Vote</Link>}
            <Link href={'/hasil'}>Perolehan</Link>
            <Link href={'/'}>Home</Link>
        </Navbar>
        <main className="text-center text-black">
            <div className="md:flex justify-evenly pt-20">
                <section className="p-5">
                    <h1 className="text-2xl font-semibold">Muhammad Daffa Deli Junior Irawan</h1>
                    <p className="text-xl font-semibold">152022003</p>
                    <Image
                        className="border-black drop-shadow-xl rounded-full mx-auto mt-8"
                        src={'/img/Vote_Illustration.png'}
                        alt="Daffa"
                        width={350}
                        height={350}
                    />
                </section>
                <section className="p-5">
                    <h1 className="text-2xl font-semibold">Alzidan Indrawan</h1>
                    <p className="text-xl font-semibold">152022107</p>
                    <Image
                        className="border-black drop-shadow-xl rounded-full mx-auto mt-8"
                        src={'/img/Vote_Illustration.png'}
                        alt="Zidan"
                        width={350}
                        height={350}
                    />
                </section>
            </div>
        </main>
    </>
}
