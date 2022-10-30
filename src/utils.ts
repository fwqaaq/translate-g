/** @format */
import type { IQuery } from './type'

// check if the language is supported
export function isSupported(
  language: string,
  checked: { [index: string]: string }
) {
  return Object.keys(checked).find(
    (key) =>
      key === language.toLowerCase() || checked[key] === language.toLowerCase()
  )
}

// deal the query params
export function dealQuery(query: IQuery) {
  const queryStr = Object.entries(query)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((item) => `${key}=${item}`).join('&')
      }
      return `${key}=${value}`
    })
    .join('&')
  return encodeURI(queryStr)
}
