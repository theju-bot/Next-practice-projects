'use client'

import { useState, SubmitEvent, useTransition, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function Search() {
  const router = useRouter()
  const pathname = usePathname()

  const currentSearch = pathname.startsWith('/wikiSearch/')
    ? decodeURIComponent(pathname.split('/wikiSearch/')[1] || '')
    : ''

  const [search, setSearch] = useState('')
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setSearch(currentSearch)
  }, [currentSearch])

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmedSearch = search.trim()
    if (!trimmedSearch) {
      startTransition(() => {
        router.push('/')
      })
      return
    }

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
        placeholder=' Wiki Search...'
        className='p-2 border text-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <button className='p-2 text-xl rounded-xl bg-slate-300 ml-2 font-bold cursor-pointer disabled:opacity-60 hover:border-blue-500' disabled={isPending}>
        {isPending ? '🔄' : '🔍'}
      </button>
    </form>
  )
}
