import path from 'path'
import {fileURLToPath} from 'url'

export const fileURLToDirname = (url: string) =>
  fileURLToPath(path.dirname(url))
