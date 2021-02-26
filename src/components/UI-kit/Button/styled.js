import styled from 'styled-components'

export const ButtonStyled = styled.button`
    box-sizing: border-box;
    background-color: rgba(0,0,0,1);
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    /* display: flex;
    align-items: center; */

    width: ${({ size }) => {
        switch (size) {
            case 'lg':
                return '200px'
            case 'sm':
                return '200px'
            default:
                return '160px'
        }
    }};

    height: ${({ size }) => {
        switch (size) {
            case 'lg':
                return '48px'
            case 'sm':
                return '36px'
            default:
                return '40px'
        }
    }};
    

    &:hover{
        background-color: rgb(51,51,51);
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