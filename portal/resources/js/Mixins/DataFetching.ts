import getLoadResourceFunctions from 'wd-frontend-shared/helpers/DataFetching'
import {
  AnyResourceString,
  GuidIriString,
  IriString,
  Resources,
} from '../Types/Resource'
import { AxiosResponse } from 'axios'
import { showWriteRequestSuccess } from 'wd-frontend-shared/helpers/FlashMessages'
import createAxiosWithInterceptors from 'wd-frontend-shared/create-axios'
import { handleAndShowError } from './Errors'

const writeMethodNames = ['post', 'put', 'patch', 'delete']
const urlsToIgnoreSuccess = [
  '/api/logins',
  '/api/logouts',
  '/api/pdf-conversions',
]
const isWriteMethod = (method: string) => writeMethodNames.includes(method)
const shouldIgnoreSuccess = (url: string) => urlsToIgnoreSuccess.includes(url)
const handleResponse = (response: AxiosResponse) => {
  if (
    response.config.method &&
    response.config.url &&
    isWriteMethod(response.config.method) &&
    !shouldIgnoreSuccess(response.config.url)
  ) {
    showWriteRequestSuccess(response.config.method)
  }
  return response
}

const baseAxios = createAxiosWithInterceptors(
  handleResponse,
  handleAndShowError
)

export const createIriString = <T extends AnyResourceString>(
  resourceString: T,
  id?: number | string
): IriString<T> => {
  let iriString: IriString<T> = `/api/${resourceString}`
  if (id) iriString = `${iriString}/${id}` as IriString<T>
  return iriString
}

export const iriStringToId = (iri: IriString<AnyResourceString>): number =>
  parseInt(iri.split('/').pop() ?? '')

export const guidIriStringToId = <X extends keyof Resources>(
  iri: GuidIriString<AnyResourceString, X>
): string => iri.split('/').pop() ?? ''

export default baseAxios
