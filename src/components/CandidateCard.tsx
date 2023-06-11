"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { startTransition, useEffect, useState } from "react"

type Candidate = {
    id: number
    nama: string
    visi: string
    misi: string
}

export default function CandidateCard({ id, nama, visi, misi }: Candidate) {
    const [rePage, setRePage] = useState(false)
    const router = useRouter()

    const onSubmit = async (voteId: number) => {
        try {
            await fetch('/api/deleteVote', {
                method: 'POST',
                body: JSON.stringify({
                    voteId
                }),
                headers: { 'Content-Type': 'application/json' }
            })

            startTransition(() => {
                setRePage(rePage => !rePage)
                router.refresh()
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div key={id} className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <Image
                    src="https://images.unsplash.com/photo-1666919643134-d97687c1826c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                    alt="" className="rounded-xl" width={500} height={500} />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{nama}</h2>

                <div className="join join-vertical w-full">
                    <div className="collapse collapse-arrow join-item border border-base-300">
                        <input type="radio" name="my-accordion-1" />
                        <div className="collapse-title text-xl font-medium">
                            Visi
                        </div>
                        <div className="collapse-content">
                            <p>{visi}</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow join-item border border-base-300">
                        <input type="radio" name="my-accordion-1" />
                        <div className="collapse-title text-xl font-medium">
                            Misi
                        </div>
                        <div className="collapse-content">
                            <p>{misi}</p>
                        </div>
                    </div>
                </div>

                <div className="card-actions">
                    <button className="btn btn-warning" onClick={() => window[id].showModal()}>Hapus</button>
                    <dialog id={id.toString()} className="modal">
                        <form method="dialog" className="modal-box">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            <h3 className="font-bold text-lg">Yakin?</h3>
                            <p className="py-4">Kamu ingin hapus? {nama}</p>
                            <div className="modal-action">
                                <button className="btn" onClick={() => onSubmit(id)}>Hapus</button>
                            </div>
                        </form>
                    </dialog>
                </div>
                <Link className="btn btn-sm btn-outline btn-secondary" href={`/admin/candidate/${id}`}>Edit</Link>
            </div>
        </div>)
}