/** @format */

import { type ITranslateOptions } from './type'
async function gTranslate(text: string, options: ITranslateOptions) {
  // when options doesn't have "from" and "to", "from" => "auto", "to" => "en"
  if (Object.hasOwn(options, 'from')) options.from = 'auto'
  if (Object.hasOwn(options, 'to')) options.to = 'en'
  // ...
}
