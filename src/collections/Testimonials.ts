import type { CollectionConfig } from 'payload'

import { adminOnly, adminOrEditor, anyone } from '../access'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    description: 'Feeds the social-proof strip once real testimonials exist.',
  },
  access: {
    read: anyone,
    create: adminOrEditor,
    update: adminOrEditor,
    delete: adminOnly,
  },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text' },
    { name: 'company', type: 'text' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
  ],
}
