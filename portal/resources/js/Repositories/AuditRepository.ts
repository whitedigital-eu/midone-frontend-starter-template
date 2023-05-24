import MethodFactory from './MethodFactory'

const S = 'audits' as const

export default {
  list: MethodFactory.list(S),
  get: MethodFactory.get(S)
}

