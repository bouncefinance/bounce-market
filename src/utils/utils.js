import Axios from "axios";
import { AXIOS_DEFAULT, AXIOS_URL_MATCH_ARRAY } from "./const";

export const getEllipsisAddress = (address) => {
  if(!address) return '--'
  return address.substring(0, 4) + '...' + address.slice(-4);
}


/**
 * module Url Replace
 * @param {AxiosRequestConfig} config 
 * @param {{key: string; value: string}[]} keyValues 
 * @returns 
 */
const moduleUrlReplace = (config, keyValues) => {
    for(const item of keyValues){
        if(config.url && config.url.substr(0, item.key.length) === item.key){
            config.url = item.value + config.url.substring(item.key.length)
            break
        }
    }
    return config
}
const id = _ => _
export const InitAxios = () => {
  Axios.defaults.baseURL =  AXIOS_DEFAULT
  Axios.interceptors.request.use((config) => {
    config = moduleUrlReplace(config, AXIOS_URL_MATCH_ARRAY)
      return config
  }, (error) => {
      return Promise.reject(error)
  })
  Axios.interceptors.response.use(id)
}

// export const getMetadata = (json) => {
//   try {
//     return json ? JSON.parse(json).miniImg : {miniImg: ''}
//   } catch (error) {
//     return { miniImg: ''}
//   }
// }

export function throttle (func, ms) {
  console.log('ms', ms)
  let timer = null;

  return function () {
    let context = this;
    let args = arguments;
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(context, args);
        timer = null;
      }, ms)
    }
  }
}

/** KMP 匹配字符串算法
 *  常用于搜索场景
 * isLike 模糊匹配
 */
export function KMPStringMatch (source, target, isLike = false) {
    if (isLike) {
      source = source.toLowerCase();
      target = target.toLowerCase();
    }
    let m = source.length, n = target.length;
    if (!n) return 0; //无匹配字符
    let next = KMPProcess(target);
    for (let i = 0, j = 0; i < m;) {
      if (source[i] === target[j]) {
        i++;
        j++;
      }
      if (j === n) return i - j; //全匹配
      if (source[i] !== target[j]) {
       if (j > 0) {
         j = next[j - 1];
       } else { // i 右移一位，重新开始匹配字符
         i++;
       }
      }
    }
    return -1;
}

/** 对 target字符串 进行向量初始化 */
const KMPProcess = (target) => {
    let x = 0;
    let y = 0;
    let next = new Array(target.length).fill(0);
    while (x < target.length) {
        if (target[x] === target[y]) {
          y++;
          next[x] = y;
          x++;
        } else if (y > 0) {
          y = next[y - 1];
        } else {
          next[x] = 0;
          x++;
        }
    }
    return next;
}

/** 指数计数法 */
export function toNonExponential(num) {
  var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
  return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
}