import React from 'react'
import styled from 'styled-components'

const StubInputStyled = styled.div`
    display: flex;
    height: 40px;
`

export default function StubInput() {
    return (
        <StubInputStyled>
            <p>Amount</p>
            <input type="text" placeholder={'Amount'}/>
        </StubInputStyled>
    )
}
