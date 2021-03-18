import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    width: 354px;
    height: 220px;
    border: 1px solid #000000;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    &:hover {
        cursor:pointer;
        border: 1px solid #000000;
        box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
    }

    padding-right: 28px;
    padding-left: 28px;


    .content {
        height: 100%; /* !!!!! */

        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .title {
            font-family: Optima;
            font-style: normal;
            font-weight: bold;
            font-size: 28px;
            line-height: 34px;
            color: #000000;

            margin-top: 70px;
        }

        .discription {
            font-family: Helvetica Neue;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 124%;
            color: #1F191B;
            opacity: 0.8;

            margin-top: 8px;
            text-align: left;
        }
    }
`

const CardList = styled.div`
    margin: 60px 170px auto 170px;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 18px;
    row-gap: 25px;

`

function index() {
    return (
        <CardList>
           <StyledButton className="Mainnet">
                <div className="content">
                    <span className="title">Live on mainnet</span>
                    <p className="discription">We have something and it's ready to roll</p>
                </div>
            </StyledButton> 
           <StyledButton className="Rinkeby">
                <div className="content">
                    <span className="title">Live on Rinkeby</span>
                    <p className="discription">It's on Rinkeby and ready to migrate over to mainnet</p>
                </div>
            </StyledButton> 
           <StyledButton className="Prototype">
                <div className="content">
                    <span className="title">Not developed</span>
                    <p className="discription">We have an idea and a prototype</p>
                </div>
            </StyledButton> 
        </CardList>
    )
}

export default index
