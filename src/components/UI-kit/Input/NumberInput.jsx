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

    

    .input_box{
        position: relative;
        .afterFix{
            position: absolute;
            height: 100%;
            line-height: 48px;
            top: 0;
            right: 20px;
            padding-left: 10px;
            border-left: 1px solid rgba(0,0,0,.2);
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
    onBlur,
    onValChange,
    required = false,
    width = '440px',
    height = '48px',
    marginTop = '20px',
    defaultValue,
    maxVal,
    minVal,
    lockInput,
    isInteger,
    afterFix
}) {
    const [error, setError] = useState(false)
    const [errMsg, setErrMsg] = useState(null)
    const [value, setValue] = useState(defaultValue || '')

    useEffect(() => {
        setValue(minVal)
        onValChange && onValChange(minVal)
        // eslint-disable-next-line
    }, [minVal])

    const handelChange = (e) => {
        onChange && onChange(e)
        let val = e.target.value
        setValue(val)
        if (!onValChange) return
        onValChange(val)
    }

    const handelBlur = (e) => {
        onBlur && onBlur(e)
        let val = e.target.value
        if (required && val === '') {
            setError(true)
            setErrMsg(ErrorStatus.required.tip)
        }

        if(val === ""){
            val = minVal;
        }
        if (isInteger) {
            val = parseInt(val)
        }

        if (maxVal && parseFloat(val) > parseFloat(maxVal)) {
            val = maxVal
        } else if (minVal && parseFloat(val) < parseFloat(minVal)) {
            val = minVal
        }
        setValue(val)
        if (!onValChange) return
        onValChange(val)
    }

    const handelFocus = () => {
        setError(false)
    }

    return (
        <InputStyled width={width} height={height} marginTop={marginTop}>
            {title && <p className={`title ${error && 'error'}`}>{title}</p>}
            <div className='input_box'>
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
                {afterFix && <p className='afterFix'>{afterFix}</p>}
            </div>
            {error && <p className='err_msg'>{errMsg}</p>}
        </InputStyled>
    )
}
