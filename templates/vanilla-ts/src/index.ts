import { setupCounter } from './counter'
import style from './style.css?raw'

GM_addStyle(style)

setupCounter(document.querySelector('.card'))
