"use client"

import { useState } from "react"

export default function Admin() {
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
    )
}