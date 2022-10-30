/** @format */

import type { ITranslateOptions, IQuery, IRes } from './type'
import toAndFrom from './language.json' assert { type: 'json' }
const { to, from } = toAndFrom

// console.log(to, from)

async function gTranslate(text: string, options: ITranslateOptions) {
  let baseUrl = 'https://translate.google.com/translate_a/single'

  // when options doesn't have "from" and "to", "from" => "auto", "to" => "en"
  if (!Object.hasOwn(options, 'from')) options.from = 'auto'
  if (!Object.hasOwn(options, 'to')) options.to = 'en'
  if (!isSupported(options.to!, to) || !isSupported(options.from!, from)) {
    throw new Error(
      `Unsupported language, to: ${options.to}, from: ${options.from}`
    )
  }

  // about query of the google translate
  const query: IQuery = {
    client: 'gtx',
    sl: options.from!,
    tl: options.to!,
    hl: options.to!,
    dt: ['at', 'bd', 'ex', 'ld', 'md', 'qca', 'rw', 'rm', 'ss', 't'],
    ie: 'UTF-8',
    oe: 'UTF-8',
    q: text,
  }

  baseUrl = `${baseUrl}?${dealQuery(query)}`
  let response
  try {
    response = await fetch(baseUrl)
  } catch (error) {
    console.log(`google Translate error: ${error}`)
  }
  const json = await response?.json()

  // RETURN response's result
  const res: IRes = {
    textTranslate: json[0][0][0],
    textRaw: json[0][0][1],
    from: json[2] && json[8][0][0] ? json[2] : json[8][0][0],
    JsonRes: options.raw ? json : undefined,
  }

  return res
}

function isSupported(language: string, checked: { [index: string]: string }) {
  return Object.keys(checked).find(
    (key) =>
      key === language.toLowerCase() || checked[key] === language.toLowerCase()
  )
}

function dealQuery(query: IQuery) {
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

export { gTranslate }
