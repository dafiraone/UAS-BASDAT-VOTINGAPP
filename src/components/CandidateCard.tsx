"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { startTransition, useEffect, useState } from "react"

type Candidate = {
    id: number
    nama: string
    image: string
    visi: string
    misi: string
}

export default function CandidateCard({ id, nama, visi, misi, image }: Candidate) {
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
                {image ? <Image
                    src={image}
                    alt="" className="rounded-xl" width={500} height={500} />
                    : <Image
                        src={'/img/Vote_Illustration.png'}
                        alt="" className="rounded-xl w-[150px] h-[150px] object-cover object-top" width={500} height={500} />}
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