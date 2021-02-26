import styled from 'styled-components'

export const UIkitStyled = styled.div`
    padding: 20px 30px;

    .title{
        margin-bottom: 10px;
    }

    .content{
        padding-bottom: 15px;
    }

    .container{
        display: flex;
        &>div{
            width: 50%;
        }
    }

    hr{
        margin-top: 20px;
        margin-bottom: 20px;
    }

`