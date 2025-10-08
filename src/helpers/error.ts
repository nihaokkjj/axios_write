import { AxiosRequestConfig, AxiosResponse } from "../types"

export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    //调用 super() 后，this 实例的原型可能仍然指向父类 Error.prototype
    Object.setPrototypeOf(this, AxiosError.prototype)
    //将 AxiosError 实例的 原型（即其内部的 [[Prototype]] 属性，
    // 通过 __proto__ 访问）设置为 AxiosError.prototype。
    //确保 AxiosError 实例的 instanceof 检查能正常工作
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse 
) {
  const error = 
  new AxiosError(message, config, code, request, response)
  return error
}