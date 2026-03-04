import Search from './Search'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between p-6 bg-gray-800 text-white lg:pl-[26%] lg:pr-[25%]'>
      <ul className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 list-none'>
        <li>
          <Link href='/' className='hover:text-gray-300 hover:cursor-pointer'>
            Home
          </Link>
        </li>
      </ul>
      <Search />
    </nav>
  )
}
