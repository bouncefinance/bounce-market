import React from 'react'
import { ButtonStyled } from './styled'

export const Button = ({ name, type, value, width, callback }) => {
    return (
        <ButtonStyled
            className={type === 'white' ? 'white' : type === 'black' ? 'black' : 'default'}
            width={width}
            onClick={() => { callback && callback() }}
        >
            {value}
        </ButtonStyled>
    )
}
