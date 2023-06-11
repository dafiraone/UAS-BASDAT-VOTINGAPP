import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    function middleware(req) {
        if (req.nextUrl.pathname.startsWith('/admin') && req.nextauth.token?.role !== "Admin") {
            return NextResponse.rewrite(new URL("/auth/login?message=You are Not Authorized!", req.url))
        }
        if (req.nextUrl.pathname.startsWith('/user') && req.nextauth.token?.role !== "User") {
            return NextResponse.rewrite(new URL("/auth/login?message=You are Not Authorized!", req.url))
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        }
    }
)


export const config = {
    matcher: ['/admin/:path*', '/vote']
}