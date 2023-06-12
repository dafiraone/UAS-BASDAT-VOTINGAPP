"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState, FormEvent } from "react"

type Params = {
  params: {
    id: string
    voteId: string
  }
}

export default function Edit({ params: voteId }: Params) {
  const [name, setName] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    fetch('/api/getOneCandidate', {
      method: "POST",
      body: JSON.stringify({
        voteId: voteId.id
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        setName(data.nama)
        setDesc(data.desc)
      })
  }, [])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/editVote', {
        method: 'POST',
        body: JSON.stringify({
          id: voteId.id, name, desc
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      if (res.ok) {
        router.refresh()
        router.push('/admin/candidate')
      } else {
        const err = await res.json()
        console.log(err)
        setErrorMessage(err.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmit} className="md:border-2 rounded-lg border-slate-800 p-8">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="form-control" >
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
      <button type="submit" className="btn m-auto mt-9">Edit Vote</button>
    </form >
  )
}
