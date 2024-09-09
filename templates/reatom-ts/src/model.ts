import { action, atom, withAssign } from '@reatom/framework'

export const counterAtom = atom(0, 'counterAtom').pipe(
  withAssign((target, name) => ({
    increment: action(
      (ctx) => target(ctx, (counter) => counter + 1),
      `${name}.increment`
    )
  }))
)
