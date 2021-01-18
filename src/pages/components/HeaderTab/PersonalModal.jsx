import React from 'react'
import { PerModalStyled } from './styled'
import { useHistory } from 'react-router-dom'

export default function PersonalModal({ show = false }) {
    const history = useHistory()

    const handelClickLi = (type) => {
        if (!type) return
        switch (type) {
            case 'kyc':
                return history.push('/kyc')
            default:
                return
        }
    }


    return (
        show && <PerModalStyled>
            <div className="account">
                <h5>John Doe</h5>
                <p>0x33a9b7ed8c71c69F...</p>
            </div>
            <ul>
                <li
                    onClick={() => { handelClickLi('kyc') }}
                >
                    <i className='kyc'></i>
                    <span>KYC</span>
                </li>

                <li>
                    <i className='pi'></i>
                    <span>Personal Info</span>
                </li>

                <li>
                    <i className='acs'></i>
                    <span>Apply Certified Sale</span>
                </li>
            </ul>
        </PerModalStyled>
    )
}
