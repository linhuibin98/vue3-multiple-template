declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.json' {
  const json: Record<string, any> | Array<any>

  export default json
}