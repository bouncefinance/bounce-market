import { myContext } from '@/redux'
import useAxios from '@/utils/useAxios'
import { useActiveWeb3React } from '@/web3'
import { useState, useEffect, useContext } from 'react'

export function useUserInfo() {
    const {state,dispatch} = useContext(myContext);
    const [userExisted, setUserExisted] = useState(false)
    const [userInfo, setUserInfo] = useState({})
    const { sign_Axios } = useAxios()
    const { account } = useActiveWeb3React()

    const getUserInfo = async () => {
        try {
            const res = await sign_Axios.post('/api/v2/main/auth/getaccount', { accountaddress: account })
            if (res.data.code === 1) {
                setUserExisted(true)
                setUserInfo(res.data.data)
                // 在redux 存在储信息
                dispatch({
                    type: 'UserInfo',
                    userInfo: res.data.data
                })
            } else {
                setUserExisted(false)
            }
        } catch (error) {
            console.log('API: /api/v2/main/auth/getaccount', error)
        }
    }

    const updateUserInfo = async (params) => {
        let requireUrl = '/api/v2/main/auth/addaccount'
        if (userExisted) {
            requireUrl = '/api/v2/main/auth/updateaccount'
            delete params.accountaddress
        }
        return await sign_Axios.post(requireUrl, params).then(res => {
            if (res.status === 200 && res.data.code === 1) {
                dispatch({type: 'Modal_Message', showMessageModal: true,modelType:'success',modelMessage:"信息上传更新成功"});
            }else{
                dispatch({type: 'Modal_Message', showMessageModal: true,modelType:'success',modelMessage:"信息上传更新成功"});
            }
            getUserInfo();
            return res;
        }).catch(()=>{
            dispatch({type: 'Modal_Message', showMessageModal: true,modelType:'error',modelMessage:"Only Supports JPG, PNG, JPEG2000"});
        })
    }


    useEffect(() => {
        if (!account) return
        getUserInfo()
        // eslint-disable-next-line
    }, [state.authToken,account])

    return { userExisted, userInfo, updateUserInfo,getUserInfo }
}
