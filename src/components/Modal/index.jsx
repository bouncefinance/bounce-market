import React, { useContext } from 'react'
import { myContext } from '../../redux'
import ConnectWallet from './ConnectWallet'

export function ModalBase() {
    const { state } = useContext(myContext)

    const renderModal = () => {
        if(!state.Show_Modal){
            return <></>
        }
        switch (state.Show_Modal.name) {
            case 'Connect_Wallect':
                return <ConnectWallet />


            default:
                return <></>
        }
    }

    return (
        <>
            {renderModal()}
        </>
    )
}