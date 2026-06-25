export type ThreadId =
  | 'nearEast'
  | 'egyptAfrica'
  | 'classical'
  | 'europe'
  | 'china'
  | 'india'
  | 'islamic'
  | 'americas'
  | 'ideas'
  | 'global'

export type DomainId =
  | 'power'
  | 'war'
  | 'science'
  | 'religion'
  | 'culture'
  | 'exploration'
  | 'disaster'
  | 'economy'

export interface HistEvent {
  id: string
  title: string
  year: number
  endYear?: number
  thread: ThreadId
  domain: DomainId
  importance: 1 | 2 | 3 | 4
  fuzzy?: boolean
  links?: ThreadId[]
  note?: string
}
