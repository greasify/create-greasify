import { blue, cyan, green, lightCyan, magenta, yellow } from 'kolorist'

import type { Framework } from './types.js'

export const FRAMEWORKS: Framework[] = [
  {
    name: 'Vanilla',
    display: 'Vanilla',
    color: yellow,
    variants: [
      {
        name: 'vanilla',
        display: 'JavaScript',
        color: yellow
      },
      {
        name: 'vanilla-ts',
        display: 'TypeScript',
        color: blue
      }
    ]
  },
  {
    name: 'solid',
    display: 'Solid',
    color: cyan,
    variants: [
      {
        name: 'solid',
        display: 'JavaScript',
        color: yellow
      },
      {
        name: 'solid-ts',
        display: 'TypeScript',
        color: blue
      }
    ]
  },
  {
    name: 'reatom',
    display: 'Reatom',
    color: magenta,
    variants: [
      {
        name: 'reatom',
        display: 'JavaScript',
        color: yellow
      },
      {
        name: 'reatom-ts',
        display: 'TypeScript',
        color: blue
      }
    ]
  },
  {
    name: 'vue',
    display: 'Vue',
    color: green,
    variants: [
      {
        name: 'vue',
        display: 'JavaScript',
        color: yellow
      },
      {
        name: 'vue-ts',
        display: 'TypeScript',
        color: blue
      }
    ]
  },
  {
    name: 'react',
    display: 'React',
    color: lightCyan,
    variants: [
      {
        name: 'react',
        display: 'JavaScript',
        color: yellow
      },
      {
        name: 'react-ts',
        display: 'TypeScript',
        color: blue
      }
    ]
  },
  {
    name: 'preact',
    display: 'Preact',
    color: blue,
    variants: [
      {
        name: 'preact',
        display: 'JavaScript',
        color: yellow
      },
      {
        name: 'preact-ts',
        display: 'TypeScript',
        color: blue
      }
    ]
  }
]

export const TEMPLATES = FRAMEWORKS.map(
  (framework) =>
    (framework.variants && framework.variants.map((v) => v.name)) || [
      framework.name
    ]
).reduce((acc, value) => acc.concat(value), [])
