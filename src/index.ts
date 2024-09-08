// inspired by https://github.com/lisonge/vite-plugin-monkey/tree/main/packages/create-monkey

import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import { reset } from 'kolorist'
import minimist from 'minimist'
import prompts from 'prompts'

import {
  copyFile,
  emptyDir,
  formatTargetDir,
  isEmptyPath,
  isValidPackageName,
  pkgFromUserAgent,
  throwCancel,
  toValidPackageName
} from './helpers.js'
import { FRAMEWORKS, TEMPLATES } from './templates.js'
import type { Framework } from './types.js'

const argv = minimist<{
  t?: string
  template?: string
}>(process.argv.slice(2), { string: ['_'] })
const cwd = process.cwd()

const defaultTargetDir = 'vite-greasify-template'

async function init() {
  const argTargetDir = formatTargetDir(argv._[0])
  const argTemplate = argv.template || argv.t

  let targetDir = argTargetDir || defaultTargetDir
  const getProjectName = () =>
    targetDir === '.' ? path.basename(path.resolve()) : targetDir

  let result: prompts.Answers<
    'projectName' | 'overwrite' | 'packageName' | 'framework' | 'variant'
  >

  try {
    result = await prompts(
      [
        {
          type: argTargetDir ? null : 'text',
          name: 'projectName',
          message: reset('Project name:'),
          initial: defaultTargetDir,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || defaultTargetDir
          }
        },
        {
          type: () =>
            !fs.existsSync(targetDir) || isEmptyPath(targetDir)
              ? null
              : 'confirm',
          name: 'overwrite',
          message: () =>
            (targetDir === '.'
              ? 'Current directory'
              : `Target directory "${targetDir}"`) +
            ` is not empty. Remove existing files and continue?`
        },
        {
          type: (_, { overwrite }: { overwrite?: boolean }) => {
            if (overwrite === false) throwCancel()
            return null
          },
          name: 'overwriteChecker'
        },
        {
          type: () => (isValidPackageName(getProjectName()) ? null : 'text'),
          name: 'packageName',
          message: reset('Package name:'),
          initial: () => toValidPackageName(getProjectName()),
          validate: (dir) =>
            isValidPackageName(dir) || 'Invalid package.json name'
        },
        {
          type:
            argTemplate && TEMPLATES.includes(argTemplate) ? null : 'select',
          name: 'framework',
          message:
            typeof argTemplate === 'string' && !TEMPLATES.includes(argTemplate)
              ? reset(
                  `"${argTemplate}" isn't a valid template. Please choose from below: `
                )
              : reset('Select a framework:'),
          initial: 0,
          choices: FRAMEWORKS.map((framework) => {
            const frameworkColor = framework.color
            return {
              title: frameworkColor(framework.display || framework.name),
              value: framework
            }
          })
        },
        {
          type: (framework: Framework) =>
            framework && framework.variants ? 'select' : null,
          name: 'variant',
          message: reset('Select a variant:'),
          choices: (framework: Framework) =>
            framework.variants.map((variant) => {
              const variantColor = variant.color
              return {
                title: variantColor(variant.display || variant.name),
                value: variant.name
              }
            })
        }
      ],
      { onCancel: throwCancel }
    )
  } catch (cancelled: any) {
    console.log(cancelled.message)
    return
  }

  // user choice associated with prompts
  const { framework, overwrite, packageName, variant } = result

  const root = path.join(cwd, targetDir)

  if (overwrite) {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  }

  // determine template
  const template: string = variant || framework?.name || argTemplate
  const pkgInfo = pkgFromUserAgent(process.env['npm_config_user_agent'])
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm'

  console.log(`\nScaffolding project in ${root}`)

  const templateDir = path.resolve(
    url.fileURLToPath(import.meta.url),
    '..',
    '..',
    'templates',
    template
  )

  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, file)
    if (content) {
      fs.writeFileSync(targetPath, content)
    } else {
      copyFile(path.join(templateDir, file), targetPath)
    }
  }

  const files = fs.readdirSync(templateDir)
  for (const file of files.filter((file) => file !== 'package.json')) {
    write(file)
  }

  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8')
  )

  pkg.name = packageName || getProjectName()

  write('package.json', JSON.stringify(pkg, null, 2))

  console.log(`\nDone. Now run:\n`)
  if (root !== cwd) {
    console.log(`  cd ${path.relative(cwd, root)}`)
  }
  switch (pkgManager) {
    case 'yarn':
      console.log('  yarn')
      console.log('  yarn dev')
      break
    default:
      console.log(`  ${pkgManager} install`)
      console.log(`  ${pkgManager} run dev`)
      break
  }
  console.log()
}

init().catch((err) => {
  console.error(err)
})
