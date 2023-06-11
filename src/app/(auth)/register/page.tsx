"use client"

import Navbar from "@/components/Navbar"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { signIn } from "next-auth/react"

export default function Register() {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorStatus, setErrorStatus] = useState<boolean>(false)

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify({
                    name, email, password
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            if (res.ok) {
                signIn()
            } else {
                const err = await res.json()
                if (err.code = 'P2010' && err.meta.code == '1062') {
                    setErrorStatus(true)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    return <>
        <Navbar title="Register">
            <Link href={'/'}>Home</Link>
            <Link href={'/about'}>About</Link>
        </Navbar>
        <main className="md:flex md:justify-center items-center">
            <section className="bg-[#F9F9F9] md:w-1/2 min-h-screen p-20">
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
            <section className="md:w-1/2 min-h-screen p-20">
                <div className="flex flex-col items-center">
                    <p className="text-3xl font-bold mb-20">Daftar</p>
                    <form onSubmit={onSubmit} className="md:border-2 rounded-lg border-slate-800 p-8">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-2xl">Nama</span>
                            </label>
                            <label className="input-group">
                                <input
                                    autoFocus
                                    required
                                    type="text"
                                    placeholder="dafiraone"
                                    className="input input-bordered"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </label>
                        </div>
                        <br />
                        {errorStatus && <p className="text-red-500">Email sudah dipakai</p>}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-2xl">Email</span>
                            </label>
                            <label className="input-group">
                                <input
                                    autoComplete="on"
                                    required
                                    type="email"
                                    className="input input-bordered"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </label>
                        </div>
                        <br />
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-2xl">Password</span>
                            </label>
                            <label className="input-group">
                                <input
                                    required
                                    type="password"
                                    className="input input-bordered"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    minLength={8}
                                />
                            </label>
                        </div>
                        <button type="submit" className="btn m-auto mt-9">Daftar</button>
                    </form>
                    <span className="mt-2">Sudah punya akun? <Link className="link link-info" href={'/login'}>Login</Link></span>
                </div>
            </section>
        </main>
    </>
}