/** @format */

import { type ITranslateOptions } from './type'
import toAndFrom from './language.json' assert { type: 'json' }

const { to, from } = toAndFrom

console.log(to, from)

async function gTranslate(text: string, options: ITranslateOptions) {
  // when options doesn't have "from" and "to", "from" => "auto", "to" => "en"
  if (!Object.hasOwn(options, 'from')) options.from = 'auto'
  if (!Object.hasOwn(options, 'to')) options.to = 'en'
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (isSupported(options.to!, to) || isSupported(options.from!, from)) {
    throw new Error(
      `Unsupported language, to: ${options.to}, from: ${options.from}`
    )
  }
}

function isSupported(language: string, checked: { [index: string]: string }) {
  return Object.keys(checked).find(
    (key) =>
      key === language.toLowerCase() || checked[key] === language.toLowerCase()
  )
}
