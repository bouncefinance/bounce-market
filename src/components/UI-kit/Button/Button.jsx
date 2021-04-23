import React from 'react'
import styled from 'styled-components'
// import loading_gif from '@assets/gifs/bounce_loading.svg'

const ButtonStyled = styled.button`
    box-sizing: border-box;
    background-color: rgba(0,0,0,1);
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    width: ${({ width }) => { return width || 'auto' }};
    height: ${({ height }) => { return height || '36px' }};
    margin-top: ${({ marginTop }) => { return marginTop || 0 }};
    margin-left: ${({ marginLeft }) => { return marginLeft || 0 }};
    min-width: 100px;
    padding: 0 11.4px;

    &:hover{
        background-color: rgb(51,51,51);
    }
    
    .loading_img{
        width: 25px;
        height: 25px
    }

    &.disabled{
        background-color: rgb(204,204,204);
    }

    &.white{
        background-color: rgba(256,256,256,1);
        color: #000;
        border: 1px solid rgba(0, 0, 0, 0.2);

        &:hover{
            border: 1px solid #000;
        }
        
        &.disabled{
            border: 1px solid rgba(0, 0, 0, 0.5);
            color: rgba(0,0,0,1);
            opacity: .4;
        }
    }
`

export default function Button({
    style,
    width,
    height,
    value,
    onClick,
    primary,
    children,
    disabled,
    marginTop,
    marginLeft,
}) {
    return (
        <ButtonStyled
            style={style}
            width={width}
            height={height}
            primary={primary}
            className={`${!primary && 'white'} ${disabled && 'disabled'}`}
            disabled={disabled}
            marginTop={marginTop}
            marginLeft={marginLeft}
            onClick={onClick}
        >
            { value}
            {children}
        </ButtonStyled >
    )
}