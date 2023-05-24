import { Classifier, ClassifierPost } from './Classifier'
import { Audit } from './Audit'
import { User, UserPost } from './User'
import { File } from './File'
import { Identity } from './Identity'
import { Heartbeat } from './Heartbeat'

export type GuidIriString<
  AnyResourceString extends string,
  ResourceString extends AnyResourceString
> = `/api/${ResourceString}` | `/api/${ResourceString}/${string}`

export type GuidResource<
  AnyResourceString extends string,
  ResourceString extends AnyResourceString
> = {
  '@context': string
  '@id': GuidIriString<AnyResourceString, ResourceString>
  '@type': string
  id: string
}

export type Resources = {
  classifiers: {
    get: Classifier
    post: ClassifierPost
  }
  users: {
    get: User
    post: UserPost
  }
  audits: {
    get: Audit
    post: undefined
  }
  identities: {
    get: Identity
    post: undefined
  }
  files: {
    get: File
    post: undefined
  }
  heartbeat: {
    get: Heartbeat
    post: undefined
  }
}

export type AnyResourceString = keyof Resources

export type IriString<
  ResourceString extends AnyResourceString = AnyResourceString
> = `/api/${ResourceString}` | `/api/${ResourceString}/${number}`

type Resource<ResourceString extends AnyResourceString = AnyResourceString> = {
  '@context': string
  '@id': IriString<ResourceString>
  '@type': string
  id: number
}

export type CrudResource<
  ResourceString extends AnyResourceString = AnyResourceString
> = Resource<ResourceString> & {
  createdAt: string
  updatedAt: string
}

export type GuidCrudResource<ResourceString extends AnyResourceString> =
  GuidResource<AnyResourceString, ResourceString> & {
    createdAt: string
    updatedAt: string
  }

export const isExpanded = <X extends keyof Resources>(
  x: IriString<X>[] | GuidIriString<AnyResourceString, X>[] | GetType<X>[]
): x is GetType<X>[] => {
  return !x.length || typeof x[0] === 'object'
}

export const isExpandedSingle = <X extends keyof Resources>(
  x: IriString<X> | GuidIriString<AnyResourceString, X> | GetType<X>
): x is GetType<X> => {
  return typeof x === 'object'
}

export type GetType<K extends keyof Resources = keyof Resources> =
  Resources[K]['get']
export type PostType<K extends keyof Resources = keyof Resources> =
  Resources[K]['post']
// if no Patch type defined, it is equal to Post type
export type PatchType<K extends keyof Resources = keyof Resources> =
  Resources[K] extends { patch: Record<string, any> }
    ? Resources[K]['patch']
    : Resources[K]['post']
