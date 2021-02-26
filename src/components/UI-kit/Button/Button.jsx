import React from 'react'
import { ButtonStyled } from './styled'

export default function Button({
    style,
    value,
    size = 'norm',
    onClick,
    type = 'black',
    children,
    disabled
}) {
    return (
        <ButtonStyled
            style={style}
            onClick={onClick}
            size={size}
            className={`${type} ${disabled && 'disabled'}`}
            disabled={disabled}>
            {value}
            {children}
        </ButtonStyled >
    )
}
