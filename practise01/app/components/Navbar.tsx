'use client'

import Search from './Search'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className='bg-slate-800 p-4 sticky top-0 drop-shadow-xl z-10'>
      <div className='prose prose-xl mx-auto flex justify-between items-center flex-col sm:flex-row gap-4'>
        <div className='flex flex-row items-center gap-4 text-xl font-semibold tracking-wide'>
          <Link
            href='/'
            className='text-slate-300 hover:text-white hover:bg-slate-700 px-4 py-2 rounded-lg transition-all duration-200 no-underline'
          >
            Home
          </Link>
          <Link
            href='/posts'
            className='text-slate-300 hover:text-white hover:bg-slate-700 px-4 py-2 rounded-lg transition-all duration-200 no-underline'
          >
            Posts
          </Link>
        </div>
        {!pathname.startsWith('/posts') && <Search />}
      </div>
    </nav>
  )
}
