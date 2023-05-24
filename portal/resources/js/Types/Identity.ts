import { CrudResource } from './Resource'
import { User } from './User'

export type Identity = CrudResource<'identities'> & {
  userId: User['id']
  userEmail: User['email']
  user: User['@id']
  isImpersonated: boolean
  impersonator: User['@id']
}
