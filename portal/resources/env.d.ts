/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'tabulator-tables' {
  export = Tabulator
}

/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_TIMEZONE: string
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
