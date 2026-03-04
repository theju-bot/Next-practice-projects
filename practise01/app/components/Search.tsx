'use client'

import { useState, SubmitEvent, useTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function Search() {
  const [search, setSearch] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmedSearch = search.trim()
    if (!trimmedSearch) return

    startTransition(() => {
      router.push(`/wikiSearch/${encodeURIComponent(trimmedSearch)}`)
    })
  }

  return (
    <form className='flex items-center justify-center' onSubmit={handleSubmit}>
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search...'
        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <button className='p-2 text-xl rounded-xl bg-slate-300 ml-2 font-bold disabled:opacity-60'>
        {isPending ? '🔄' : '🔍'}
      </button>
    </form>
  )
}
