import { createMemo, createSignal } from 'solid-js'

const [count, setCount] = createSignal(2)
const double = createMemo(() => count() * 2)

export const Counter = () => {
  return (
    <button
      class="counter"
      onClick={() => setCount(count() + 1)}
    >
      {count()} x 2 = {double()}
    </button>
  )
}
