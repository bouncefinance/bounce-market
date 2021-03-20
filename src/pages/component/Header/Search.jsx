import React from 'react'
import styled from 'styled-components'
import icon_search from './assets/search.svg'

const SearchStyled = styled.input`
    width: 300px;
    height: 36px;
    margin-left: 60px;
    box-sizing: border-box;
    font-family: 'Optima';
    font-size: 13px;
    font-weight: 700;
    border: 1px solid rgba(0,0,0,.2);
    padding: 0 16px;
    padding-left: 44px;
    background: url(${icon_search}) no-repeat;
    background-size: 16px 16px;
    background-position: 16px center;
    /* text-indent: 28px; */
    text-overflow: ellipsis;
    &::placeholder{
        color: rgba(0,0,0,.2);
    }

    &:focus{
        border: 1px solid rgba(0,0,0,.4);
        /* text-indent: 28px; */
    }
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
