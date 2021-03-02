import React from 'react'
import styled from 'styled-components'

const SearchStyled = styled.input`
    width: 320px;
    height: 36px;
    margin-left: 84px;
    box-sizing: border-box;
    border: 1px solid rgba(0,0,0,.2);
`

export default function Search({ placeholder, value, onChange }) {
    return (
        <SearchStyled
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
}
