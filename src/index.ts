/** @format */

import type { ITranslateOptions, IQuery, IRes } from './type.js'
import toAndFrom from './language.json' assert { type: 'json' }
import { isSupported, dealQuery } from './utils.js'
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
    /* 't': translation of the text with the original text
       'at': Synonyms related to the source text
       'ex': examples
       'ss': if the source text is a word, return related words
       'md': if the source text is a word, return the definition of the word
       'bd': translation of the text with the original text
    
    */
    dt: ['t', 'at', 'bd', 'ex', 'ld', 'md', 'qca', 'rw', 'rm', 'ss'],
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

  const fromSimple: keyof typeof from =
    json[2] && json[8][0][0] ? json[2] : json[8][0][0]

  // RETURN response's result
  const res: IRes = {
    textTranslate: json[0][0][0],
    textRaw: json[0][0][1],
    from: from[fromSimple],
  }

  // provide the json response for the user
  if (options.raw) res.JsonRes = json
  return res
}

export { gTranslate }
