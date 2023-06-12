"use client"

import Navbar from "@/components/Navbar"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"

export default function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    signIn('credentials', {
      username: email, password, callbackUrl: "/"
    })
  }

  return (
    <>
      <Navbar title="Login">
        <Link href={'/'}>Home</Link>
        <Link href={'/hasil'}>Perolehan</Link>
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
            <p className="text-3xl font-bold mb-20">Login</p>
            <form onSubmit={onSubmit} className="md:border-2 rounded-lg border-slate-800 p-8">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-2xl">Email</span>
                </label>
                <label className="input-group">
                  <input
                    autoFocus
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
                  />
                </label>
              </div>
              <button type="submit" className="btn m-auto mt-9">Log In</button>
            </form>
            <span className="mt-2">Belum punya akun? <Link className="link link-info" href={'/register'}>Daftar</Link></span>
          </div>
        </section>
      </main>
    </>
  )
}
