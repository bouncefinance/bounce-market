import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ErrorStatus } from './error_config'

const TextAreaStyled = styled.div`
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

    .textarea{
        width: ${({ width }) => { return width || '620px' }};
        height: ${({ height }) => { return height || '80px' }};
        border: 1px solid rgba(0,0,0,.2);
        box-sizing: border-box;
        color: rgba(0,0,0,.8);
        font-weight: 500px;
        font-size: 16px;
        padding: 14px 20px;
        line-height: 19.54px;
        resize: none;

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
        min-height:16px;
        visibility: hidden;
    }
    .errorType{
        visibility: visible;
    }
`

export default function TextAreaInput({
    title,
    placeholder,
    disabled,
    onChange,
    defaultValue,
    onValChange,
    maxLength,
    required = false,
    width,
    height,
    marginTop = '20px',
    lockInput
}) {
    const [error, setError] = useState(false)
    const [errMsg, setErrMsg] = useState(null)

    useEffect(() => {
        onValChange && onValChange(defaultValue)
        // eslint-disable-next-line
    }, [])

    const handelChange = (e) => {
        onChange && onChange(e)

        if (!onValChange) return
        const val = e.target.value

        // if (required && val === '') {
        //     return onValChange(ErrorStatus.required, val)
        // }

        // return onValChange(null, val)
        return onValChange(val)
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
        <TextAreaStyled width={width} height={height} marginTop={marginTop}>
            <label>
                {title && <p className={`title ${error && 'error'} `}>{title}</p>}
                <textarea
                    className={`textarea ${error && 'error'} ${lockInput&&'lockInput'}`}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    disabled={disabled || lockInput}
                    onChange={handelChange}
                    onBlur={handelBlur}
                    onFocus={handelFocus}
                    required={required}
                    maxLength={maxLength}
                />
            </label>
            <p className={`${error && 'errorType'} ${'err_msg'}`}>{errMsg}</p>
        </TextAreaStyled>
    )
}
