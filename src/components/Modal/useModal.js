import { useContext } from 'react'
import { myContext } from '../../redux'

export default function useModal() {
    const { dispatch } = useContext(myContext)

    const connectWallect = () => {
        return dispatch({
            type: 'Show_Modal',
            value: {
                name: 'Connect_Wallect'
            }
        })
    }

    return {
        connectWallect
    }
}
