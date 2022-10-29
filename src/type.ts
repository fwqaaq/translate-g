/** @format */

export interface ITranslateOptions {
  to: string
  from: string
}

export interface ITranslateLocation {
  to: { [index: string]: string }
  from: { [index: string]: string }
}
