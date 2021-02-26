import React, { useState, useEffect } from 'react'
import { PullRadioBoxStyled } from './styled'
// assets
import icon_pull from '../assets/pull.svg'

export default function PullRadioBox({ options, defaultValue, defaultItem, onChange, onValChange, disabled, prefix }) {
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
        <PullRadioBoxStyled>
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
