import rehypeStringify from 'rehype-stringify/lib'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'

export const parser = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeStringify).processSync
