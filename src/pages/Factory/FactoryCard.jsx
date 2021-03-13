import React from 'react'
import styled from 'styled-components'

import Button from '../../components/UI-kit/Button/Button'

const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 354px;
    height: 446px;

    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-sizing: border-box;

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

            .discription {
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

        Button {
            width: 132px;
            height: 36px;

            .button_value {
                font-family: Helvetica Neue;
                font-style: normal;
                font-weight: bold;
                font-size: 13px;
                line-height: 16px;
                align-items: center;
                text-align: center;
                text-transform: capitalize;
                color: #FFFFFF;
            }
        }

    }
`

function FactoryCard({ img, title, discription, button_value}) {
    return (
        <div>
            <StyledCard>
                <div className="top">
                    <img src={img} alt="" />
                </div>
                <div className="bottom">
                    <div className="text">
                        <span className="title">{title}</span>
                        <p className="discription">{discription}</p>
                    </div>
                    <Button primary>
                        <span className="button_value">{button_value}</span>
                    </Button>
                </div>
            </StyledCard>
        </div>
    )
}

export default FactoryCard
