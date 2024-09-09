import { createMemo, createSignal } from 'solid-js'
import type { Component } from 'solid-js'

const [count, setCount] = createSignal(2)
const double = createMemo(() => count() * 2)

export const Counter: Component = () => {
  return (
    <button
      class="counter"
      onClick={() => setCount(count() + 1)}
    >
      {count()} x 2 = {double()}
    </button>
  )
}
