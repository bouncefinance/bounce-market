import React, { useEffect, useState } from 'react'
import Button from './Button'
import icon_setting from '../assets/setting.svg'

export default function OtherButton({
    style,
    value,
    onClick,
    type,
    disabled
}) {
    const [icon, setIcon] = useState('')

    useEffect(() => {
        let img = ''
        switch (type) {
            case 'setting':
                img = icon_setting
                break;

            default:
                break;
        }
        setIcon(img)
        // eslint-disable-next-line
    }, [])

    return (
        <Button
            style={{
                width: '124px',
                height: '40px',
                ...style
            }}
            onClick={onClick}
            type='white'
            disabled={disabled}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
                {icon && <img src={icon} alt='' style={{marginRight: '6px'}}/>}
                {value}
            </div>
        </Button >
    )
}
