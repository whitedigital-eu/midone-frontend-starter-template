import MethodFactory from './MethodFactory'

const S = 'classifiers' as const

export default class ClassifierRepository {
  public static list = MethodFactory.list(S)
  public static get = MethodFactory.get(S)
  public static create = MethodFactory.create(S)
  public static update = MethodFactory.update(S)
  public static delete = MethodFactory.delete(S)
  public static createOrUpdate = MethodFactory.createOrUpdate(S)
}
