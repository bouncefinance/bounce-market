import { useContext } from 'react'
import { myContext } from '../../../redux'

export default function Index() {
    const { state } = useContext(myContext)

    const renderModal = () => {
        const { showModal } = state

        switch (showModal) {
            case 'KYC':
                console.log('kYc')
                return <></>

            default:
                return <></>
        }
    }

    return (state.showModal &&
        
        renderModal()
    )
}
