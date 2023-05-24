import MethodFactory from './MethodFactory'

export default class FileRepository {
  public static get = MethodFactory.get('files')
  public static create = MethodFactory.create('files')
}
