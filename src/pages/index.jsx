import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { LayoutStyled } from './styled'
import HeaderTab from './components/HeaderTab'
import ModalGroup from './components/Modal'
import Kyc from './Kyc'



export default function Index() {

    return (
        <LayoutStyled>
            <div className="mainView">
                <HeaderTab />
                <Switch>
                    <Route path='/kyc' exact component={Kyc} />
                </Switch>
            </div>

            <ModalGroup />
        </LayoutStyled>
    )
}
