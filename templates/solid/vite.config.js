import { defineConfig } from 'vite'
import Solid from 'vite-plugin-solid'
import Userscript from 'vite-userscript-plugin'

import { license, name, version } from './package.json'

export default defineConfig({
  plugins: [
    Solid(),
    Userscript({
      fileName: 'solid',
      entry: 'src/index.jsx',
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
