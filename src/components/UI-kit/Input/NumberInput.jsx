import React, { useState } from 'react'
import { InputStyled } from './styled'
import { ErrorStatus } from './error_config'

export default function NumberInput({
    title,
    placeholder,
    disabled,
    onChange,
    onValChange,
    required = false,
    width = '440px',
    height = '48px',
    marginTop = '20px',
    defaultValue,
    maxVal,
    minVal,
}) {
    const [error, setError] = useState(false)
    const [errMsg, setErrMsg] = useState(null)
    const [value, setValue] = useState(defaultValue || '')

    const handelChange = (e) => {
        onChange && onChange(e) 


        let val = e.target.value

        if (maxVal && parseFloat(val) > parseFloat(maxVal)) {
            val = maxVal
        } else if (minVal && parseFloat(val) < parseFloat(minVal)) {
            val = minVal
        }


        setValue(val)
        console.log(val, minVal, maxVal)

        if (!onValChange) return

        if (required && val === '') {
            return onValChange(ErrorStatus.required, val)
        }

        onValChange(null, val)
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
                type='number'
                className={`number_input ${error && 'error'}`}
                placeholder={placeholder}
                disabled={disabled}
                onChange={handelChange}
                onBlur={handelBlur}
                onFocus={handelFocus}
                required={required}
                value={value}
            />
            {error && <p className='err_msg'>{errMsg}</p>}
        </InputStyled>
    )
}
