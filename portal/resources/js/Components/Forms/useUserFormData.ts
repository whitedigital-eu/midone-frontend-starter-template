import useFormData from 'wd-frontend-shared/composables/useFormData'
import {
  TextareaField,
  TextField,
} from 'wd-frontend-shared/models/FormFields'
import { fillFormDataFrom } from 'wd-frontend-shared/helpers/Global'
import { User } from '../../Types/User'
import l from '../../Labels/Labels'
import UserRepository from '../../Repositories/UserRepository'

type UserFormData = {
  email: TextField
  firstName: TextField
  lastName: TextField
  phone: TextField
  notes: TextareaField
}

export default function useUserFormData(
  iri: User['@id'] | null,
) {
  const baseFormData: UserFormData = {
    email: new TextField('email', l('common', 'email')),
    firstName: new TextField('firstName', l('common', 'firstName')),
    lastName: new TextField('lastName', l('common', 'lastName')),
    phone: new TextField('phone', l('common', 'phone')),
    notes: new TextareaField('notes', 'Piezīmes'),
  }

  const prepareFormData = async (formData: UserFormData) => {
    if(!iri) return formData

    formData.email.readonly = true
    const user = await UserRepository.get(iri!)
    formData = fillFormDataFrom(formData, user)
    return formData
  }


  const formLayout: Array<Array<keyof UserFormData>> = [
    ['email', 'firstName', 'lastName', 'phone'],
    ['notes'],
  ]

  return {
    ...useFormData(
      baseFormData,
      prepareFormData
    ),
    formLayout,
  }
}
