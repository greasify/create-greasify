import { defineConfig } from 'vite'
import Userscript from 'vite-userscript-plugin'

import { license, name, version } from './package.json'

export default defineConfig({
  plugins: [
    Userscript({
      fileName: 'vanilla-ts',
      entry: 'src/index.ts',
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
