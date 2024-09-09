import { defineConfig } from 'vite'
import Userscript from 'vite-userscript-plugin'

import { license, name, version } from './package.json'

export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'hf',
    jsxInject: `import { h, hf } from "@reatom/jsx";`
  },
  plugins: [
    Userscript({
      fileName: 'reatom',
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
