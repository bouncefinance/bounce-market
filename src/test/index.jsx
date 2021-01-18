import React, { useContext } from 'react'
import { useActiveWeb3React } from '../web3'

import { myContext } from '../redux'

export default function Index() {
    const content = useActiveWeb3React()
    const { state, dispatch } = useContext(myContext)

    // 连接matemask
    const handelClickConnect = () => {
        window.ethereum.request({
            method: 'eth_requestAccounts'
        }).then((account) => {
            alert('已连接')
        }).catch((_err) => {
            console.log('你取消了连接')
        })
    }

    return (
        <div>
            <button onClick={() => {
                console.log(content)
            }}>Test</button>

            <button onClick={() => {
                console.log(state, dispatch)
            }}>reducer</button>

            <button onClick={() => {
                handelClickConnect()
            }}>连接钱包</button>
        </div>
    )
}
