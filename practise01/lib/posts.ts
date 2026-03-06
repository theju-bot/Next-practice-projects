import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import { JSX } from 'react'

const postsDirectory = path.join(process.cwd(), 'blogposts')

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const id = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      const blogPost: BlogPost = {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
      }

      return blogPost
    })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const { content, frontmatter } = await compileMDX<{
    title: string
    date: string
  }>({
    source: fileContents,
    options: {
      parseFrontmatter: true,
    },
  })

  const blogPostWithContent: BlogPost & { content: JSX.Element } = {
    id,
    title: frontmatter.title,
    date: frontmatter.date,
    content,
  }

  return blogPostWithContent
}
