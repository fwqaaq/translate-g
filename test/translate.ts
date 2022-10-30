/** @format */
import assert from 'node:assert'
import { describe, it } from 'node:test'

import { gTranslate } from '../src/index.js'

describe('A thing', () => {
  it('should work', () => {
    gTranslate('hello', { to: 'zh-CN' }).then((res) => {
      console.log(res)
    })
    assert.strictEqual(1, 1)
  })
})
