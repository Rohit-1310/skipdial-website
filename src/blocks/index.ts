import type { Block, Field } from 'payload'

/**
 * Section blocks for the page builder.
 * Body copy fields are textareas: blank lines start a new paragraph,
 * **double asterisks** render bold on the frontend.
 */

const linkFields = (name: string, label: string): Field => ({
  name,
  label,
  type: 'group',
  fields: [
    { name: 'label', type: 'text' },
    { name: 'href', type: 'text', admin: { description: 'e.g. /request-a-free-demo or #sample' } },
  ],
})

const bodyField: Field = {
  name: 'body',
  type: 'textarea',
  admin: { description: 'Blank line = new paragraph. **text** = bold.' },
}

/** Grouped bullet lists, e.g. “AI call automation helps by:” followed by items. */
const listGroupsField: Field = {
  name: 'groups',
  type: 'array',
  labels: { singular: 'List group', plural: 'List groups' },
  fields: [
    { name: 'label', type: 'text', admin: { description: 'Optional intro line above the list' } },
    {
      name: 'items',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
  ],
}

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'inner',
      options: [
        { label: 'Home (Voice Orb + chips)', value: 'home' },
        { label: 'Inner page', value: 'inner' },
      ],
    },
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'textarea', required: true },
    bodyField,
    linkFields('primaryCta', 'Primary CTA'),
    linkFields('secondaryCta', 'Secondary CTA'),
    {
      name: 'chips',
      type: 'array',
      admin: {
        description: 'Floating chips orbiting the Voice Orb (home variant only)',
        condition: (_, siblingData) => siblingData?.variant === 'home',
      },
      fields: [{ name: 'label', type: 'text', required: true }],
    },
  ],
}

export const PainPoints: Block = {
  slug: 'painPoints',
  interfaceName: 'PainPointsBlock',
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'intro', type: 'textarea' },
    {
      name: 'cards',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
  ],
}

export const Steps: Block = {
  slug: 'steps',
  interfaceName: 'StepsBlock',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'intro', type: 'textarea' },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'cards',
      options: [
        { label: 'Compact cards (home)', value: 'cards' },
        { label: 'Full-width alternating rows', value: 'rows' },
      ],
    },
    {
      name: 'steps',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        bodyField,
        listGroupsField,
        { name: 'closing', type: 'textarea' },
        linkFields('link', 'Link'),
      ],
    },
    linkFields('cta', 'CTA'),
  ],
}

export const AudioSample: Block = {
  slug: 'audioSample',
  interfaceName: 'AudioSampleBlock',
  fields: [
    { name: 'heading', type: 'text', required: true },
    bodyField,
    { name: 'label', type: 'text', admin: { description: 'e.g. “Listen to a Sample:”' } },
    {
      name: 'audio',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'TODO: replace with an industry-specific recording where available' },
    },
    { name: 'caption', type: 'text' },
    linkFields('cta', 'CTA'),
  ],
}

export const Checklist: Block = {
  slug: 'checklist',
  interfaceName: 'ChecklistBlock',
  fields: [
    { name: 'heading', type: 'text' },
    bodyField,
    {
      name: 'items',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    linkFields('cta', 'CTA'),
  ],
}

export const FeaturesGrid: Block = {
  slug: 'featuresGrid',
  interfaceName: 'FeaturesGridBlock',
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'intro', type: 'textarea' },
    {
      name: 'tiles',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'text' },
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'phone',
          options: [
            'phone',
            'clock',
            'chat',
            'chart',
            'globe',
            'plug',
            'scale',
            'calendar',
            'route',
            'shield',
            'bolt',
            'note',
          ].map((v) => ({ label: v, value: v })),
        },
      ],
    },
  ],
}

export const CardGrid: Block = {
  slug: 'cardGrid',
  interfaceName: 'CardGridBlock',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'intro', type: 'textarea' },
    {
      name: 'numbered',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show sequential mono numbers on cards' },
    },
    {
      name: 'small',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Compact 4-up sub-cards' },
    },
    {
      name: 'cards',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
    { name: 'closing', type: 'textarea' },
    linkFields('cta', 'CTA'),
    linkFields('link', 'Text link'),
  ],
}

export const ContentSplit: Block = {
  slug: 'contentSplit',
  interfaceName: 'ContentSplitBlock',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    bodyField,
    listGroupsField,
    { name: 'closing', type: 'textarea' },
    linkFields('cta', 'CTA'),
    linkFields('link', 'Text link'),
  ],
}

export const CtaBand: Block = {
  slug: 'ctaBand',
  interfaceName: 'CtaBandBlock',
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'plain',
      options: [
        { label: 'Plain (white, hairline)', value: 'plain' },
        { label: 'Gradient band with Voice Orb (one per page, at the end)', value: 'gradient' },
      ],
    },
    { name: 'heading', type: 'text', required: true },
    bodyField,
    linkFields('cta', 'CTA'),
  ],
}

export const Accordion: Block = {
  slug: 'accordion',
  interfaceName: 'AccordionBlock',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'intro', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
    {
      name: 'faqSchema',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Emit FAQPage JSON-LD for these items' },
    },
  ],
}

export const LogoMarquee: Block = {
  slug: 'logoMarquee',
  interfaceName: 'LogoMarqueeBlock',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'caption', type: 'text' },
    {
      name: 'groups',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        {
          name: 'names',
          type: 'array',
          admin: { description: 'TODO: replace text wordmarks with real logo assets' },
          fields: [{ name: 'name', type: 'text', required: true }],
        },
      ],
    },
  ],
}

export const DemoCallForm: Block = {
  slug: 'demoCallForm',
  interfaceName: 'DemoCallFormBlock',
  fields: [
    { name: 'heading', type: 'text', required: true },
    bodyField,
    { name: 'formHeading', type: 'text' },
    { name: 'nameLabel', type: 'text', defaultValue: 'Name' },
    { name: 'phoneLabel', type: 'text', defaultValue: 'Phone' },
    { name: 'agentLabel', type: 'text', defaultValue: 'Choose Your AI Agent:' },
    {
      name: 'agents',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    { name: 'consentText', type: 'textarea' },
    { name: 'checkboxLabel', type: 'text' },
    { name: 'submitLabel', type: 'text', defaultValue: 'Call Me' },
    { name: 'successMessage', type: 'textarea' },
    { name: 'errorMessage', type: 'textarea' },
  ],
}

export const SchedulerEmbed: Block = {
  slug: 'schedulerEmbed',
  interfaceName: 'SchedulerEmbedBlock',
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'embedUrl',
      type: 'text',
      admin: { description: 'TODO: paste the scheduling embed URL (Calendly / GHL). Empty = reserved placeholder.' },
    },
    { name: 'note', type: 'text' },
  ],
}

export const NumberedList: Block = {
  slug: 'numberedList',
  interfaceName: 'NumberedListBlock',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'intro', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
  ],
}

export const RichTextBlock: Block = {
  slug: 'richText',
  interfaceName: 'RichTextBlockType',
  fields: [{ name: 'content', type: 'richText', required: true }],
}

export const allBlocks: Block[] = [
  Hero,
  PainPoints,
  Steps,
  AudioSample,
  Checklist,
  FeaturesGrid,
  CardGrid,
  ContentSplit,
  CtaBand,
  Accordion,
  LogoMarquee,
  DemoCallForm,
  SchedulerEmbed,
  NumberedList,
  RichTextBlock,
]
