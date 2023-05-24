import { SelectOptionTyped } from 'wd-frontend-shared/models/FormFields'
import {
  Classifier,
  ClassifierType,
  classifierTypeToLabel,
} from '../Types/Classifier'
import { User } from '../Types/User'
import { AxiosRequestConfig } from 'axios'
import UserRepository from '../Repositories/UserRepository'
import { Resources } from '../Types/Resource'
import { Primitive } from '../Types/Shared'


export const SelectOptionFactory = {
  createFromClassifier: (classifier: Classifier) =>
    new SelectOptionTyped(classifier.value, classifier['@id']),
  createFromClassifierWithId: (classifier: Classifier) =>
    new SelectOptionTyped(classifier.value, classifier.id.toString()),
  createFromUser: (user: User) =>
    new SelectOptionTyped(
      user.firstName || user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.email ?? '',
      user['@id']
    ),
  createFromUserWithId: (user: User) =>
    new SelectOptionTyped(
      user.firstName || user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.email || '',
      user.id.toString()
    ),
}

const createConfig = (params = {}): AxiosRequestConfig =>
  ({
    params: { ...params, pagination: false },
  } as AxiosRequestConfig)

const loadUsers = async (onlyActive: boolean) => {
  const config = createConfig()
  if (onlyActive) config.params.active = true
  return await UserRepository.list(config)
}

export const getUserSelectOptions = async (
  onlyActive = true
): Promise<SelectOptionTyped<string, string>[]> => {
  try {
    return (await loadUsers(onlyActive)).map(SelectOptionFactory.createFromUser)
  } catch (e) {
    console.error(e)
  }
  return []
}


export const getUserSelectOptionsWithId = async (
  onlyActive = true
): Promise<SelectOptionTyped<string, string>[]> => {
  try {
    return (await loadUsers(onlyActive)).map(
      SelectOptionFactory.createFromUserWithId
    )
  } catch (e) {
    console.error(e)
  }
  return []
}


export const classifierTypeSelectOptions = Object.values(ClassifierType).map(
  (x) => new SelectOptionTyped(classifierTypeToLabel(x), x)
)

const createSelectConfig = (createUrlFunction, createSelectOptionFunction) => ({
  requestUrlGenerator: (searchValue: string) => createUrlFunction(searchValue),
  responseMapFunction: createSelectOptionFunction,
})

const createDataFetchingSelectUrlObj = <R extends keyof Resources>(
  resource: R,
  params: Record<string, Primitive | undefined>
) => {
  const url = new URL(`/api/${resource}`, window.origin)
  Object.entries(params).forEach(([key, value]) => {
    if (typeof value !== 'undefined') {
      url.searchParams.append(key, value.toString())
    }
  })
  return url.toString()
}

