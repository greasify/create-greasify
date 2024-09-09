import { render } from 'preact'

import { Counter } from './counter'
import style from './style.css?raw'

const target = document.querySelector('#counter')
if (target) {
  GM_addStyle(style)
  const fragment = document.createDocumentFragment()
  render(<Counter />, fragment)
  target.replaceWith(fragment)
}
