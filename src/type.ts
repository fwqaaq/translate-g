/** @format */

export interface ITranslateOptions {
  to?: string
  from?: string
  raw?: boolean
}

export interface ITranslateLocation {
  to: { [index: string]: string }
  from: { [index: string]: string }
}

export interface IQuery {
  client: string
  sl: keyof ITranslateLocation['from']
  tl: keyof ITranslateLocation['to']
  hl: string
  dt: string[]
  ie: string
  oe: string
  otf?: string
  ssel?: string
  tsel?: string
  kc?: string
  q: string
}

export interface IRes {
  textRaw: string
  textTranslate: string
  from: string
  JsonRes?: []
}
