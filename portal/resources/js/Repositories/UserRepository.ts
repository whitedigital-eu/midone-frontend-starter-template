import MethodFactory from './MethodFactory'

const S = 'users' as const

export default class UserRepository {
  public static list = MethodFactory.list(S)
  public static get = MethodFactory.get(S)
  public static create = MethodFactory.create(S)
  public static update = MethodFactory.update(S)
  public static createOrUpdate = MethodFactory.createOrUpdate(S)
}
