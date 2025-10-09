import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "../types"
import xhr from "./xhr"
import { buildURL } from "../helpers/url"
import {flatenHeaders} from '../helpers/headers'
import transform from "./transform"


export default function dispatchResquest
(config : AxiosRequestConfig): AxiosPromise {

  throwIfCancellationRequested(config) //如果取消, 则不调用
  processConfig(config) //准备配置
  return xhr(config).then(res => { //发送请求
    return transformResponseData(res) //等待并处理响应
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flatenHeaders(config.headers, config.method!) //处理headers扁平化
}

function transformURL(config: AxiosRequestConfig): string {
  const {url, params} = config
  return buildURL(url!, params)
  //url不为空
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function throwIfCancellationRequested
 (config: AxiosRequestConfig): void {
  if (config.cancelToken) { //如果被调用了, 则不再进行
    config.cancelToken.throwIfRequested()
  }
}