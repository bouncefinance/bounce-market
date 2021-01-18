import React from 'react'
import { InputStyled } from './styled'

export const TextInput = ({ defaultVal, setVal, placeholder, width, marginTop, label }) => {
    return (
        <InputStyled
            width={width}
            marginTop={marginTop}
        >
            {label && <p>{label}</p>}
            <input
                type='text'
                value={defaultVal}
                placeholder={placeholder}
                onChange={(e) => {
                    const val = String(e.target.value).trim()
                    if (val !== '' && setVal) {
                        setVal(e)
                    }
                }} />
        </InputStyled>
    )
}
