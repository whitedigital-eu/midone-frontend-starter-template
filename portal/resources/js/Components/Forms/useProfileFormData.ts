import useFormData from 'wd-frontend-shared/composables/useFormData'
import { TextField } from 'wd-frontend-shared/models/FormFields'
import { fillFormDataFrom } from 'wd-frontend-shared/helpers/Global'
import baseAxios from '../../Mixins/DataFetching'
import { User } from '../../Types/User'
import l from '../../Labels/Labels'
import { blobToBase64 } from '../../Helpers/Files'
import { AxiosRequestConfig } from 'axios'
import UserRepository from "../../Repositories/UserRepository";

type UserFormData = {
  firstName: TextField
  lastName: TextField
  phone: TextField
}

export default function useUserFormData(iri: User['@id']) {
  const baseFormData: UserFormData = {
    firstName: new TextField('firstName', l('common', 'firstName')),
    lastName: new TextField('lastName', l('common', 'lastName')),
    phone: new TextField('phone', l('common', 'phone')),
  }


  const prepareForEdit = async (formData: UserFormData) => {
    const user = await  UserRepository.get(iri)
    fillFormDataFrom(formData, user)
    return formData
  }

  const formLayout: Array<Array<keyof UserFormData>> = [
    ['firstName', 'lastName', 'phone'],
  ]

  return {
    ...useFormData(baseFormData, prepareForEdit),
    formLayout,
  }
}
