import React from 'react'
import { FormStyled } from './styled'

export default function Form({ title, width, children }) {
    return (
        <FormStyled width={width}>
            {title && <h5>{title}</h5>}

            <div className="children">
                {children}
            </div>
        </FormStyled>
    )
}
