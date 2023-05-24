import { Identity } from '../Types/Identity'
import baseAxios from '../Mixins/DataFetching'

export default class IdentityRepository {
  public static async getCurrentIdentity(): Promise<Identity> {
    return (await baseAxios.get('/api/users/current')).data
  }
}
