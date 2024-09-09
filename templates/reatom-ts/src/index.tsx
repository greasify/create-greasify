import { connectLogger } from '@reatom/framework'
import { ctx, mount } from '@reatom/jsx'

import { Counter } from './counter'
import style from './style.css?raw'

GM_addStyle(style)

if (import.meta.env.MODE === 'development') {
  connectLogger(ctx)
}

const target = document.querySelector('.card')
if (target) {
  mount(target, <Counter />)
}
