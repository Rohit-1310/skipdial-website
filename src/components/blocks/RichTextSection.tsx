import { RichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

import type { RichTextBlockType } from '../../payload-types'

export function RichTextSection({ block }: { block: RichTextBlockType }) {
  return (
    <div className="container-site">
      <div className="prose-skip mx-auto max-w-[680px]">
        <RichText data={block.content} />
      </div>
    </div>
  )
}
