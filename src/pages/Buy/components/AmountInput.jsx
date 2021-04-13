import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
/* import { ErrorStatus } from './error_config' */
import { useActiveWeb3React } from "@/web3";

import useWrapperIntl from '@/locales/useWrapperIntl'

import icon_BNB from '@assets/images/wallet/icon_BNB.svg'
import icon_ETH_new from '@assets/images/wallet/icon_ETH_new.svg'

const InputStyled = styled.div`
    margin-top: ${({ marginTop }) => { return marginTop }};

    .title{
        grid-area: title;
        font-weight: 700;
        font-size: 13px;
        color: rgba(0,0,0,.6);
        margin-bottom: 8px;

        &.error{
            color:  #E43F29;
        }
    }

    

    .input_box{
        /* display: grid;
        grid-template-columns: 1fr max-content;
        grid-template-areas: "input afterFix"; */

        position: relative;

        input{
            /* grid-area: input; */

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

        .USD_Price {
            position: absolute;
            height: 100%;
            line-height: 68px;
            top: 0px;
            right: 100px;
        }

        .afterFix{
            /* grid-area: afterFix; */
            display: flex;
            align-items: center;
            position: absolute;
            /* height: 100%; */
            height: 44px;
            line-height: 68px;
            top: 12px;
            right: 10px;
            padding-left: 10px;
            border-left: 1px solid rgba(0,0,0,.2);

            img {
                width: 32px;
                height: 32px;
                margin-right: 5px;
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

export default function AmountInput({
    title,
    placeholder,
    disabled,
    onChange,
    onBlur,
    onValChange,
    required = false,
    width = '440px',
    height = '48px',
    marginTop,
    defaultValue,
    maxVal,
    minVal,
    lockInput,
    isInteger,
    afterFix,
    USD_Price,
}) {
    const { chainId } = useActiveWeb3React()
    const [error, setError] = useState(false)
    const [errMsg, setErrMsg] = useState(null)
    const [value, setValue] = useState(defaultValue || '')
    const { wrapperIntl } = useWrapperIntl()

    useEffect(() => {
        setValue(minVal)
        onValChange && onValChange(minVal)
        /* console.log("minVal", minVal) */
        // eslint-disable-next-line
    }, [minVal])

    useEffect(() => {
        if (!defaultValue) return
        setValue(defaultValue)
        onValChange(defaultValue)
        // eslint-disable-next-line
    }, [defaultValue])

    const handelChange = (e) => {
        onChange && onChange(e)
        let val = e.target.value

        if (required && val === '') {
            setError(true)
            /* setErrMsg(ErrorStatus.required.tip) */
            setErrMsg(wrapperIntl("ErrorMsg.required"));
        }
        // if (val === "") {
        //     val = minVal;
        // }
        // if (isInteger) {
        //     val = parseInt(val)
        // }
        // if (maxVal && parseFloat(val) > parseFloat(maxVal)) {
        //     val = maxVal
        // } else if (minVal && parseFloat(val) < parseFloat(minVal)) {
        //     val = minVal
        // }

        // val ? 
        setValue(val) 
        // : setValue(minVal)
        if (!onValChange) return
        onValChange(val)
    }

    const handelBlur = (e) => {
        onBlur && onBlur(e)
        let val = e.target.value
        if (required && val === '') {
            setError(true)
            /* setErrMsg(ErrorStatus.required.tip) */
            setErrMsg(wrapperIntl("ErrorMsg.required"));
        }

        if (val === "") {
            val = minVal||defaultValue;
        }
        if (isInteger) {
            val = parseInt(val)
        }

        if (maxVal && parseFloat(val) > parseFloat(maxVal)) {
            val = maxVal
        } else if (minVal && parseFloat(val) < parseFloat(minVal)) {
            val = minVal
        }else if(defaultValue && parseFloat(val) < parseFloat(defaultValue)){
            val = defaultValue
        }
        val && setValue(val)
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
                    value={value || ''}
                />
                {value !== '' && USD_Price && <span className="USD_Price">{USD_Price}</span>}
                {
                    afterFix
                    &&
                    <p className='afterFix'>
                        <img src={chainId === 56 ? icon_BNB : icon_ETH_new} alt="" />
                        {afterFix}
                    </p>

                }
            </div>
            {error && <p className='err_msg'>{errMsg}</p>}
        </InputStyled>
    )
}
