import { FormField } from 'wd-frontend-shared/models/FormFields'
import Text from 'wd-frontend-shared/components/Inputs/Text.vue'
import Decimal from 'wd-frontend-shared/components/Inputs/Decimal.vue'
import TextEditor from 'wd-frontend-shared/components/Inputs/TextEditor.vue'
import SimpleSelect from 'wd-frontend-shared/components/Inputs/Selects/SimpleSelect.vue'
import DataFetchingSelect from 'wd-frontend-shared/components/Inputs/Selects/DataFetchingSelect.vue'
import Datepicker from 'wd-frontend-shared/components/Inputs/Datepicker.vue'
import DateTimePicker from 'wd-frontend-shared/components/Inputs/DateTimePicker.vue'
import FileUpload from 'wd-frontend-shared/components/Inputs/FileUpload/FileUpload.vue'
import Checkbox from 'wd-frontend-shared/components/Inputs/Checkbox.vue'
import Slider from 'wd-frontend-shared/components/Inputs/Slider.vue'
import FlatpickrTimePicker from 'wd-frontend-shared/components/Inputs/FlatpickrTimePicker.vue'
import { isSelectField } from 'wd-frontend-shared/models/FormFields'
import baseAxios from '../../Mixins/DataFetching'

export const getComponentAttributes = <FF extends FormField>(formField: FF) => {
  const attributes: any = {}
  if (formField.name) {
    attributes.id = `${formField.name}-${Math.floor(Math.random() * 1000)}`
  }
  if (isSelectField(formField)) {
    if (formField.config) attributes.config = formField.config
    if ('allowDelete' in formField) {
      attributes.allowDelete = formField.allowDelete
    }
  }
  //@ts-ignore
  if ('config' in formField && 'maxDecimals' in formField.config) {
    //@ts-ignore
    attributes.maxDecimals = formField.config.maxDecimals
  }
  if (formField.readonly) attributes.readonly = formField.readonly
  if (formField.type === 'file-upload') {
    attributes.axiosInstance = baseAxios
    attributes.endpointUrl = '/api/files'
    //@ts-ignore
    if (formField.setPublic) {
      attributes.setPublic = true
    }
  }
  if (formField.type === 'data-fetching-select') {
    attributes.axiosInstance = baseAxios
  }
  if ('allowDownload' in formField) {
    //@ts-ignore
    attributes.allowDownload = formField.allowDownload
  }
  attributes.label = formField.label
  return attributes
}

export const inputTypeToComponent = {
  text: Text,
  decimal: Decimal,
  textarea: TextEditor,
  'simple-select': SimpleSelect,
  'data-fetching-select': DataFetchingSelect,
  date: Datepicker,
  'date-time': DateTimePicker,
  'file-upload': FileUpload,
  checkbox: Checkbox,
  slider: Slider,
  time: FlatpickrTimePicker,
}

export const referenceInputTypes: string[] = [
  'simple-select',
  'data-fetching-select',
  'file-upload',
] satisfies Array<keyof typeof inputTypeToComponent>

export const getComponent = (inputType: keyof typeof inputTypeToComponent) => {
  return inputTypeToComponent[inputType]
}

export const getEventHandlers = (formField: any, emit) => {
  if (
    formField.type === 'simple-select' ||
    formField.type === 'data-fetching-select'
  ) {
    return {
      'create-new-item': (item: string) =>
        emit('select-create-new-item', formField.name, item),
    }
  } else if (formField.type === 'file-upload') {
    return {
      'remove-file': (fileIri: string, callback: any) =>
        emit('remove-file', formField.name, fileIri, callback),
    }
  }

  return {}
}
