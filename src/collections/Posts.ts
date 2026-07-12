import type { CollectionConfig } from 'payload'

import { adminOnly, adminOrEditor, authenticatedOrPublished } from '../access'
import { generatePreviewPath } from '../utilities/generatePreviewPath'
import { revalidatePost, revalidatePostDelete } from '../utilities/revalidate'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'publishedAt'],
    group: 'Content',
    livePreview: {
      url: ({ data }) => generatePreviewPath({ collection: 'posts', slug: data?.slug as string }),
    },
    preview: (data) => generatePreviewPath({ collection: 'posts', slug: data?.slug as string }),
  },
  access: {
    read: authenticatedOrPublished,
    create: adminOrEditor,
    update: adminOrEditor,
    delete: adminOnly,
  },
  versions: {
    drafts: { autosave: { interval: 500 } },
    maxPerDoc: 25,
  },
  hooks: {
    afterChange: [revalidatePost],
    afterDelete: [revalidatePostDelete],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
    },
    { name: 'excerpt', type: 'textarea' },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText', required: true },
    { name: 'author', type: 'text', admin: { position: 'sidebar' } },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'tags',
      type: 'array',
      admin: { position: 'sidebar' },
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
  ],
}
