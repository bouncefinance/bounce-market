import React, { useState } from 'react'
import { HeaderTabStyled } from './styled'
import logo from '../../../assets/logo/logo.svg'
import { headerMenu } from './config'
import { useHistory } from 'react-router-dom'
import PersonalModal from './PersonalModal'

export default function Index() {
    const history = useHistory()
    const [curTab, setCurTab] = useState(history.location.pathname)
    const [isPerModal, setIsPerModal] = useState(false)  // show personal modal

    return (
        <HeaderTabStyled>
            <div className="container">
                <div className="left">
                    <img src={logo} alt="bounce logo" />
                </div>
                <div className="right">
                    <ul>
                        {headerMenu.map((item, index) => {
                            return <li
                                key={index}
                                className={curTab === item.route ? 'active' : ''}
                                onClick={() => {
                                    history.push(item.route)
                                    setCurTab(item.route)
                                }}>
                                <h5>{item.name}</h5>
                            </li>
                        })}
                    </ul>

                    <div
                        className="personal"
                        onClick={() => { setIsPerModal(!isPerModal) }}
                    ></div>
                </div>
                <PersonalModal show={isPerModal} />
            </div>
        </HeaderTabStyled>
    )
}
