import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: {
      bin: 'src/index.ts'
    },
    banner: {
      js: '#!/usr/bin/env node'
    },
    target: 'node20',
    format: 'esm',
    clean: true
  }
])
