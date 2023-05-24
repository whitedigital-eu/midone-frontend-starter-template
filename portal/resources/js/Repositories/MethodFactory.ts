import {
  PatchType,
  GuidIriString,
  IriString,
  AnyResourceString,
} from '../Types/Resource'
import { AxiosRequestConfig } from 'axios'
import baseAxios, { createIriString } from '../Mixins/DataFetching'
import { GetType, PostType, Resources } from '../Types/Resource'
import { defaultWriteConfig } from '../Helpers/Global'

export type IriOrId<X extends keyof Resources> =
  | IriString<X> // resource iri string (@id)
  | GuidIriString<AnyResourceString, X> // resource iri string with guid (@id)
  | number // resource id
  | string // resource guid

const requestUrl = <X extends keyof Resources>(
  resourceString: X,
  iriOrId: IriOrId<X>
) => {
  if (typeof iriOrId === 'string') return iriOrId
  return `/api/${resourceString}/${iriOrId}`
}

export default {
  list<X extends keyof Resources>(
    resourceString: X
  ): (config?: AxiosRequestConfig) => Promise<GetType<X>[]> {
    if (!resourceString) throw new Error('resourceString must be truthy!')

    return async (config) => {
      return (await baseAxios.get(`/api/${resourceString}`, config)).data[
        'hydra:member'
      ]
    }
  },
  get<X extends keyof Resources>(
    resourceString: X
  ): (iriOrId: IriOrId<X>, config?: AxiosRequestConfig) => Promise<GetType<X>> {
    if (!resourceString) throw new Error('resourceString must be truthy!')

    return async (iriOrId, config) => {
      return (await baseAxios.get(requestUrl(resourceString, iriOrId), config))
        .data
    }
  },
  create<X extends keyof Resources>(
    resourceString: X
  ): (data: PostType<X>, config?: AxiosRequestConfig) => Promise<GetType<X>> {
    if (!resourceString) throw new Error('GetType<X> must be truthy!')

    return async (data, config) => {
      return (
        await baseAxios.post(createIriString(resourceString), data, {
          ...defaultWriteConfig,
          ...config,
        })
      ).data
    }
  },
  update<X extends keyof Resources>(
    resourceString: X
  ): (
    iriOrId: IriOrId<X>,
    data: PatchType<X>,
    config?: AxiosRequestConfig
  ) => Promise<GetType<X>> {
    if (!resourceString) throw new Error('resourceString must be truthy!')

    return async (iriOrId, data, config) => {
      return (
        await baseAxios.patch(requestUrl(resourceString, iriOrId), data, {
          ...defaultWriteConfig,
          ...config,
        })
      ).data
    }
  },
  delete<X extends keyof Resources>(
    resourceString: X
  ): (iriOrId: IriOrId<X>, config?: AxiosRequestConfig) => Promise<void> {
    if (!resourceString) throw new Error('R must be truthy!')

    return async (iriOrId, config) => {
      await baseAxios.delete(requestUrl(resourceString, iriOrId), config)
    }
  },
  createOrUpdate<X extends keyof Resources>(
    resourceString: X
  ): (
    iriOrId: IriOrId<X> | null | undefined,
    data: typeof iriOrId extends IriOrId<X> ? PostType<X> : PatchType<X>,
    config?: AxiosRequestConfig
  ) => Promise<GetType<X>> {
    if (!resourceString) throw new Error('R must be truthy!')

    return async (iriOrId, data, config) => {
      return (
        await (iriOrId
          ? baseAxios.patch(requestUrl(resourceString, iriOrId), data, {
              ...defaultWriteConfig,
              ...config,
            })
          : baseAxios.post(createIriString(resourceString), data, {
              ...defaultWriteConfig,
              ...config,
            }))
      ).data
    }
  },
}
