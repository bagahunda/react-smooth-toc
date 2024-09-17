import { RefObject } from 'react'
import { create } from 'zustand'
import {
  mdastExtractHeadings,
  TOCHeading
} from '@/utils/mdast-extract-headings'
import type { Root } from 'mdast'

export type Section = TOCHeading & {
  headingRef: RefObject<HTMLHeadingElement> | null
}

export type TOCState = {
  sections: Section[]
  update: (mdast: Root) => void
  registerHeading: (id: string, ref: RefObject<HTMLHeadingElement>) => void
}

export const useTOCStore = create<TOCState>((set, get) => ({
  sections: [],
  update: (mdast: Root) => {
    if (mdast) {
      const prevSections = get().sections
      const sections = mdastExtractHeadings(mdast).map(h => {
        const prev = prevSections.find(s => s.id === h.id)
        return {
          ...h,
          headingRef: prev ? prev.headingRef : null
        }
      })
      set({ sections })
    } else {
      set({ sections: [] })
    }
  },
  registerHeading: (id: string, ref: RefObject<HTMLHeadingElement>) => {
    set(state => ({
      sections: state.sections.map(s =>
        s.id === id ? { ...s, headingRef: ref } : s
      )
    }))
  }
}))
