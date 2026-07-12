import type { CollectionConfig } from 'payload'

import { adminOnly, adminOrEditor, anyone } from '../access'

export const FormSubmissions: CollectionConfig = {
  slug: 'formSubmissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'formType', 'agent', 'createdAt'],
    group: 'Admin',
    description: 'Every demo-call and contact submission lands here.',
  },
  access: {
    create: anyone,
    read: adminOrEditor,
    update: adminOnly,
    delete: adminOnly,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        // TODO: n8n webhook URL — set DEMO_WEBHOOK_URL in .env to forward submissions
        const webhookUrl = process.env.DEMO_WEBHOOK_URL
        if (operation === 'create' && webhookUrl) {
          try {
            await fetch(webhookUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(doc),
            })
          } catch (err) {
            console.error('Form submission webhook failed:', err)
          }
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'formType',
      type: 'select',
      required: true,
      defaultValue: 'demo-call',
      options: [
        { label: 'Live demo call', value: 'demo-call' },
        { label: 'Contact', value: 'contact' },
      ],
    },
    { name: 'name', type: 'text', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'email', type: 'email' },
    { name: 'agent', type: 'text', admin: { description: 'Chosen AI agent / industry' } },
    { name: 'message', type: 'textarea' },
    { name: 'consent', type: 'checkbox', defaultValue: false },
    { name: 'sourcePath', type: 'text', admin: { description: 'Page the form was submitted from' } },
  ],
}
