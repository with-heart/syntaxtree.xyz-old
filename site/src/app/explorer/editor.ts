import {SandpackState} from '@codesandbox/sandpack-react'
import {loader, Monaco} from '@monaco-editor/react'
import {createMachine} from 'xstate'
import {parser} from './markdown'
import {configureMonaco} from './monaco'
import {Language} from './types'

export interface EditorContext {
  language: Language
  monaco: Monaco
  sandpack: SandpackState
}

export type EditorEvent =
  | {type: 'monaco.initialized'; monaco: Monaco}
  | {type: 'code.changed'; code: string}

export const editorMachine = createMachine(
  {
    id: 'editor',
    predictableActionArguments: true,
    schema: {
      context: {} as EditorContext,
      events: {} as EditorEvent,
    },
    tsTypes: {} as import('./editor.typegen').Typegen0,
    initial: 'initializing',
    context: {
      language: Language.Markdown,
      monaco: undefined as unknown as Monaco,
      sandpack: undefined as unknown as SandpackState,
    },
    states: {
      initializing: {
        invoke: {
          id: 'monacoInitializer',
          src: 'monacoInitializer',
        },
        on: {
          'monaco.initialized': 'initialized',
        },
      },
      initialized: {
        initial: 'unknown',
        states: {
          unknown: {
            always: [{target: 'md'}],
          },
          md: {
            on: {
              'code.changed': {
                actions: 'updateMd',
              },
            },
          },
        },
      },
    },
  },
  {
    services: {
      monacoInitializer: () => async (send) => {
        const monaco = await loader.init()
        configureMonaco(monaco)
        send({type: 'monaco.initialized', monaco})
      },
    },
    actions: {
      updateMd: async ({sandpack}, event) => {
        const replacementCode = parser(event.code).toString()
        const appCode = sandpack.files['/App.tsx'].code
        sandpack.updateFile('/App.tsx', updateHtml(appCode, replacementCode))
      },
    },
  },
)

/*

this is kind of a hack because i don't really understand what i'm doing here, so
i'm just doing stuff to get it working and i'll figure out a better way to do it
later

basically whether we're rendering user input of markdown or typescript or
whatever language, we're *actually* rendering the component defined in
`App.tsx`. that component renders the `html` output of the code

to inject the updated code, we have an `html` variable defined in `App.tsx` that
we need to replace the value of with the updated code

*/

const appHtmlRegex = /^const html = `[\s\S]+`/m

function updateHtml(code: string, replacementHtml: string) {
  return code.replace(appHtmlRegex, `const html = \`${replacementHtml}\``)
}
