import Navbar from "@/components/Navbar"
import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { authOptions } from "./api/auth/[...nextauth]/route"

export const metadata = {
  title: 'Voting App',
  description: 'Aplikasi Web Voting Online yang dibuat oleh Kelompok Daffa & Zidan',
}

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <>
      <Navbar title="Voting App" user={session?.user?.name!}>
        <Link href={'/login'}>Login</Link>
        <Link href={'/about'}>About</Link>
      </Navbar>
      <main className="flex justify-center items-center">
        <section className="bg-[#F9F9F9] w-full h-screen p-20">
          <h1 className="text-3xl font-bold text-center mb-10 md:mb-20">Aplikasi Voting Online</h1>
          <div className="flex justify-center gap-2">
            <Image
              className="drop-shadow-xl mx-auto mt-8 hidden lg:inline"
              src={'/img/Vote_Illustration.png'}
              alt="Vote"
              width={217}
              height={300}
            />
            <Image
              className="drop-shadow-xl mx-auto mt-8"
              src={'/img/Vote_Illustration.png'}
              alt="Vote"
              width={217}
              height={300}
            />
          </div>
        </section>
      </main>
    </>
  )
}
