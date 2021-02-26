import React, { useState, useEffect } from 'react'
import { PullCheckBoxStyled } from './styled'
// assets
import icon_pull from '../assets/pull.svg'

export default function PullCheckBox({ options, defaultValue, defaultItem, onChange, onValChange, disabled, prefix }) {
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
        <PullCheckBoxStyled>
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
                                if([...checkVal].includes(item.value)){
                                    const index = newVal.indexOf(item.value)
                                    newVal.splice(index, 1)
                                    newItem.splice(index, 1)
                                }else{
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
