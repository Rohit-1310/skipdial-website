import type { Metadata } from 'next'

import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React from 'react'

import { LivePreviewListener } from '../../../../components/LivePreviewListener'
import {
  getPostBySlug,
  getPosts,
  getRelatedPosts,
  mediaAlt,
  mediaUrl,
} from '../../../../lib/cms'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

function formatDate(date?: string | null) {
  if (!date) return null
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPostPage({ params }: Args) {
  const { slug } = await params
  const { isEnabled: draft } = await draftMode()
  const post = await getPostBySlug(slug, draft)
  if (!post) notFound()

  const related = await getRelatedPosts(post)
  const cover = mediaUrl(post.cover)

  return (
    <article className="pb-16 md:pb-[120px]">
      {draft && <LivePreviewListener />}

      <header className="container-site pt-32 md:pt-44">
        <div className="mx-auto max-w-[680px]">
          {(post.tags ?? []).length > 0 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {(post.tags ?? []).map((t, i) => (
                <span
                  key={t.id ?? i}
                  className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.6875rem] uppercase tracking-wider text-ink-2"
                >
                  {t.tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="h-section text-balance">{post.title}</h1>
          <p className="mt-5 font-mono text-xs text-ink-2">
            {post.author && <>{post.author} · </>}
            {formatDate(post.publishedAt)}
          </p>
        </div>

        {cover && (
          <div className="relative mx-auto mt-10 aspect-[21/9] max-w-4xl overflow-hidden rounded-card border border-line">
            <Image
              src={cover}
              alt={mediaAlt(post.cover)}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}
      </header>

      <div className="container-site mt-12">
        <div className="prose-skip mx-auto max-w-[680px]">
          <RichText data={post.content} />
        </div>
      </div>

      {related.length > 0 && (
        <aside className="container-site mt-20" aria-label="Related posts">
          <div className="mx-auto max-w-[680px] border-t border-line pt-10">
            <p className="mono-label text-ink-2">Related</p>
            <ul className="mt-5 space-y-4">
              {related.map((r) => (
                <li key={r.id}>
                  <Link href={`/blog/${r.slug}`} className="group block">
                    <span className="h-card transition-colors group-hover:text-accent">
                      {r.title}
                    </span>
                    <span className="mt-1 block font-mono text-xs text-ink-2">
                      {formatDate(r.publishedAt)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  const ogImage = mediaUrl(post.meta?.image) || mediaUrl(post.cover)
  return {
    title: post.meta?.title || `${post.title} | SkipDial`,
    description: post.meta?.description || post.excerpt || undefined,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: 'article',
      title: post.meta?.title || post.title,
      description: post.meta?.description || post.excerpt || undefined,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  }
}
