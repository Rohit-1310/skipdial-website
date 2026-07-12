import type { GlobalConfig } from 'payload'

import { adminOnly, anyone } from '../access'
import { revalidateGlobal } from '../utilities/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  label: 'Site Settings',
  admin: { group: 'Admin' },
  access: {
    read: anyone,
    update: adminOnly,
  },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          fields: [
            { name: 'brandName', type: 'text', required: true, defaultValue: 'SkipDial' },
            {
              name: 'tagline',
              type: 'textarea',
              admin: { description: 'One-line description shown in the footer' },
            },
            { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo (color)' },
            { name: 'logoWhite', type: 'upload', relationTo: 'media', label: 'Logo (white)' },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'phone', type: 'text' },
            { name: 'email', type: 'text' },
            { name: 'address', type: 'textarea' },
            {
              name: 'socials',
              type: 'array',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'X / Twitter', value: 'x' },
                  ],
                },
                { name: 'url', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'defaultSeo',
              type: 'group',
              fields: [
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
                { name: 'ogImage', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
        {
          label: 'Misc',
          fields: [
            {
              name: 'legalStrip',
              type: 'text',
              admin: { description: 'Footer legal line, e.g. “© 2026 All Rights Reserved | SkipDial.ai”' },
            },
            { name: 'poweredBy', type: 'text' },
            {
              name: 'notFound',
              type: 'group',
              label: '404 page',
              fields: [
                { name: 'title', type: 'text', defaultValue: 'This line went dead.' },
                { name: 'body', type: 'textarea' },
                { name: 'ctaLabel', type: 'text', defaultValue: 'Back to the homepage' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
