import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button } from '@components/UI-kit'
import icon_search from './assets/search.svg'
import { useDebouncedValue } from '@/utils/useDebouncedValue'
import { DEBOUNCE } from '@/utils/const'

const SearchStyled = styled.div`
    position: relative;

    input{
        // width: 652px;
        width: ${({width}) => width || '447'}px;
        height: 48px;
        box-sizing: border-box;
        font-family: 'Optima';
        font-size: 16px;
        font-weight: 700;
        border: 1px solid rgba(0,0,0,.2);
        padding: 0 16px;
        padding-left: 44px;
        background: url(${icon_search}) no-repeat;
        background-size: 16px 16px;
        background-position: 16px center;
        text-overflow: ellipsis;
        &::placeholder{
            color: rgba(0,0,0,.2);
        }

        &:focus{
            border: 1px solid rgba(0,0,0,.4);
            /* text-indent: 28px; */
        }
    }

    button{
        position: absolute;
        top: 0;
        right: 0;
    }
`

export default function Search ({ placeholder, value: defaultValue, onChange, width }) {
    const [isShowButton, setIsShowButton] = useState(false)
    const [search, setSearch] = useState(defaultValue || '')
    const handleChange = (e) => {
        const value = e.target.value && e.target.value.toLowerCase();
        setSearch(value);
    }

    const debounceFilter = useDebouncedValue(search, DEBOUNCE)

    useEffect(() => {
        onChange && onChange(debounceFilter)
        if (String(debounceFilter).trim().length === 0) {
            setIsShowButton(false)
        } else {
            setIsShowButton(true)
        }
        // eslint-disable-next-line
    }, [debounceFilter])


    return (
        <SearchStyled width={width}>
            <input
                type="text"
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={handleChange}
            />
            {isShowButton && <Button primary width='120px' height='48px'>
                Search
            </Button>}
        </SearchStyled>
    )
}
