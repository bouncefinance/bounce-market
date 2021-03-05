import React, { useEffect, useState } from 'react'
import Button from './Button'
import icon_setting from '../assets/setting.svg'
import icon_share from '../assets/share.svg'

export default function OtherButton({
    style,
    value,
    onClick,
    type,
    disabled,
    iconSrc
}) {
    const [icon, setIcon] = useState('')

    useEffect(() => {
        if (iconSrc) {
            return setIcon(iconSrc)
        }

        let img = ''
        switch (type) {
            case 'setting':
                img = icon_setting
                break;

            case 'share':
                img = icon_share
                break;

            default:
                break;
        }
        setIcon(img)
        // eslint-disable-next-line
    }, [iconSrc])

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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                {icon && <img src={icon} alt='' style={{ marginRight: '6px' }} />}
                {value}
            </div>
        </Button >
    )
}
