import { el } from '@zero-dependency/dom'

export function setupCounter(target: HTMLElement | null) {
  if (!target) {
    console.error('target is not found')
    return
  }

  let count = 0
  const counter = el('button', {
    className: 'counter',
    onclick: () => setCounter(++count)
  })

  function setCounter(count: number) {
    counter.textContent = `count is ${count}`
  }

  setCounter(count)
  target.append(counter)
  ;[].at(-1)
}
