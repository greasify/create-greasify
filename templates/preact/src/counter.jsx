import { computed, signal } from '@preact/signals'

const count = signal(0)
const double = computed(() => count.value * 2)

export function Counter() {
  return (
    <button
      class="counter"
      onClick={() => count.value++}
    >
      {count} x 2 = {double}
    </button>
  )
}
