import { AxiosRequestConfig } from 'axios/index'
import baseAxios from '../Mixins/DataFetching'

const S = 'heartbeat' as const

export default class HeartbeatRepository {
  public static get = async (config?: AxiosRequestConfig) => {
    return (await baseAxios.get(`/api/${S}`, config)).data
  }
}
