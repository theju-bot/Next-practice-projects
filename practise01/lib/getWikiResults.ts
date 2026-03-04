export default async function getWikiResults(
  searchTerm: string,
): Promise<SearchResult> {
  const searchParams = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrsearch: searchTerm,
    gsrlimit: '20',
    prop: 'pageimages|extracts',
    exchars: '100',
    exintro: 'true',
    explaintext: 'true',
    exlimit: 'max',
    format: 'json',
    origin: '*',
  })

  try {
    const response = await fetch(
      'https://en.wikipedia.org/w/api.php?' + searchParams,
      {
        // cache: 'no-store',
        next: { revalidate: 3600 },
        headers: {
          'User-Agent':
            'ThejuWikiApp/1.0 (https://github.com/theju-bot; thesigany@gmail.com)',
          Accept: 'application/json',
          'Accept-Encoding': 'gzip',
        },
      },
    )

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No response body')
      console.error('Wikipedia failed:', response.status, errorText)
      throw new Error(
        `Wikipedia error: ${response.status} - ${errorText.slice(0, 200)}`,
      )
    }
    const data = await response.json()
    return data
  } catch (error) {
      throw error instanceof Error
    ? error
    : new Error('Failed to fetch wikipedia results')
  }
}
