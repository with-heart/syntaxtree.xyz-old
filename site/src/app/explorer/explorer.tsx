'use client'

import {SandpackLayout, SandpackProvider} from '@codesandbox/sandpack-react'
import {githubLight} from '@codesandbox/sandpack-themes'
import {useEffect, useState} from 'react'
import {parser} from './markdown'
import MarkdownEditor from './markdown-editor'
import {Tree} from './tree'

const initialMarkdown = `
# Hello World

This is some body text!

Here's a list:

- item 1
- item 2
- item 3
  - item 3.1
  - item 3.2
  - item 3.3

Check out the code at [github.com/with-heart/syntaxtree.xyz](https://github.com/with-heart/syntaxtree.xyz)!
`.trim()

export default function Explorer() {
  const [theme, setTheme] = useState(githubLight)

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')

    const applyTheme = async (isDark?: boolean) => {
      if (isDark) {
        const nightOwl = await import('@codesandbox/sandpack-themes').then(
          (mod) => mod.nightOwl,
        )
        setTheme(nightOwl)
      } else {
        setTheme(githubLight)
      }
    }

    async function onPrefersColorSchemeChange(event: MediaQueryListEvent) {
      if (event.matches) {
        applyTheme(event.matches)
      }
    }

    applyTheme(mediaQueryList.matches)

    mediaQueryList.addEventListener('change', onPrefersColorSchemeChange)

    return () => {
      mediaQueryList.removeEventListener('change', onPrefersColorSchemeChange)
    }
  }, [])

  return (
    <SandpackProvider
      template="react-ts"
      theme={theme}
      customSetup={{
        dependencies: {
          react: 'latest',
          'react-dom': 'latest',
        },
        entry: 'index.tsx',
      }}
      options={{
        activeFile: 'App.tsx',
        visibleFiles: ['index.md'],
        autorun: true,
      }}
      files={{
        'App.tsx': `
const html = \`${parser(initialMarkdown)}\`

export default function App(): JSX.Element {
  return <div dangerouslySetInnerHTML={{__html: html}} />
}`.trim(),
        'index.md': initialMarkdown,
      }}
    >
      <SandpackLayout>
        <MarkdownEditor />
        <Tree />
      </SandpackLayout>
    </SandpackProvider>
  )
}
