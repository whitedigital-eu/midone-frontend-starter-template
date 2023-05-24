import router from '../router'
import { showGlobalError } from 'wd-frontend-shared/helpers/FlashMessages'
import { AxiosError } from 'axios'

export type TableXhrErrRes = {
  body: ReadableStream
  bodyUsed: boolean
  headers: Headers
  ok: boolean
  redirected: boolean
  status: number
  statusText: string
  type: string
  url: string
}

type InvalidLoginErrRes = {
  code: number
  message: string
}

type ApiPlatformErrRes = {
  'hydra:title': string
  'hydra:description': string
  trace: Record<string, any>[]
}

export const handleXhrError = async (error: AxiosError | TableXhrErrRes) => {
  return Promise.reject(error)
}

const shouldShowError = (error: AxiosError) => {
  const ignoreValidationErrors =
    //@ts-ignore
    error.response?.config.ignoreValidationErrors ?? false
  console.error(error.response)
  const is401 = error.response?.status === 401
  const isValidation = error.response?.status === 422
  const isCurrentUserRequest =
    error.response?.config.url === '/api/identities/current'
  return (
    !(
      is401 &&
      (router.currentRoute.value.meta.requiresAuth || isCurrentUserRequest)
    ) &&
    !(ignoreValidationErrors && isValidation) &&
    error.response?.data
  )
}

const isInvalidLoginErr = (
  error: AxiosError<any>
): error is AxiosError<InvalidLoginErrRes> => {
  return error.response?.data.code && error.response.data.message
}
const isApiPlatformError = (
  error: AxiosError<any>
): error is AxiosError<ApiPlatformErrRes> => {
  return error.response?.data['hydra:description']
}

export const handleAndShowError = (
  error: AxiosError<InvalidLoginErrRes | ApiPlatformErrRes>
) => {
  if (shouldShowError(error) && error.response) {
    if (isInvalidLoginErr(error)) {
      showGlobalError(error.response.data.message)
    } else if (isApiPlatformError(error)) {
      showGlobalError(error.response.data['hydra:description'])
    }
  }
  return handleXhrError(error)
}
