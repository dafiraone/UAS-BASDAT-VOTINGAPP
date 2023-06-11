"use client"

import Image from "next/image"
import Navbar from "@/components/Navbar"
import Link from "next/link"
import { useEffect, useState } from "react"
import { signOut, useSession } from "next-auth/react"

interface Votes {
    id: number
    nama: string
    visi: string
    misi: string
    jumlah_pemilih: number
}

export default function Vote() {
    const { data: session } = useSession()
    const [votes, setVotes] = useState<Votes[]>([])
    const [onVoteAction, setOnVoteAction] = useState(false)

    useEffect(() => {
        fetch('/api/getCandidate')
            .then(res => res.json())
            .then(data => setVotes(data))
    }, [])

    const onSubmit = async (voteId: number) => {
        setOnVoteAction(true)
        try {
            await fetch('/api/voteAction', {
                method: 'POST',
                body: JSON.stringify({
                    session: session?.user?.email, voteId
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            signOut()
        } catch (error) {
            console.log(error)
        }
    }

    return <>
        <Navbar title="VOTE" user={session?.user?.name!}>
            <Link href={'/'}>Home</Link>
        </Navbar>
        <main>
            {onVoteAction ? (<h1 className="text-3xl font-bold text-center my-10 md:mb-20">Terimakasih Sudah Memilih</h1>)
                : (<h1 className="text-3xl font-bold text-center my-10 md:mb-20">Pilih Salah Satu</h1>)}
            <section className={`${onVoteAction ? 'hidden' : 'flex'} flex-wrap flex-col md:flex-row gap-10 justify-center items-center mb-16`}>
                {votes.map(v => (
                    <div key={v.id} className="card w-96 bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <Image
                                src="https://images.unsplash.com/photo-1666919643134-d97687c1826c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                                alt="" className="rounded-xl" width={500} height={500} />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{v.nama}</h2>

                            <div className="join join-vertical w-full">
                                <div className="collapse collapse-arrow join-item border border-base-300">
                                    <input type="radio" name="my-accordion-1" />
                                    <div className="collapse-title text-xl font-medium">
                                        Visi
                                    </div>
                                    <div className="collapse-content">
                                        <p>{v.visi}</p>
                                    </div>
                                </div>
                                <div className="collapse collapse-arrow join-item border border-base-300">
                                    <input type="radio" name="my-accordion-1" />
                                    <div className="collapse-title text-xl font-medium">
                                        Misi
                                    </div>
                                    <div className="collapse-content">
                                        <p>{v.misi}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card-actions">
                                <button className="btn btn-neutral" onClick={() => window[v.id].showModal()}>VOTE</button>
                                <dialog id={v.id.toString()} className="modal">
                                    <form method="dialog" className="modal-box">
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        <h3 className="font-bold text-lg">Yakin?</h3>
                                        <p className="py-4">Kamu ingin vote {v.nama}</p>
                                        <div className="modal-action">
                                            <button className="btn" onClick={() => onSubmit(v.id)}>VOTE</button>
                                        </div>
                                    </form>
                                </dialog>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </main>
    </>


}