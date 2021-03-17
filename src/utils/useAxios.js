import axios from 'axios'
const Host = 'https://account.bounce.finance:16000'

export default function useAxios() {
    return {
        get: (path, data, configs) => {
            const config = {
                headers: { "Content-Type": "multipart/form-data;boundary=" + new Date().getTime() },
                ...configs
            }
            return axios.post(Host + path, data, config)
        },

        post: (path, data, configs) => {
            const config = {
                headers: { "Content-Type": "multipart/form-data;boundary=" + new Date().getTime() },
                ...configs
            }
            return axios.post(Host + path, data, config)
        }
    }
}