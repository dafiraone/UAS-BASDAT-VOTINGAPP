"use client"

import Link from "next/link"
import { useState } from "react"
import { Metadata } from "next"
import { useSession } from "next-auth/react"

export const metadata: Metadata = {
    title: 'Admin Page',
}

export default function Admin() {
    const {data: session} = useSession()
    const [name, setName] = useState<string>('')
    const [visi, setVisi] = useState<string>('')
    const [misi, setMisi] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    const onSubmit = async () => {
        try {
            const res = await fetch('/api/addVote', {
                method: 'POST',
                body: JSON.stringify({
                    name, visi, misi
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            if (res.ok) {
            } else {
                const err = await res.json()
                setErrorMessage(err.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <main>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <form onSubmit={onSubmit} className="md:border-2 rounded-lg border-slate-800 p-8">
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-2xl">Nama</span>
                            </label>
                            <label className="input-group">
                                <input
                                    required
                                    type="text"
                                    className="input input-bordered"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </label>
                        </div>
                        <br />
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-2xl">Visi</span>
                            </label>
                            <label className="input-group">
                                <input
                                    required
                                    type="text"
                                    className="input input-bordered"
                                    value={visi}
                                    onChange={e => setVisi(e.target.value)}
                                />
                            </label>
                        </div>
                        <br />
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-2xl">Misi</span>
                            </label>
                            <label className="input-group">
                                <input
                                    required
                                    type="text"
                                    className="input input-bordered"
                                    value={misi}
                                    onChange={e => setMisi(e.target.value)}
                                />
                            </label>
                        </div>
                        <button type="submit" className="btn m-auto mt-9">Tambah Vote</button>
                    </form>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li><a>Dashboard Home</a></li>
                        <li>
                            <Link href={'/admin/result'}>Vote Result</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    )
}