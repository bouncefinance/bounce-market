import React from 'react'
import styled from 'styled-components'

const StubInputStyled = styled.div`
    display: flex;
    height: 40px;
`

export default function StubInput() {
    return (
        <StubInputStyled>
            <input type="text" placeholder={'Amount'}/>
        </StubInputStyled>
    )
}
