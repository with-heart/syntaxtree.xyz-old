import {SandpackStack, useSandpack} from '@codesandbox/sandpack-react'
import Editor from '@monaco-editor/react'
import {useMachine} from '@xstate/react'
import {editorMachine} from './editor'

export default function MarkdownEditor() {
  const {sandpack} = useSandpack()
  const [state, send] = useMachine(editorMachine, {
    context: {
      ...editorMachine.initialState.context,
      sandpack,
    },
  })

  if (state.matches('initializing')) {
    return <div>Loading...</div>
  }

  const {
    context: {language},
  } = state
  const {code} = sandpack.files['/index.md']

  return (
    <SandpackStack style={{height: '100vh', margin: 0}}>
      <Editor
        width="100%"
        height="100%"
        language={language}
        theme="github-light"
        key={sandpack.activeFile}
        value={code}
        onChange={(value) => send({type: 'code.changed', code: value ?? ''})}
        path={sandpack.activeFile}
        options={{
          fontSize: 18,
        }}
      />
    </SandpackStack>
  )
}
