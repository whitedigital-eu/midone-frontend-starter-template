import { handleAndShowError } from '../Mixins/Errors'
import { showWriteRequestSuccess } from 'wd-frontend-shared/helpers/FlashMessages'
import createAxiosWithInterceptors from 'wd-frontend-shared/create-axios/index'
import { AxiosResponse } from 'axios'

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

export const baseAxios = createAxiosWithInterceptors(
  handleResponse,
  handleAndShowError
)
