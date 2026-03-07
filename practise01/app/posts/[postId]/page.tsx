import getFormattedDate from '@/lib/getFormattedDate'
import { getPostData, getSortedPostsData } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export function generateStaticParams() {
  const posts = getSortedPostsData()

  return posts.map((post) => ({
    postId: post.id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>
}) {
  const { postId } = await params
  const { title } = await getPostData(postId)

  if (!title) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title,
  }
}

export default async function Post({
  params,
}: {
  params: Promise<{ postId: string }>
}) {
  const posts = getSortedPostsData()
  const { postId } = await params
  if (!posts.find((post) => post.id === postId)) notFound()

  const { title, date, content } = await getPostData(postId)
  const pubDate = getFormattedDate(date)

  return (
    <main className='px-6 prose prose-xl prose-slate mx-auto'>
      <h1 className='text-3xl mt-4 mb-0'>{title}</h1>
      <p className='mt-0'>{pubDate}</p>
      <article>
        <section>{content}</section>
        <p>
          <Link href='/posts'>← Back to home</Link>
        </p>
      </article>
    </main>
  )
}
