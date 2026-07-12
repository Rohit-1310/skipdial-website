import type { CollectionConfig } from 'payload'

import { adminOnly, adminOrEditor, authenticatedOrPublished } from '../access'
import { allBlocks } from '../blocks'
import { generatePreviewPath } from '../utilities/generatePreviewPath'
import { revalidatePage, revalidatePageDelete } from '../utilities/revalidate'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    group: 'Content',
    livePreview: {
      url: ({ data }) => generatePreviewPath({ collection: 'pages', slug: data?.slug as string }),
    },
    preview: (data) => generatePreviewPath({ collection: 'pages', slug: data?.slug as string }),
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
    afterChange: [revalidatePage],
    afterDelete: [revalidatePageDelete],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: '“home” for the homepage. Nested paths allowed, e.g. industries/home-services',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: allBlocks,
      admin: { description: 'Reorder, add, or remove sections — no code needed.' },
    },
  ],
}
