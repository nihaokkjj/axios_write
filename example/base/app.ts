import { AxiosError } from '../../src/helpers/error'
import axios from '../../src/index'

setTimeout(() => {
  axios({
    method: 'get',
    url: '/base/get',
  }).then(res => {
    console.log(res)
  }).catch((e: AxiosError) => {
    console.log(e.message, '11error')
    console.log(e.config)
    console.log(e.request)
    console.log(e.code)
  })
}, 3000)

axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 1,
    b: 2
  }
}).then((res) => {
  console.log(res)
})

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json',
    "Accept": 'application/json, text/plain, */*'
  },
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(res)
})

const arr = new Int32Array([21, 31])

axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
})

const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
})

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

