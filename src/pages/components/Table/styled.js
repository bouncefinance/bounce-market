import styled from 'styled-components'

export const FormStyled = styled.form`
    width: ${({ width }) => { return width ? width : '100%' }};
    .children{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
`

export const InputStyled = styled.div`
    width: ${({ width }) => { return width ? width : '100%' }};
    p{
        font-size: 13px;
        color: rgba(0,0,0,.4);
        margin-bottom: 8px;
        font-weight: 500;
        margin-top: ${({ marginTop }) => { return marginTop ? marginTop : '20px' }};
    }

    input{
        height: 48px;
        width: ${({ width }) => { return width ? width : '100%' }};
        border: 1px solid rgba(0,0,0,.4);
        box-sizing: border-box;
        font-size: 16px;
        color: #000;
        text-indent: 20px;

        &::placeholder{
            color: rgba(0,0,0,.4);
        }
    }
`

export const ButtonStyled = styled.button`
    width: ${({ width }) => { return width ? width : '100%' }};
    width: ${({ width }) => { return width ? width : '100%' }};
    height: 48px;
    box-sizing: border-box;
    font-weight: 700;
    cursor: pointer;


    &.white{
        background-color: #fff;
        color: #000;
        border: 1px solid rgba(0, 0, 0, 0.2);
    }

    &.black{
        background-color: #000;
        color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.2);
    }
`