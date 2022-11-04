'use client'

import {
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react'
import {githubLight} from '@codesandbox/sandpack-themes'
import {useEffect, useState} from 'react'
import MonacoEditor from './monaco-editor'

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
export default function App(): JSX.Element {
  return <h1>Hello World</h1>
}`.trim(),
        'index.md': `# Hello World\n\nThis is some body text!`,
      }}
    >
      <SandpackLayout>
        <MonacoEditor />
        <SandpackPreview style={{height: '100vh'}} />
      </SandpackLayout>
    </SandpackProvider>
  )
}
