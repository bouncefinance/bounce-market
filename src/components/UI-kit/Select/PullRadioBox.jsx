import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import icon_check_black from '../assets/check_black.svg'
import icon_check_white from '../assets/check_white.svg'
import icon_pull from '../assets/pull.svg'


const PullRadioBoxStyled = styled.div`
    cursor: pointer;
    // position: relative;
    position: ${({ popDirection }) => { return popDirection==='down' ? 'relative' : 'absolute' }};
    /* position: absolute;
    left: -100px;
    bottom: -12px; */

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
        border: ${({borderHidden}) => { return borderHidden ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,.2)' }};
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
                //transform:rotate(180deg);
                ${({ popDirection }) => { return popDirection==='down' ? 'transform:rotate(180deg)' : 'transform:rotate(0deg)' }};
            }

            &.down{
                //transform:rotate(0deg);
                ${({ popDirection }) => { return popDirection==='down' ? 'transform:rotate(0deg)' : 'transform:rotate(180deg)' }};
            }
        }

        &:hover{
            ${({borderHidden}) => { return borderHidden ? 'none' : '1px solid rgba(0,0,0,.6)' }};
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
        //position: absolute;
        position: ${({ popDirection }) => { return popDirection==='down' ? 'absolute' : 'relative' }};
        width: ${({ width }) => { return width || '262px' }};
        max-height: 220px;
        box-sizing: border-box;
        overflow-x: hidden;
        background: #FFFFFF;
        border: 1px solid #EAEAEA;
        box-sizing: border-box;
        box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.1);
        margin-top: 5px;
        z-index: 5;
        //top: ${({optionsAmount})=>{return `${optionsAmount*42}px`}};
        // transform-origin: bottom;
        //transform: translateY(-30px);
        
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
    marginTop, title, borderHidden, popDirection='down',className }) {
    // 这个组件的option 一定要传value属性
    const [open, setOpen] = useState(false)
    const [checkVal, setCheckVal] = useState(defaultValue || options[0].value)
    const [checkItem, setCheckItem] = useState(defaultItem || options[0])
    const inputRef = useRef(null);

    useEffect(() => {
        onChange && onChange(checkItem)
        onValChange && onValChange(checkVal)
        // eslint-disable-next-line
    }, [checkVal])

    function bindBodyClick(e) {
        if (e.target === inputRef.current || e.target?.outerHTML === inputRef.current?.children[0]?.children[0]?.outerHTML || e.target?.outerHTML === inputRef.current?.children[1]?.outerHTML) return;
        setOpen(false);
    }

    useEffect(() => {
        document.addEventListener('click', bindBodyClick, false);
        return () => {
            document.removeEventListener('click', bindBodyClick, false);
        }
    }, [open])

    return (
        <PullRadioBoxStyled className={className} style={style} width={width} marginTop={marginTop} borderHidden={borderHidden} popDirection={popDirection}>
            {title && <p className={`title`}>{title}</p>}

            {
                popDirection==='up' && !disabled && open && <ul className="options">
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

            <div ref={inputRef} className={`select ${!disabled && open && 'open'} ${disabled && 'disabled'}`} onClick={() => {
                if (disabled) return;
                setOpen(!open)
            }}>
                <div className='value_wrapper'>
                    {prefix && <span className='prefix'>{prefix}</span>}
                    <p className='value'>{checkVal}</p>
                </div>
                <img src={icon_pull} className={`icon_pull ${open ? 'up' : 'down'}`} alt="" />
            </div>

            {
                popDirection==='down' && !disabled && open && <ul className="options">
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
