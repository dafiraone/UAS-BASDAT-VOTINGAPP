/* eslint-disable @next/next/no-img-element */
"use client"

import { signOut } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"

type Votes = {
    candidate: {
        id: number
        image: string
        nama: string
        visi: string
        misi: string
    }[]
    session: string
}

export default function CardCandidate({ candidate, session }: Votes) {
    const [onVoteAction, setOnVoteAction] = useState(true)

    const onSubmit = async (voteId: number) => {
        setOnVoteAction(false)
        try {
            await fetch('/api/voteAction', {
                method: 'POST',
                body: JSON.stringify({
                    session, voteId
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            signOut()
        } catch (error) {
            console.log(error)
        }
    }

    return <>
        {onVoteAction ?
            (
                <>
                    <h1 className="text-3xl font-bold text-center my-10 md:mb-20">Pilih Salah Satu</h1>
                    <div className="flex flex-wrap gap-16 items-center justify-center">
                        {candidate.map((v: any) => <div key={v.id} className="card w-96 bg-base-100 shadow-xl">
                            <figure className="px-10 pt-10">
                                {v.image ? <Image
                                    src={v.image}
                                    alt="" className="rounded-xl" width={500} height={500} />
                                    : <Image
                                        src={'/img/Vote_Illustration.png'}
                                        alt="" className="rounded-xl w-[150px] h-[150px] object-cover object-top" width={500} height={500} />}
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
                        </div>)}
                    </div>
                </>
            )
            : (
                <h1 className="text-3xl font-bold text-center my-10 md:mb-20">Terimakasih sudah Memilih</h1>
            )}
    </>
}