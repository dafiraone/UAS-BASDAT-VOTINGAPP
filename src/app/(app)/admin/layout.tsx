import { Inter } from 'next/font/google'
import Providers from '@/lib/providers'
import Link from 'next/link'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Voting Admin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <main>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    {children}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden mt-5">Open drawer</label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li>
                        <Link href={'/admin'}>Dashboard</Link>
                        </li>
                        <li>
                        <Link href={'/admin/candidate'}>Candidate List</Link>
                        </li>
                        <li>
                            <Link href={'/admin/result'}>Vote Result</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
        </Providers>
      </body>
    </html>
  )
}
