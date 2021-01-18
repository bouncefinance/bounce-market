import React, { useContext } from 'react'
import { useActiveWeb3React } from '../web3'

import { myContext } from '../redux'

export default function Index() {
    const content = useActiveWeb3React()
    const { state, dispatch } = useContext(myContext)

    return (
        <div>
            <button onClick={() => {
                console.log(content)
            }}>Test</button>

            <button onClick={() => {
                console.log(state, dispatch)
            }}>reducer</button>
        </div>
    )
}
