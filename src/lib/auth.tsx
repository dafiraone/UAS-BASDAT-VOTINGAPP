"use client"

import { signIn, signOut } from "next-auth/react"

export const LoginButton = () => <button onClick={() => signIn()}>Sign In</button>
export const LogoutButton = () => <button className="btn btn-sm btn-outline btn-error" onClick={() => signOut()}>Logout</button>