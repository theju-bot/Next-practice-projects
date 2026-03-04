import Search from './Search'

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between p-6 bg-gray-800 text-white'>
      <ul className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 list-none'>
        <li className='hover:text-gray-300 hover:cursor-pointer'>Home</li>
        <li className='hover:text-gray-300 hover:cursor-pointer'>About</li>
        <li className='hover:text-gray-300 hover:cursor-pointer'>Contact</li>
      </ul>
      <Search />
    </nav>
  )
}
