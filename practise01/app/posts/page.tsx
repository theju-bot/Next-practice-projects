import Posts from './components/Posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Posts',
  description: 'Posts page of the Next.js practise project',
}

export default function Home() {
  return (
    <main className='px-6 mx-auto'>
      <p className='mt-12 mb-12 text-3xl text-center'>
        Hello and Welcome 👋&nbsp;
        <span className='whitespace-nowrap'>
          I&apos;m <span className='font-bold'>Thesigan</span>.
        </span>
      </p>
      <Posts />
    </main>
  )
}
