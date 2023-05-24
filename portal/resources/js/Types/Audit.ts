import { CrudResource } from './Resource'
import { Primitive } from './Shared'

export type Audit = CrudResource<'audits'> & {
  category: string
  message: string
  userIdentifier: string
  ipAddress: string
  data?: Record<string, Primitive>
}
