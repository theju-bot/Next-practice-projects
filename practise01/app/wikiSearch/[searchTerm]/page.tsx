import type { Metadata } from 'next'
import getWikiResults from '@/lib/getWikiResults'
import Item from './components/Item'

type Props = {
  params: Promise<{ searchTerm: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const paramsData = await params
  const searchTerm = decodeURIComponent(paramsData.searchTerm)
  const data = await getWikiResults(searchTerm)
  const displayTerm = searchTerm

  if (!data?.query?.pages) {
    return {
      title: `${displayTerm} Not Found`,
      description: `No results for ${displayTerm}`,
    }
  }

  return {
    title: displayTerm,
    description: `Search results for ${displayTerm}`,
  }
}

export default async function SearchResults({ params }: Props) {
  const paramsData = await params
  const searchTerm = decodeURIComponent(paramsData.searchTerm)
  const data = await getWikiResults(searchTerm)
  const results: Result[] | undefined = data?.query?.pages

  const content = (
    <main className='bg-slate-200 min-w-1/2 flex flex-col items-center mx-auto max-w-lg py-1 min-h-screen'>
      {results && Object.values(results).length > 0 ? (
        Object.values(results).map((result) => (
          <Item key={result.pageid} result={result} />
        ))
      ) : (
        <h2 className='p-2 text-xl text-justify mx-auto'>{`${searchTerm} Not Found`}</h2>
      )}
    </main>
  )
  return content
}
