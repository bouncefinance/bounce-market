import { myContext } from '@/redux'
import { useContext } from 'react'

export default function useTransferModal() {
    const { dispatch } = useContext(myContext)

    const showTransferByStatus = (status) => {
        dispatch({
            type: 'TransferModal',
            value: status
        })
    }


    return {showTransferByStatus}
}
