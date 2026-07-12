import type { GlobalConfig } from 'payload'

import { adminOnly, anyone } from '../access'
import { revalidateGlobal } from '../utilities/revalidate'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  admin: { group: 'Admin' },
  access: {
    read: anyone,
    update: adminOnly,
  },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: 'header',
      type: 'group',
      fields: [
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text' },
            {
              name: 'children',
              type: 'array',
              admin: { description: 'Turns this item into a dropdown' },
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
          ],
        },
        { name: 'ctaLabel', type: 'text', defaultValue: 'Free Demo' },
        { name: 'ctaHref', type: 'text', defaultValue: '/request-a-free-demo' },
        { name: 'secondaryLabel', type: 'text' },
        { name: 'secondaryHref', type: 'text' },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      fields: [
        { name: 'linksLabel', type: 'text', defaultValue: 'Links' },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
        { name: 'contactLabel', type: 'text', defaultValue: 'Contact Us' },
      ],
    },
  ],
}
