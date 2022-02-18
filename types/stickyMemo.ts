export type Sticky<P> = {
  x: number | string
  y: number | string
  zIndex: number
  info: P
}
export type StickyMemo = Sticky<{
  title: string
  content: string

}>
