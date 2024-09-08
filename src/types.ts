type ColorFn = (str: string | number) => string

export type Framework = {
  name: string
  display: string
  color: ColorFn
  variants: FrameworkVariant[]
}

export type FrameworkVariant = {
  name: string
  display: string
  color: ColorFn
  customCommand?: string
}
