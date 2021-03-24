import React from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 354px;
    height: 446px;

    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-sizing: border-box;

    
    &:hover {
        cursor: pointer;
        border: 1px solid #000000;
        box-sizing: border-box;
        box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
    }

    .top {
        img {
            width: 352px;
            height: 220px;
        }
    }

    .bottom {
        margin: 32px 28px;
        height: 162px;

        display: flex;
            flex-direction: column;
            justify-content: space-between;

        .text {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .title {
                font-family: Optima;
                font-style: normal;
                font-weight: bold;
                font-size: 28px;
                line-height: 34px;
                color: #000000;
            }

            .description {
                margin-top: 8px;

                font-family: Helvetica Neue;
                font-style: normal;
                font-weight: normal;
                font-size: 16px;
                line-height: 124%;
                color: #1F191B;
                opacity: 0.8;
            }
        }

        button {
            width: 132px;
            height: 36px;
        }
    }
`

function FactoryCard({ img, title, description, button}) {
    return (
        <div>
            <StyledCard>
                <div className="top">
                    <img src={img} alt="" />
                </div>
                <div className="bottom">
                    <div className="text">
                        <span className="title">{title}</span>
                        <p className="description">{description}</p>
                    </div>
                    {button}
                </div>
            </StyledCard>
        </div>
    )
}

export default FactoryCard
