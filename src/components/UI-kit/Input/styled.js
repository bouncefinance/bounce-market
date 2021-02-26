import styled from 'styled-components'

export const InputStyled = styled.div`
    margin-top: ${({ marginTop }) => { return marginTop }};

    .title{
        font-weight: 700;
        font-size: 13px;
        color: rgba(0,0,0,.6);
        margin-bottom: 8px;

        &.error{
            color:  #E43F29;
        }
    }

    input{
        width: ${({ width }) => { return width }};
        height:${({ height }) => { return height }};
        border: 1px solid rgba(0,0,0,.2);
        box-sizing: border-box;
        color: rgba(0,0,0,.8);
        font-weight: 500px;
        font-size: 16px;
        padding: 0 20px;

        &:hover{
            border: 1px solid rgba(0,0,0,.6);
        }

        &:focus{
            border: 1px solid rgba(0,0,0,.8);
            color: rgba(0,0,0,1);
        }

        &:disabled{
            border: 1px solid rgba(0,0,0,1);
            color: rgba(0,0,0,1);
            opacity: .2;
        }

        &.error{
            border: 1px solid #E43F29;
            color:  #E43F29;
        }

        
    }

    
    .number_input{
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
            }
        }


    .err_msg{
        color: #E43F29;
        font-size: 12px;
        line-height: 16px;
        margin-top: 4px;
    }
`