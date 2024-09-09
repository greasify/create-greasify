import { defineConfig } from 'vite'
import Preact from '@preact/preset-vite'
import Userscript from 'vite-userscript-plugin'

import { license, name, version } from './package.json'

export default defineConfig({
  plugins: [
    Preact(),
    Userscript({
      fileName: 'preact-ts',
      entry: 'src/index.tsx',
      header: {
        name,
        version,
        license,
        match: 'http://localhost:3000'
      },
      server: {
        port: 3000
      }
    })
  ]
})
