import { GuidCrudResource } from './Resource'
import { Modify, NotNullableOptional, NullableOptional } from './Shared'

export type UserPost = NullableOptional<{
  email: string
  firstName: string
  lastName: string
  phone: string
  notes: string
  nr: string
}>

export type User = GuidCrudResource<'users'> &
  Modify<
    NotNullableOptional<UserPost>,
    {
      // cannot be undefined
      email: string
      firstName: string
      lastName: string
    }
  >
