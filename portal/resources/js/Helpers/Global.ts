import { Ref } from 'vue'
import { AxiosRequestConfig } from 'axios'
import {referenceInputTypes} from "../Partials/Forms/shared";

export const logFdError = (fdv: Ref) => {
  console.error(
    'formData.value should be defined when preparing data for api! formData.value: ',
    fdv.value
  )
}

export const defaultWriteConfig = {
  ignoreValidationErrors: true,
} as AxiosRequestConfig

export const capitalizeFirstLetter = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const getFormFieldValues = <
    T extends Record<string, { value: any; type: string }>
>(
    formData: T,
    propertiesToExclude: Array<keyof T> = []
) => {
  const res = {} as {
    [K in keyof T]: T[K] extends { name: string; value: infer V } ? V : never
  }

  for (const key in formData) {
    if (propertiesToExclude.includes(key)) continue
    let val = formData[key].value as any

    if (referenceInputTypes.includes(formData[key].type) && val === '') {
      val = null
    }

    res[key as keyof T] = val
  }

  return res
}

export enum RENDER_FORMAT {
  money = 'money',
  dateTimeInterval = 'time-interval',
}

const downloadBlob = (blob: Blob, filename: string) => {
  const a = document.createElement('a')
  a.href = window.URL.createObjectURL(blob)
  a.download = filename
  a.click()
}