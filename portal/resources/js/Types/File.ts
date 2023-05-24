import { CrudResource } from './Resource'
import { User } from './User'

export type File = CrudResource<'files'> & {
  owner: User['@id'] | User
  sourceUrl: string
  originalName: string
  size: number
  mimeType: string
}
