import React from 'react'
import styled from 'styled-components'
import themeBgImg from '@assets/images/big/d84d87b4548a138b206be2bae58a0362.png'

export default function header() {

    const brandInfo = {
        imgurl: 'https://market-test.bounce.finance/pngfileget/d2e5e2bf79dc39c60a2ba7f0a9a4f218-1617209581.png',
        ownername: 'Homie@Xu',
        contractaddress: '0x2D3Fff58da3346dCE601F6DB8eeC57906CDB17bE'
    }


    return (
        <TopBanner>
            <div className='bg_wrapper' style={brandInfo?.bandimgurl ? { backgroundSize: '100%!important', background: `url(${brandInfo.bandimgurl}) center center no-repeat` } : {}}>
               
            </div>
            <div className="userinfo">
                <img src={/* brandInfo.bandimgurl */brandInfo.imgurl} alt="" />
                <h2>{brandInfo.ownername}</h2>
                <p>{brandInfo.contractaddress}</p>
            </div>
        </TopBanner>
    )
}

const TopBanner = styled.div`
    position: relative;
    .bg_wrapper{
        width: 100%;
        height: 180px;
        /* background: linear-gradient(154.16deg, #306AFF 6.12%, #3E74FE 49.44%, #003BD3 89.29%); */
        background: url(${themeBgImg}) center center no-repeat;
        position: relative;
        background-size: 100%!important;
        button{
            background: none;
            width: 124px;
            height: 40px;
            box-sizing: border-box;
            border: 1px solid #fff;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 28px;
            right: 40px;
            cursor: pointer;
            img{
                margin-right: 6.8px;
            }
        }
    }
    .userinfo{
        text-align: center;
        margin-top: -80px;
        z-index: 2;
        position: relative;
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
        img{
            width: 160px;
            height: 160px;
            border-radius: 100%;
        }
        h2{
        font-size: 24px;
        color:#000;
        margin-top: 15px;
        }
        p{
        font-size: 16px;
        color: #1F191B;
        margin-top: 5px;
        }
    }
`