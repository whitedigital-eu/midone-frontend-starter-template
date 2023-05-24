import { CrudResource } from './Resource'
import { NotNullableRequired, NullableOptional } from './Shared'

export enum ClassifierType {
  test = 'TEST'
}

export type ClassifierPost = NullableOptional<{
  type: ClassifierType
  value: string
}>

export type Classifier = CrudResource<'classifiers'> &
  NotNullableRequired<ClassifierPost>

export const maybeClassifierToClassifier = (
  maybeClassifier: Classifier | Classifier['@id']
) => {
  if (typeof maybeClassifier === 'string') {
    console.error('maybeClassifier must be object!')
    return null
  } else return maybeClassifier as Classifier
}

export const classifierTypeToLabel = (
  classifierType?: ClassifierType | null
): string => {
  if (!classifierType) return ''
  return (
    {
    }[classifierType] ?? classifierType
  )
}
