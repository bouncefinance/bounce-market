import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ErrorStatus } from './error_config'

const InputStyled = styled.div`
    margin-top: ${({ marginTop }) => { return marginTop }};

    .title{
        font-weight: 700;
        font-size: 13px;
        color: rgba(0,0,0,.6);
        margin-bottom: 8px;

        &.error{
            color:  #E43F29;
        }
    }

    input{
        width: ${({ width }) => { return width }};
        height:${({ height }) => { return height }};
        border: 1px solid rgba(0,0,0,.2);
        box-sizing: border-box;
        color: rgba(0,0,0,.8);
        font-weight: 500px;
        font-size: 16px;
        padding: 0 20px;

        &:hover{
            border: 1px solid rgba(0,0,0,.6);
        }

        &:focus{
            border: 1px solid rgba(0,0,0,.8);
            color: rgba(0,0,0,1);
        }

        &:disabled{
            border: 1px solid rgba(0,0,0,1);
            color: rgba(0,0,0,1);
            opacity: .2;
        }
        &.lockInput:disabled{
            border: 1px solid rgba(0,0,0,.2);
            color: rgba(0,0,0,.8);
            opacity: 1;
        }

        &.error{
            border: 1px solid #E43F29;
            color:  #E43F29;
        }

        
    }

    
    .number_input{
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
            }
        }


    .err_msg{
        color: #E43F29;
        font-size: 12px;
        line-height: 16px;
        margin-top: 4px;
    }
`

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
    lockInput
}) {
    const [error, setError] = useState(false)
    const [errMsg, setErrMsg] = useState(null)
    const [value, setValue] = useState(defaultValue || '')

    useEffect(() => {
        onValChange && onValChange(defaultValue)
        // eslint-disable-next-line
    }, [])

    const handelChange = (e) => {
        onChange && onChange(e)


        let val = e.target.value

        if (maxVal && parseFloat(val) > parseFloat(maxVal)) {
            val = maxVal
        } else if (minVal && parseFloat(val) < parseFloat(minVal)) {
            val = minVal
        }


        setValue(val)
        // console.log(val, minVal, maxVal)

        if (!onValChange) return

        // if (required && val === '') {
        //     return onValChange(ErrorStatus.required, val)
        // }

        // onValChange(null, val)
        onValChange(val)
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
                className={`number_input ${error && 'error'} ${lockInput && 'lockInput'}`}
                placeholder={placeholder}
                disabled={disabled || lockInput}
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
