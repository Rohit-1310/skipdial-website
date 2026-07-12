import React from 'react'

import type { Page } from '../payload-types'

import { mediaAlt, mediaUrl } from '../lib/cms'
import { AccordionSection } from './blocks/AccordionSection'
import { AudioSampleSection } from './blocks/AudioSampleSection'
import { CardGridSection } from './blocks/CardGridSection'
import { ChecklistSection } from './blocks/ChecklistSection'
import { ContentSplitSection } from './blocks/ContentSplitSection'
import { CtaBandSection } from './blocks/CtaBandSection'
import { DemoCallFormSection } from './blocks/DemoCallFormSection'
import { FeaturesGridSection } from './blocks/FeaturesGridSection'
import { HeroSection } from './blocks/HeroSection'
import { LogoMarqueeSection } from './blocks/LogoMarqueeSection'
import { NumberedListSection } from './blocks/NumberedListSection'
import { PainPointsSection } from './blocks/PainPointsSection'
import { RichTextSection } from './blocks/RichTextSection'
import { SchedulerEmbedSection } from './blocks/SchedulerEmbedSection'
import { StepsSection } from './blocks/StepsSection'

type Layout = NonNullable<Page['layout']>
type AnyBlock = Layout[number]

/** Section labels for slug → breadcrumb derivation on nested pages. */
function breadcrumbFor(page: Page): { label: string; href?: string }[] | undefined {
  if (!page.slug?.includes('/')) return undefined
  const [parent] = page.slug.split('/')
  const parentLabel = parent.charAt(0).toUpperCase() + parent.slice(1)
  return [{ label: parentLabel, href: `/${parent}` }, { label: page.title }]
}

/** Soft-tinted sections — the only background variation allowed by the design system. */
const softSections = new Set(['audioSample', 'demoCallForm'])

function BlockSwitch({ block, page }: { block: AnyBlock; page: Page }) {
  switch (block.blockType) {
    case 'hero':
      return <HeroSection block={block} breadcrumb={breadcrumbFor(page)} />
    case 'painPoints':
      return <PainPointsSection block={block} />
    case 'steps':
      return <StepsSection block={block} />
    case 'audioSample':
      return (
        <AudioSampleSection
          block={block}
          audioUrl={mediaUrl(block.audio)}
          audioAlt={mediaAlt(block.audio)}
        />
      )
    case 'checklist':
      return <ChecklistSection block={block} />
    case 'featuresGrid':
      return <FeaturesGridSection block={block} />
    case 'cardGrid':
      return <CardGridSection block={block} />
    case 'contentSplit':
      return <ContentSplitSection block={block} />
    case 'ctaBand':
      return <CtaBandSection block={block} />
    case 'accordion':
      return <AccordionSection block={block} />
    case 'logoMarquee':
      return <LogoMarqueeSection block={block} />
    case 'demoCallForm':
      return <DemoCallFormSection block={block} />
    case 'schedulerEmbed':
      return <SchedulerEmbedSection block={block} />
    case 'numberedList':
      return <NumberedListSection block={block} />
    case 'richText':
      return <RichTextSection block={block} />
    default:
      return null
  }
}

export function RenderBlocks({ page }: { page: Page }) {
  const layout = page.layout ?? []

  return (
    <>
      {layout.map((block, i) => {
        if (block.blockType === 'hero') {
          return (
            <section key={block.id ?? i}>
              <BlockSwitch block={block} page={page} />
            </section>
          )
        }

        const isGradientBand = block.blockType === 'ctaBand' && block.style === 'gradient'
        const soft = softSections.has(block.blockType)
        // Sections are separated by 1px hairlines rather than background changes.
        const classes = isGradientBand
          ? 'py-16 md:py-[120px]'
          : `hairline-t py-16 md:py-[120px] ${soft ? 'bg-bg-soft/70' : ''}`

        // First block isn't a hero (e.g. privacy policy) — clear the fixed header.
        const headerOffset = i === 0 ? ' pt-32 md:pt-44' : ''

        return (
          <section key={block.id ?? i} className={classes + headerOffset}>
            <BlockSwitch block={block} page={page} />
          </section>
        )
      })}
    </>
  )
}
