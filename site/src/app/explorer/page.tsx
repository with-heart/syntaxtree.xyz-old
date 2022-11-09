import fs from 'fs/promises'
import {fromMarkdown} from 'mdast-util-from-markdown'
import path from 'path'
import {fileURLToPath} from 'url'
import Explorer from './explorer'

const __dirname = fileURLToPath(path.dirname(import.meta.url))

const md = `
# Tree Test

This is a plain paragraph!

This paragraph has a [link](https://google.com/) in it!

- this
- is
- a
- list
`.trim()

const mdast = fromMarkdown(md)

export default async function AppPage() {
  // const data = await getData()
  // return <Tree node={mdast} />
  return <Explorer />
}

async function getData() {
  const data = await fs.readFile(
    path.resolve(__dirname, './monaco-editor.tsx'),
    'utf-8',
  )
  return data
}
