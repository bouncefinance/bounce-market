import axios from 'axios'
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
// import { useUserInfo } from '../pages/Myprofile/useUserInfo'
import { useEffect, useContext } from 'react';
import { myContext } from '@/redux/index.js';
import { useHistory } from 'react-router-dom'
import useWrapperIntl from '@/locales/useWrapperIntl'

const produceHost = ['127.0.0.1', 'marke.bounce.finance', 'cnmarket.bounce.finance', 'fangible']
const hostname = window.location.hostname
const isProDev = produceHost.some(hostItem => {
    return hostname.includes(hostItem) ? true : false
})

const getBaseUrl = (chainID) => {
    chainID = parseInt(chainID)
    switch (chainID) {
        case 56:
            if (!isProDev) return 'https://market-test.bounce.finance'
            return 'https://bounce-market.bounce.finance'
        case 128:
            return 'https://heco-api.bounce.finance'

        default:
            return 'https://bounce-market.bounce.finance'
    }
}

const currentChainId = window.localStorage.getItem('currentChainId')
const Base_URL = getBaseUrl(currentChainId)


const signStr = 'Welcome to Bounce!'
let isRequestLock = false

export default function useAxios() {
    const { account, library, active } = useWeb3React();
    const { dispatch } = useContext(myContext);
    const history = useHistory();
    const { wrapperIntl } = useWrapperIntl()

    useEffect(() => {
        if (!account || isRequestLock) return
        isRequestLock = true
        initSign()
        // eslint-disable-next-line
    }, [account])

    const initSign = async () => {
        /* console.log("initSign", initSign) */

        // 判断授权是否过期
        const res = await sign_Axios_Post('/api/v2/main/auth/getaccount', { accountaddress: account })
        if (res.status === 200 && res.data.code === -1) {
            // 重新授权
            const token = await getNewToken();
            const JWT_TOKEN_V2 = JSON.parse(window.localStorage.getItem('JWT_TOKEN_V2')) || {}
            JWT_TOKEN_V2[account] = token
            window.localStorage.setItem('JWT_TOKEN_V2', JSON.stringify(JWT_TOKEN_V2))
            dispatch({ type: 'Token', authToken: token });
            dispatch({ type: 'Modal_Message', showMessageModal: false, modelType: 'error', modelMessage: "", modelUrlMessage: "", canClose: false });
            // window.location.reload();
            history.push("/Home")
        }
    }

    const getNewToken = async () => {
        /* console.log("getNewToken", getNewToken) */

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

    /** 带有签名请求的 Axios post */
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
        if (res.status === 200 && res.data.code === -1) {
            if (active) {
                dispatch({
                    type: 'Modal_Message',
                    showMessageModal: true,
                    modelType: 'error',
                    modelMessage: wrapperIntl("Re-sign"),
                    modelTimer: 24 * 60 * 60 * 1000,
                    canClose: true,
                });
            }
            /* dispatch({
                type: 'Modal_Message',
                showMessageModal: true,
                modelType: 'error',
                modelMessage: wrapperIntl("Code-1"),
                modelTimer: 24 * 60 * 60 * 1000,
            }); */
            // history.push("/Home")
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
        }
        /* else if (res.status === 200 && res.data.code === -1) */

        return res
    }

    const Axios_Post = async (path, params, option = {}) => {
        const res = await axios.post(Base_URL + path, params, option)
        return res
    }

    /** 带有签名请求的 Axios get */
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
