export type Status = 'waiting' | 'progress' | 'completed'

export type Task = {
  id: number
  title: string
  comment: string
  status: Status
}
