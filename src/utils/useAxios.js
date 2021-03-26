import axios from 'axios'
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
// import { useUserInfo } from '../pages/Myprofile/useUserInfo'
import { useEffect,useContext } from 'react';
import { myContext } from '@/redux/index.js';
const host = window.location.host
const Base_URL = host === 'localhost:8888' ? 'http://market-test.bounce.finance:11000' : 'https://market-test.bounce.finance'

const signStr = 'Welcome to Bounce!'
let isRequestLock = false

export default function useAxios() {
    const { account, library } = useWeb3React();
    const {dispatch} = useContext(myContext);
    // const { getUserInfo } = useUserInfo()
    useEffect(() => {
        if (!account || isRequestLock) return
        isRequestLock = true
        initSign()
        // eslint-disable-next-line
    }, [account])

    const initSign = async () => {
        // 判断授权是否过期
        const res = await sign_Axios_Post('/api/v2/main/auth/getaccount', { accountaddress: account })
        if (res.status === 200 && res.data.code === -1) {
            // 重新授权
            const token = await getNewToken();
            const JWT_TOKEN_V2 = JSON.parse(window.localStorage.getItem('JWT_TOKEN_V2')) || {}
            JWT_TOKEN_V2[account] = token
            window.localStorage.setItem('JWT_TOKEN_V2', JSON.stringify(JWT_TOKEN_V2))
            dispatch({type: 'Token', authToken: token});
        }
    }

    const getNewToken = async () => {
        // console.log(isRequestLock)
        const web3 = new Web3(library.provider);
        const sign = await web3.eth.personal.sign(signStr, account)

        const params = {
            "accountaddress": account,
            "message": signStr,
            "signature": sign
        }

        const res_getSignToken = await axios.post(Base_URL + '/api/v2/main/jwtauth', params)
        // isRequestLock = false
        if (res_getSignToken.status === 200 && res_getSignToken.data.code === 200) {
            const { token } = res_getSignToken.data.data
            return token
        } else {
            return null
        }
    }

    const sign_Axios_Post = async (path, params, option = {
        appendAccount: true,    // 是否给每个参数追加 account
        config: {}
    }) => {

        if (option.appendAccount) {
            params = { accountaddress: account, ...params }
        }
        const tokenObj = JSON.parse(window.localStorage.getItem('JWT_TOKEN_V2')) || {}
        const token = tokenObj[account]

        // if (!token) {
        //     token = await getNewToken()
        // }

        let config = {
            headers: {
                token: token,
                "Content-Type": "application/x-www-from-urlencoded"
            },
            ...option.config
        }
        let res = await axios.post(Base_URL + path, params, config)
        // if (res.status === 200 && res.data.code === -1) {
            // token 无效过期
            // return alert('授权失效，请刷新页面，重新授权签名')
            // config = {
            //     headers: {
            //         token: await getNewToken(),
            //         "Content-Type": "application/x-www-from-urlencoded"
            //     },
            //     ...option.config
            // }
            // res = await axios.post(Base_URL + path, params, config)
        // }

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
        },
        axios
    }
}
