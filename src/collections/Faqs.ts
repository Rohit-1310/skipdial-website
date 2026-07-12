import type { CollectionConfig } from 'payload'

import { adminOnly, adminOrEditor, anyone } from '../access'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    group: 'Content',
    description: 'Reusable Q&A — pull into pages via the Accordion block.',
  },
  access: {
    read: anyone,
    create: adminOrEditor,
    update: adminOrEditor,
    delete: adminOnly,
  },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
    { name: 'category', type: 'text' },
  ],
}
