// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  internalEvents: {
    'done.invoke.monacoInitializer': {
      type: 'done.invoke.monacoInitializer'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'error.platform.monacoInitializer': {
      type: 'error.platform.monacoInitializer'
      data: unknown
    }
    'xstate.init': {type: 'xstate.init'}
  }
  invokeSrcNameMap: {
    monacoInitializer: 'done.invoke.monacoInitializer'
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    updateMd: 'code.changed'
  }
  eventsCausingServices: {
    monacoInitializer: 'xstate.init'
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates:
    | 'initialized'
    | 'initialized.md'
    | 'initialized.unknown'
    | 'initializing'
    | {initialized?: 'md' | 'unknown'}
  tags: never
}
