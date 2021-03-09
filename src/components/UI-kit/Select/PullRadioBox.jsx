import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import icon_check_black from '../assets/check_black.svg'
import icon_check_white from '../assets/check_white.svg'
import icon_pull from '../assets/pull.svg'


const PullRadioBoxStyled = styled.div`
    cursor: pointer;
    position: relative;

    .title{
        font-weight: 700;
        font-size: 13px;
        color: rgba(0,0,0,.6);
        margin-bottom: 8px;
        margin-top: ${({ marginTop }) => { return marginTop || '24px' }};
    }

    .select{
        width: ${({ width }) => { return width || '262px' }};
        height: 48px;
        padding:0 20px;
        box-sizing: border-box;
        border: 1px solid rgba(0,0,0,.2);
        display: flex;
        justify-content: space-between;
        align-items: center;
        user-select: none;
        /* margin-top: 20px; */

        &>div{
            display: flex;
            font-size: 16px;
            color: rgba(0,0,0,.8);
            align-items: center;

            .prefix{
                margin-right: 6px;
                opacity: .4;
            }
        }

        &>img{
            transition: all .3s;
            &.up{
                transform:rotate(180deg);
            }

            &.down{
                transform:rotate(0deg);
            }
        }

        &:hover{
            border: 1px solid rgba(0,0,0,.6);
        }

        &.open{
            border: 1px solid rgba(0,0,0,.8);
        }

        &.disabled{
            border: 1px solid rgba(0,0,0,.5);
            color: #000;
            opacity: .4;
            &:hover{
                border: 1px solid rgba(0,0,0,.6);
            }
        }
    }

    ul.options{
        position: absolute;
        width: ${({ width }) => { return width || '262px' }};
        max-height: 220px;
        box-sizing: border-box;
        overflow-x: hidden;
        background: #FFFFFF;
        border: 1px solid #EAEAEA;
        box-sizing: border-box;
        box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.1);
        margin-top: 5px;
        z-index: 1;
        
        li{
            width: 100%;
            height: 42px;
            line-height: 42px;
            font-size: 16px;
            color: rgba(0,0,0,.8);
            padding: 0 42px;
            box-sizing: border-box;

            &:hover{
                background-color: #000;
                color: #FFFFFF;
            }
            

            &.check{
                background: url(${icon_check_black}) no-repeat;
                background-size: 13px;
                background-position: 16px center;

                &:hover{
                    color: #FFFFFF;
                    background: url(${icon_check_white}) no-repeat;
                    background-color: #000;
                    background-size: 13px;
                    background-position: 16px center;
                }
            }

        }
    }
`

export default function PullRadioBox({
    options, defaultValue, defaultItem, onChange,
    onValChange, disabled, prefix, style, width,
    marginTop, title }) {
    // 这个组件的option 一定要传value属性
    const [open, setOpen] = useState(false)
    const [checkVal, setCheckVal] = useState(defaultValue || options[0].value)
    const [checkItem, setCheckItem] = useState(defaultItem || options[0])

    useEffect(() => {
        onChange && onChange(checkItem)
        onValChange && onValChange(checkVal)
        // eslint-disable-next-line
    }, [checkVal])

    return (
        <PullRadioBoxStyled style={style} width={width} marginTop={marginTop}>
            {title && <p className={`title`}>{title}</p>}
            <div className={`select ${!disabled && open && 'open'} ${disabled && 'disabled'}`} onClick={() => {
                if (disabled) return
                setOpen(!open)
            }}>
                <div>
                    {prefix && <span className='prefix'>{prefix}</span>}
                    <p className='value'>{checkVal}</p>
                </div>
                <img src={icon_pull} className={open ? 'up' : 'down'} alt="" />
            </div>

            {
                !disabled && open && <ul className="options">
                    {options.map((item, index) => {
                        return <li
                            key={item.value + '_' + index}
                            className={`${item.value === checkVal ? 'check' : ''}`}
                            onClick={() => {
                                setCheckVal(item.value)
                                setCheckItem(item)
                                setOpen(false)
                            }}
                        >
                            {item.value}
                        </li>
                    })}
                </ul>
            }
        </PullRadioBoxStyled>
    )
}
