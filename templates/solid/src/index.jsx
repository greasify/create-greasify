import { render } from 'solid-js/web'

import { Counter } from './counter'
import style from './style.css?raw'

const target = document.querySelector('.card')

if (target) {
  GM_addStyle(style)
  const fragment = document.createDocumentFragment()
  render(() => <Counter />, fragment)
  target.append(fragment)
}
