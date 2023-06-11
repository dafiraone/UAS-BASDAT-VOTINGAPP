"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Candidate() {
  const {data: session} = useSession()
  const [votes, setVotes] = useState<Votes[]>([])

  useEffect(() => {
    fetch('/api/getCandidate')
        .then(res => res.json())
        .then(data => setVotes(data))
  }, [])

  return (
    <>
    <section className={`flex-wrap flex-col md:flex-row gap-10 justify-center items-center mb-16`}>
                {votes.map(v => (
                    <div key={v.id} className="card w-96 bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <Image
                                src="https://images.unsplash.com/photo-1666919643134-d97687c1826c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                                alt="" className="rounded-xl" width={500} height={500} />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">nama</h2>

                            <div className="join join-vertical w-full">
                                <div className="collapse collapse-arrow join-item border border-base-300">
                                    <input type="radio" name="my-accordion-1" />
                                    <div className="collapse-title text-xl font-medium">
                                        Visi
                                    </div>
                                    <div className="collapse-content">
                                        <p>visi</p>
                                    </div>
                                </div>
                                <div className="collapse collapse-arrow join-item border border-base-300">
                                    <input type="radio" name="my-accordion-1" />
                                    <div className="collapse-title text-xl font-medium">
                                        Misi
                                    </div>
                                    <div className="collapse-content">
                                        <p>misi</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card-actions">
                                <button className="btn btn-neutral" onClick={() => window[`D-${v.id}`].showModal()}>Hapus</button>
                                <dialog id={`D-${v.id.toString()}`} className="modal">
                                    <form method="dialog" className="modal-box">
                                        <h3 className="font-bold text-lg">Yakin?</h3>
                                        <p className="py-4">Kamu ingin hapus? {v.nama}</p>
                                        <div className="modal-action">
                                            <button className="btn" onClick={() => onSubmit(v.id)}>Hapus</button>
                                        </div>
                                    </form>
                                </dialog>
                            </div>
                            <Link className="btn btn-sm btn-outline btn-secondary" href={`/admin/candidate/${v.id}`}>Edit</Link>
                        </div>
                    </div>
                ))}
            </section>
    </>
  )
}
