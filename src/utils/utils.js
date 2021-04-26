import Axios from "axios";
import { AXIOS_DEFAULT, AXIOS_URL_MATCH_ARRAY } from "./const";

export const getEllipsisAddress = (address) => {
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