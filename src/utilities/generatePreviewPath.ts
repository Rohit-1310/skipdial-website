const collectionPrefixes: Record<string, string> = {
  pages: '',
  posts: '/blog',
}

type Args = {
  collection: string
  slug: string
}

export const generatePreviewPath = ({ collection, slug }: Args): string => {
  const prefix = collectionPrefixes[collection] ?? ''
  const path =
    collection === 'pages' && (slug === 'home' || !slug) ? '/' : `${prefix}/${slug}`

  const params = new URLSearchParams({
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/next/preview?${params.toString()}`
}
