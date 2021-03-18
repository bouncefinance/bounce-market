import axios from 'axios'
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
const Base_URL = 'http://3.0.175.182'

const signStr = 'Welcome to Bounce!'

export default function useAxios() {

    const { account, library } = useWeb3React()

    const getNewToken = async () => {
        const web3 = new Web3(library.provider);
        const sign = await web3.eth.personal.sign(signStr, account)

        const params = {
            "accountaddress": account,
            "message": signStr,
            "signature": sign
        }

        const res_getSignToken = await axios.post(Base_URL + '/api/v2/main/jwtauth', params)
        if (res_getSignToken.status === 200 && res_getSignToken.data.code === 200) {
            const { token } = res_getSignToken.data.data
            window.localStorage.setItem('JWT_TOKEN', token)
            return token
        } else {
            return null
        }
    }

    const sign_Axios_Post = async (path, params, option = {}) => {
        let token = window.localStorage.getItem('JWT_TOKEN')
        if (!token) {
            token = await getNewToken()
        }

        let config = {
            headers: {
                token: token,
                "Content-Type": "application/x-www-from-urlencoded"
            },
            ...option
        }

        let res = await axios.post(Base_URL + path, params, config)
        if (res.status === 200 && res.data.code === -1) {
            // token 无效过期
            config = {
                headers: {
                    token: await getNewToken(),
                    "Content-Type": "application/x-www-from-urlencoded"
                },
                ...option
            }
            res = await axios.post(Base_URL + path, params, config)
        }

        return res
    }

    const Axios_Post = async (path, params, option = {}) => {
        const res = await axios.post(Base_URL + path, params, option)
        return res
    }

    const sign_Axios_Get = async (path, params) => {
        let token = window.localStorage.getItem('JWT_TOKEN')
        if (!token) {
            token = await getNewToken()
        }

        let headers = {
            token: token
        }
        let res = await axios.get(Base_URL + path, { params, headers })
        if (res.status === 200 && res.data.code === -1) {
            // token 无效过期
            token = await getNewToken()
            headers = {
                token: token
            }
            res = await axios.get(Base_URL + path, { params, headers })
        }

        return res
    }

    const Axios_Get = async (path, params, option = {}) => {
        const config = {
            headers: { "Content-Type": "application/x-www-from-urlencoded" },
            ...option
        }
        return await axios.post(Base_URL + path, params, config)
    }

    return {

        sign_Axios: {
            get: sign_Axios_Get,
            post: sign_Axios_Post
        },

        Axios: {
            get: Axios_Get,
            post: Axios_Post
        }
    }
}
