"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"
import { LogoutButton } from "@/lib/auth"

type Navbar = {
    title: string
    user?: string
    children: React.ReactNode
}

export default function Navbar({ title, user, children }: Navbar) {
    return <header className='sticky top-0 w-full z-50'>
        <nav className="navbar bg-white md:px-6">
            <p className="hidden md:inline md:text-4xl font-semibold md:navbar-start">{title}</p>
            <div className="navbar-end flex-1 gap-4">
                {user && <p className="mx-6">{user}</p>}
                {!user && <Link href={'/login'}>Login</Link>}
                {children}
                {user && <LogoutButton />}
            </div>
        </nav>
    </header>
}