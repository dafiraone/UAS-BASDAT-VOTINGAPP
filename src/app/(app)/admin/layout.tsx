import { Inter } from 'next/font/google'
import Providers from '@/lib/providers'
import Link from 'next/link'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { LogoutButton } from '@/lib/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Voting Admin',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main>
            <div className="drawer lg:drawer-open">
              <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button self-end lg:hidden mt-5">Open drawer</label>
                {children}
              </div>
              <div className="drawer-side">
                <div className='flex gap-5 items-center px-4'>
                  <LogoutButton />
                  <p>{session?.user?.name}</p>
                </div>
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                  {/* Sidebar content here */}
                  <li>
                    <Link href={'/admin'}>Add Candidate</Link>
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
