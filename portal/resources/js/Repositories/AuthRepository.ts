import { AxiosResponse } from 'axios'
import { User } from '../Types/User'
import baseAxios from '../Mixins/DataFetching'

export default class AuthRepository {
  public static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<void>> {
    return baseAxios.post('/api/users/login', { email, password })
  }

  public static async logout(userId: User['id']): Promise<void> {
    return baseAxios.post(
      '/api/users/logout',
      { userId: userId },
      { headers: { 'Content-Type': 'application/json' } }
    )
  }
}
