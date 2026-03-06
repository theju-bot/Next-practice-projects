export default function Footer() {
  return (
    <footer className='border-t sticky bottom-0 border-gray-300 py-6 mt-12 bg-slate-800'>
      <div className='container mx-auto px-4'>
        <p className='text-center text-gray-300'>
         &copy; {new Date().getFullYear()} My Next.js Practise Projects (Theju).
        </p>
      </div>
    </footer>
  )
}
