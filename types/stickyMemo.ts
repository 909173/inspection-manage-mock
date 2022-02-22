export type Sticky<P> = {
  x: number | string
  y: number | string
  width: number
  height: number
  index: number
  isVisible?: boolean
  info: P

}
export type StickyMemo = Sticky<{
  title: string
  content: string

}>
