import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
// assets
import icon_pull from '../assets/pull.svg'
import icon_no_select from '../assets/no_select.svg'
import icon_yes_select from '../assets/yes_select.svg'

const PullCheckBoxStyled = styled.div`
    cursor: pointer;
    position: relative;
    .select{
        width: ${({ width }) => { return width || '440px' }};
        height: 48px;
        padding:0 20px;
        box-sizing: border-box;
        border: 1px solid rgba(0,0,0,.2);
        display: flex;
        justify-content: space-between;
        align-items: center;
        user-select: none;
        margin-top: 20px;

        &>div{
            display: flex;
            font-size: 16px;
            color: rgba(0,0,0,.8);
            align-items: center;

            .prefix{
                margin-right: 6px;
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
        width: ${({ width }) => { return width || '440px' }};
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
            background: url(${icon_no_select}) no-repeat;
            background-size: 13px;
            background-position: 16px center;
            

            &.check{
                background: url(${icon_yes_select}) no-repeat;
                background-size: 13px;
                background-position: 16px center;
            }

        }
    }
`

export default function PullCheckBox({ options, defaultValue, defaultItem, onChange, onValChange, disabled, prefix, style, width }) {
    // 这个组件的option 一定要传value属性
    const [open, setOpen] = useState(false)
    const [checkVal, setCheckVal] = useState(defaultValue || [])
    const [checkItem, setCheckItem] = useState(defaultItem || [])

    useEffect(() => {
        onChange && onChange(checkItem)
        onValChange && onValChange(checkVal)
        // console.log(checkVal)
        // eslint-disable-next-line
    }, [checkVal])

    return (
        <PullCheckBoxStyled style={style} width={width}>
            <div className={`select ${!disabled && open && 'open'} ${disabled && 'disabled'}`} onClick={() => {
                if (disabled) return
                setOpen(!open)
            }}>
                <div>
                    {prefix && <span className='prefix'>{prefix}</span>}
                    <p className='value'>{checkVal.join(',')}</p>
                </div>
                <img src={icon_pull} className={open ? 'up' : 'down'} alt="" />
            </div>

            {
                !disabled && open && <ul className="options">
                    {options.map((item, index) => {
                        return <li
                            key={item.value + '_' + index}
                            className={`${[...checkVal].includes(item.value) ? 'check' : ''}`}
                            onClick={() => {
                                let newVal = [...checkVal]
                                let newItem = [...checkItem]
                                if ([...checkVal].includes(item.value)) {
                                    const index = newVal.indexOf(item.value)
                                    newVal.splice(index, 1)
                                    newItem.splice(index, 1)
                                } else {
                                    newVal.push(item.value)
                                    newItem.push(item)
                                }
                                setCheckVal(newVal)
                                setCheckItem(newItem)
                                // setOpen(false)
                            }}
                        >
                            {item.value}
                        </li>
                    })}
                </ul>
            }
        </PullCheckBoxStyled>
    )
}
