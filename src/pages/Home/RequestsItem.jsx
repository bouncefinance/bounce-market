import React from 'react'
import styled from 'styled-components'

const RequestsItemStyled = styled.div`
    width: 262px;
    height: 228px;
    box-sizing: border-box;
    margin-right: 17px;
    padding: 16px 20px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    overflow: hidden;
    &:nth-child(4n){
        margin-right: 0px;
    }

    .top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2px solid #000;
        padding-bottom: 16px;

        p{
            font-size: 15px;
            color: #000;
        }

        span{
            font-size: 12px;
            color: rgba(0,0,0,.4);
        }
    }

    .main{
        height: 143px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        p{
            font-size: 13px;
            line-height: 16.13px;
            font-weight: 400;
            margin-top: 16px;
            color: rgba(0,0,0,.7);
        }

        h5{
            font-weight: 600;
            color: rgba(31,25,27,1);
        }
    }
`

export default function RequestsItem({ title, type, context, price }) {
    return (
        <RequestsItemStyled>
            <div className="top">
                <p>{title}</p>
                <span>{type}</span>
            </div>

            <div className="main">
                <p>{context}</p>

                <h5>{price}</h5>
            </div>
        </RequestsItemStyled>
    )
}
