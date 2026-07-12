/* Shared builders for seed content. Blocks are typed loosely — the Payload
 * local API validates them against the block schemas at create time. */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SeedBlock = any

export const DEMO = { label: 'Get a Free Demo', href: '/request-a-free-demo' }

export const items = (texts: string[]) => texts.map((text) => ({ text }))

export const group = (label: string | null, texts: string[]) => ({
  label: label ?? undefined,
  items: items(texts),
})

/** The standard “Hear it Live!” block used across inner pages. */
export const hearItLive = (audioId: number): SeedBlock => ({
  blockType: 'audioSample',
  heading: 'Hear it Live!',
  body: 'Hear how SkipDial handles a real inbound call for your industry.',
  label: 'Listen to a Sample:',
  audio: audioId,
  // TODO: replace with industry-specific recordings when available
  caption: 'Sample: a real inbound real-estate call handled by SkipDial.',
  cta: DEMO,
})

export const gradientCta = (heading: string, body: string): SeedBlock => ({
  blockType: 'ctaBand',
  style: 'gradient',
  heading,
  body,
  cta: DEMO,
})

/* ---------- Lexical rich text builders (posts, privacy) ---------- */

const textNode = (text: string, format = 0) => ({
  type: 'text',
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  text,
  version: 1,
})

export const p = (text: string) => ({
  type: 'paragraph',
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  textFormat: 0,
  children: [textNode(text)],
})

export const h2 = (text: string) => ({
  type: 'heading',
  tag: 'h2',
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  children: [textNode(text)],
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const richText = (children: any[]) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children,
  },
})
