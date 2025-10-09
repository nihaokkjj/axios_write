import { isPlainObject, deepMerge } from "../helpers/util";
import { AxiosRequestConfig } from "../types";

const strats = Object.create(null)

//默认合并
function defaultStart(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}
function fromVal2Start(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if(typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}
const stratKeysDeepMerge = ['headers']
stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Start
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2: AxiosRequestConfig): AxiosRequestConfig {
    if (!config2) config2 = {}

    const config = Object.create(null)

    //先添加自定义值, 在添加默认值
    for (let key in config2) {
      mergeField(key)
    }
    for (let key in config1) {
      if (!config2[key]) mergeField(key)
    }
    //合并
    function mergeField(key: string): void {
      //如果没有值, 则采用默认配置
      //当key == 'url', 'params', 'data'时, 为自定义配置
      const strat = strats[key] || defaultStart
      config[key] = strat(config1[key], config2![key])
    }

    return config
  }



