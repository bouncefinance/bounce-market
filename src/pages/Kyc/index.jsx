import React from 'react'
import { KycStyled } from './styled'
import image_kyc from '../../assets/images/kyc.svg'
import { TextInput, Form, Button } from '../components/Table'

export default function Index() {
    return (
        <KycStyled>
            <div className="container">
                <div className="top">
                    <h3>KYC</h3>
                    <p>1 / 3</p>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img src={image_kyc} alt="image_kyc" />
                    </div>
                    <div className="right">
                        <Form title={'Basic Info'}>
                            <TextInput label='First Name' width='294px' />
                            <TextInput label='Middle Name (if applicable)' width='294px' placeholder='Enter middle name' />
                            <TextInput label='Last Name' />
                            <TextInput label='Date of Birth' />

                            <div className="btn_group">
                                <Button type='white' value='Cancel' width='164px'/>
                                <Button type='black' value='Next Step' width='164px'/>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </KycStyled>
    )
}
