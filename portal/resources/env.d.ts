/// <reference types="vite/customer" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'tabulator-tables' {
  export = Tabulator
}

declare module '@dvsl/zoomcharts' {
  export = ZoomCharts
  export = ZoomCharts.Configuration
}

declare module 'vue-signature-pad' {
  import signature_pad, * as SignaturePad from 'signature_pad'
  import Vue from 'vue'

  export interface IOptions extends SignaturePad.IOptions {}
  export interface IPointGroup extends SignaturePad.IPointGroup {}

  export interface Status {
    isEmpty: boolean
    data?: any
  }

  export default class VueSignaturePad extends Vue {
    // props
    width: string
    height: string
    customStyle: any
    saveType: string
    options: IOptions
    images: any[]

    // computer
    propsImagesAndCustomImages: any[]

    // methods
    resizeCanvas(): void
    saveSignature(): Status
    undoSignature(): void
    mergeImageAndSignature(customSignature: any): Promise<any> // TODO: constrain to correct return type.
    addImages(images: any[]): Promise<any> // TODO: constrain to correct param type and return type.
    fromDataURL(data: string): void
    lockSignaturePad(): void
    openSignaturePad(): void
    isEmpty(): boolean
    getPropImagesAndCacheImages(): any[]
    clearCacheImages(): 'this.cacheImages'
    clearSignature(): void
  }
}

/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_TIMEZONE: string
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
