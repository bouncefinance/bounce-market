import useAxios from '@/utils/useAxios'
import { useState, useEffect } from 'react'

export function useUserInfo() {
    const [userExisted, setUserExisted] = useState(false)
    const [userInfo, setUserInfo] = useState({})
    const { sign_Axios } = useAxios()

    const getUserInfo = async () => {
        try {
            const res = await sign_Axios.post('/api/v2/main/auth/getaccount')
            if (res.data.code === 1) {
                setUserExisted(true)
                setUserInfo(res.data.data)
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
        sign_Axios.post(requireUrl, params).then(res => {
            console.log(res)
            if (res.status === 200 && res.data.code === 1) {
                alert('信息上传更新成功')
            }else{
                alert('信息上传更新成功')
            }
        }).catch(()=>{
            alert('服务器故障，请稍后重试')
        })
        return 500
    }


    useEffect(() => {
        getUserInfo()
        // eslint-disable-next-line
    }, [])

    return { userExisted, userInfo, updateUserInfo }
}
