import * as fs from 'fs/promises'
import path from 'path'
import Explorer from './explorer'
import {fileURLToDirname} from './utils'

export default async function AppPage() {
  const files = await getFiles()
  return <Explorer files={files} />
}

const __dirname = fileURLToDirname(import.meta.url)

async function getFiles() {
  const files = await fs.readdir(path.join(__dirname, 'md'))
  const filesWithContents = await Promise.all(
    files.map(async (file) => {
      const contents = await fs.readFile(
        path.join(__dirname, 'md', file),
        'utf-8',
      )
      return {
        file,
        contents,
      }
    }),
  )

  const filesObject: {[key: string]: string} = {}
  for (const {contents, file} of filesWithContents) {
    filesObject[file] = contents
  }

  return filesObject
}
