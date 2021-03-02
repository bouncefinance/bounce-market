import React, { useState } from 'react'
import { InputStyled } from './styled'
import { ErrorStatus } from './error_config'

export default function TextInput({
    title,
    placeholder,
    disabled,
    onChange,
    defaultValue,
    onValChange,
    maxLength,
    required = false,
    width = '440px',
    height = '48px',
    marginTop = '20px'
}) {
    const [error, setError] = useState(false)
    const [errMsg, setErrMsg] = useState(null)

    const handelChange = (e) => {
        onChange && onChange(e)

        if (!onValChange) return
        const val = e.target.value

        if (required && val === '') {
            return onValChange(ErrorStatus.required, val)
        }

        return onValChange(null, val)
    }

    const handelBlur = (e) => {
        const val = e.target.value
        if (required && val === '') {
            setError(true)
            setErrMsg(ErrorStatus.required.tip)
        }
    }

    const handelFocus = () => {
        setError(false)
    }

    return (
        <InputStyled width={width} height={height} marginTop={marginTop}>
            {title && <p className={`title ${error && 'error'}`}>{title}</p>}
            <input
                type='text'
                className={`${error && 'error'}`}
                defaultValue={defaultValue}
                placeholder={placeholder}
                disabled={disabled}
                onChange={handelChange}
                onBlur={handelBlur}
                onFocus={handelFocus}
                required={required}
                maxLength={maxLength}
            />
            {error && <p className='err_msg'>{errMsg}</p>}
        </InputStyled>
    )
}
