import React from 'react'
import CommonHeader from '../CommonHeader'
import CardItem from "./CardItem";
import styled from "styled-components";
import img_example_3 from "@assets/images/example_3.svg";
import {Button} from "@components/UI-kit";
const CardItemStyled = styled.div`
    width: 262px;
    height: 250px;
    overflow: hidden;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin-top: 32px;
    margin-right: 18px;

  img{
      width: 262px;
      height: 180px;
    }

    .content{
        position: relative;
        .info{
            position: absolute;
            top: 0px;
            left: 0px;
            padding: 13px 16px;
            p{
                font-size: 12px;
                color: rgba(0, 0, 0, 0.4);
                line-height: 15.6px;
                margin-bottom: 5px;
            }

            span{
                font-size: 16px;
                font-weight: 600;
                line-height: 20.88px;
            }
        }

        .button_group{
          width: 162px;
          height: 36px;
          margin: 0 auto;
          line-height: 36px;
          text-align: center;
          border: 1px solid #ddd;
          font-family: Helvetica Neue;
          font-style: normal;
          font-weight: bold;
          font-size: 13px;
          margin-top: 10px;
          cursor:pointer
        }
    }
    
`
const MyInventoryStyled = styled.div`
    width: 1100px;
    margin: 0 auto;
    .filterBox{
        margin-top: 32px;
        margin-bottom: 50px;
        display: flex;
        justify-content: space-between;
    }

    ul.list{
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 70px;
        li{
            margin-top: 32px;
            margin-right: 17px;

            &:nth-child(4n){
                margin-right: 0px;
            }
        }
    }
`

export default function Index() {
    return (
        <>
            <CommonHeader />
        <MyInventoryStyled>
            <ul className="list">
                <CardItemStyled>
                    <div>
                    <img src={img_example_3} alt="" />
                    </div>
                    <div className="content">
                        <div className='button_group'>
                            Creact
                        </div>
                    </div>
                </CardItemStyled>
                {[...new Array(6)].map((item, index) => {
                    return <li key={index}>
                        <CardItem />
                    </li>
                })}
            </ul>
        </MyInventoryStyled>
</>
    )
}
