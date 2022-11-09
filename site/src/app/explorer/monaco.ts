import {Monaco} from '@monaco-editor/react'
import githubDark from './github-dark.json'
import githubLight from './github-light.json'
import reactDTs from './react-d-ts'

export const configureMonaco = (monaco: Monaco) => {
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
