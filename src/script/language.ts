/** @format */
import * as fs from 'fs'
import { type ITranslateLocation } from '../type'

const regex = /data:(\[\[\[".*?\]\]\])/g

async function getTranslateJson() {
  const body = await getBody()
  fs.writeFileSync(
    './src/language.json',
    JSON.stringify(dealMatch(body.matchAll(regex)), null, 2)
  )
}

async function getBody() {
  let body = ''
  try {
    const res = await fetch('https://translate.google.com')
    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
    body = await res.text()
  } catch {
    throw new Error('Don not access translation location')
  }
  return body
}

function dealMatch(
  text: IterableIterator<RegExpMatchArray>
): ITranslateLocation {
  text.next()
  const match: string = text.next().value[1]
  const toAndFrom = JSON.parse(match)
  return {
    from: twoDimensionalArray(toAndFrom[0]),
    to: twoDimensionalArray(toAndFrom[1]),
  }
}

function twoDimensionalArray(arr: string[][]) {
  const obj: { [index: string]: string } = {} as const
  arr.forEach((item) => {
    obj[item[0]] = item[1]
  })
  return obj
}

getTranslateJson()
