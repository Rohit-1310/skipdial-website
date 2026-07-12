import type { CollectionConfig } from 'payload'

import { adminFieldOnly, adminOnly, authenticated } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
  },
  auth: true,
  access: {
    read: authenticated,
    create: adminOnly,
    update: ({ req: { user }, id }) => user?.role === 'admin' || user?.id === id,
    delete: adminOnly,
  },
  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      saveToJWT: true,
      options: [
        { label: 'Admin — full access', value: 'admin' },
        { label: 'Editor — content only', value: 'editor' },
      ],
      access: { update: adminFieldOnly },
    },
  ],
  versions: false,
}
