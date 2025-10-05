import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "./types";

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve) => {

    const { data = null, url, method = 'get',
       headers = {}, responseType } = config

    const request = new XMLHttpRequest()
  
    if (responseType) {
      request.responseType = responseType
    }
    //开启请求
    request.open(method.toUpperCase(), url, true)
    // 调用 open 方法 并传入 method url true 三个参数 
    // 并将 method 转换为大写并赋值给 method,url. async:true异步

    //监听请求状态变化
    request.onreadystatechange = function handleLoad () {
      // 调用 onreadystatechange 方法 并传入 handleLoad 函数 并赋值给 request 变量
      if (request.readyState !== 4) {
        // 没有收到正确的响应
        return
      }

      const responseHeaders = request.getAllResponseHeaders()
      const responseData = responseType !== 'text' 
      ? request.response : request.responseText

      const response : AxiosPromise = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)//将包含完整响应信息的对象作为 Promise 的结果返回
    }

    //处理请求头
    Object.keys(headers).forEach(name => {
      //如果data为空且属性名为'content-type'删除
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        //调用 setRequestHeader 方法 并传入 name headers[name] 两个参数
        //  并赋值给 request 变量
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data) //真正执行HTTP请求
  })
}



