"use client"

import Image from "next/image"
import { useState } from "react"

export default function Admin() {
    const [name, setName] = useState<string>('')
    const [image, setImage] = useState<string | ArrayBuffer | null>("")
    const [desc, setDesc] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    const uploadImage = (e: any) => {
        if (e.target.files[0].size < 3145728) {
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                setImage(reader.result)
            }
            reader.onerror = (error) => {
                console.log("Error: ", error)
            }
        } else {
            setErrorMessage("Ukuran gambar maximal 5 MB")
            setInterval(() => { window.location.reload() }, 2000)
        }
    }

    const onSubmit = async () => {
        try {
            const res = await fetch('/api/addVote', {
                method: 'POST',
                body: JSON.stringify({
                    name, description: desc, image
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
                    <span className="label-text text-2xl">Gambar</span>
                </label>
                <label className="input-group">
                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        onChange={uploadImage}
                    />
                </label>
                {image && <Image
                    src={image as string}
                    className="mt-2"
                    alt=""
                    width={300}
                    height={300}
                />}
            </div>
            <br />
            <div className="form-control">
                <label className="label">
                    <span className="label-text text-2xl">Deskripsi</span>
                </label>
                <label className="input-group">
                    <input
                        required
                        type="text"
                        className="input input-bordered"
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                    />
                </label>
            </div>
            <button type="submit" className="btn m-auto mt-9">Tambah Vote</button>
        </form>
    )
}