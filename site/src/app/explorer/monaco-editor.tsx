import {
  FileTabs,
  SandpackStack,
  useActiveCode,
  useSandpack,
} from '@codesandbox/sandpack-react'
import Editor, {Monaco} from '@monaco-editor/react'
import githubDark from './github-dark.json'
import githubLight from './github-light.json'
import reactDTs from './react-d-ts'

const configureMonaco = (monaco: Monaco) => {
  // theming
  monaco.editor.defineTheme('github-light', githubLight as any)
  monaco.editor.defineTheme('github-dark', githubDark as any)

  // typescript
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    esModuleInterop: true,
    jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
    reactNamespace: 'React',
    allowJs: true,
    typeRoots: ['node_modules/@types'],
  })
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  })

  monaco.languages.typescript.typescriptDefaults.addExtraLib(reactDTs)
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `declare module 'react/jsx-runtime' { ${reactDTs} }`,
  )
}

const fileNameToLanguage = (fileName: string) => {
  const extension = fileName.split('.').pop()

  switch (extension) {
    case 'ts':
    case 'tsx':
      return 'typescript'
    case 'js':
    case 'jsx':
      return 'javascript'
    case 'json':
      return 'json'
    case 'md':
    case 'mdx':
      return 'markdown'
  }
}

export default function MonacoEditor() {
  const {code, updateCode} = useActiveCode()
  const {sandpack} = useSandpack()

  const language = fileNameToLanguage(sandpack.activeFile)

  return (
    <SandpackStack style={{height: '100vh', margin: 0}}>
      <FileTabs />
      <Editor
        beforeMount={configureMonaco}
        width="100%"
        height="100%"
        language={language}
        theme="github-light"
        key={sandpack.activeFile}
        value={code}
        onChange={(value) => updateCode(value || '')}
        path={sandpack.activeFile}
      />
    </SandpackStack>
  )
}
