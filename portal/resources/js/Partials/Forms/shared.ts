import { FormField } from 'wd-frontend-shared/models/FormFields'
import { baseAxios } from '../../Axios/createAxiosInstance'
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
import SignatureField from '../Signature/SignatureField.vue'
import TimeWithCurrent from '../TimeWithCurrent.vue'
import { isSelectField } from 'wd-frontend-shared/models/FormFields'

export const getComponentAttributes = <FF extends FormField>(formField: FF) => {
  const attributes: any = {}
  if (formField.name)
    attributes.id = `${formField.name}-${Math.floor(Math.random() * 1000)}`
  if (isSelectField(formField)) {
    if (formField.config) attributes.config = formField.config
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
  attributes.label = formField.label
  return attributes
}

export const getComponent = (inputType: string) => {
  return {
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
    'time-with-current': TimeWithCurrent,
    signature: SignatureField,
  }[inputType]
}
