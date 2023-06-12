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
                        src={'https://images.unsplash.com/photo-1685793473835-96480c52c05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=712&q=80'}
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
                        src={'https://images.unsplash.com/photo-1685793473835-96480c52c05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=712&q=80'}
                        alt="Zidan"
                        width={350}
                        height={350}
                    />
                </section>
            </div>
        </main>
    </>
}