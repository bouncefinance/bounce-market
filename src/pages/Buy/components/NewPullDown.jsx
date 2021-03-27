import React, { useState } from 'react'
import styled from 'styled-components'
import icon_pull from '@assets/images/icon/pull.svg'

const NewPullDownStyled = styled.div`
    width: 540px;
    border-top: 1px solid rgba(0,0,0,.1);
    padding-top: 12px;

    .title{
        display: flex;
        justify-content: space-between;
        p{
            color: rgba(31,25,27,1);
            font-size: 12px;
        }
    }
`

export default function NewPullDown({ title, open, children }) {
    const [isPull, setIsPull] = useState(open)

    return (
        <NewPullDownStyled>
            <div className="title" onClick={() => { setIsPull(!isPull) }}>
                <p>{title}</p>
                <img src={icon_pull} alt="" />
            </div>

            {children}
        </NewPullDownStyled>
    )
}
