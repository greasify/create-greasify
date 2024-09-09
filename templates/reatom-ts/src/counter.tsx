import { counterAtom } from './model'

export function Counter() {
  return (
    <button
      class="counter"
      on:click={counterAtom.increment}
    >
      counter is {counterAtom}
    </button>
  )
}
