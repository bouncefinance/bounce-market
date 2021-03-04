import React from 'react'
import styled, { css } from 'styled-components'
import logo_bounce from '@assets/images/logo/bounce.svg'
import bounce_Title from '@assets/images/bounceTitle.svg'
import introduceBottom1 from '@assets/images/introduceBottom1.svg'
import introduceBottom2 from '@assets/images/introduceBottom2.svg'
import introduceBottom3 from '@assets/images/introduceBottom3.svg'
const Introduce = styled.div`
  height: 280px;
  background: black;
  color:#ffffff;
  padding-left: 170px;
  padding-top: 64px;
  display: flex;
  justify-content: space-between;
  padding-right: 248px;
  .title1{
    font-family: Optima;
    font-style: normal;
    font-weight: bold;
    font-size: 38px;
    width: 517px;
    margin-bottom: 26px;
  }
  .title2{
    font-family: Helvetica Neue;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    border: 1px solid #FFFFFF;
    width: 124px;
    height: 44px;
    line-height: 44px;
    text-align: center;
  }
  .titleBounce{
    margin-top: -64px
  }
`
const Vessel = styled.div`
  padding: 0 170px;
  .introduceBottom{
    display: flex;
    justify-content: flex-start;
    margin-bottom: 64px;
    margin-top: 52px;
  }
  .popular{
    display: flex;
    justify-content: flex-start;
    margin-bottom: 64px;
  }
  .popularTitle{
    font-family: Optima;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    margin-bottom: 16px;
  }
  .Requests{
    display: flex;
    justify-content: flex-start;
    margin-bottom: 64px;
  }
`
const IntroduceBottomItem = styled.div`
    border: 2px solid #000000;
  width: 354px;
  height: 110px;
  margin-right: 19px;
  padding-left: 24px;
  padding-top: 28px;
  display: flex;
  justify-content: space-between;
  .title1{
    font-family: Optima;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    color: #000000;
    margin-bottom: 8px;
  }
  .title2{
    font-family: Helvetica Neue;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 124%;
    color: #1F191B;
    opacity: 0.7;
    width: 171px;
  }
  .introduceBottom1{
    margin-right: 12px;
  }

`
const PopularItem = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.2);
  width: 262px;
  height: 332px;
  margin-right: 18px;
  .imgPopular{
    width: 261px;
    height: 261px;
  }
  .PopularText1{
    color: #000000;
    opacity: 0.4;
    font-family: IBM Plex Mono;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    margin-top: 14px;
    margin-left: 16px;
  }
  .PopularText2{
    color: #000000;
    font-family: IBM Plex Mono;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    margin-top: 8px;
    margin-left: 16px;
  }
`
const RequestsItem = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.2);
  width: 262px;
  height: 228px;
  margin-right: 18px;
  padding: 20px 16px;
`
const BrandsItem = styled.div`
    border: 1px solid #DDDDDD;
  width: 262px;
  height: 228px;
  margin-right: 18px;
  .imgBrands{
    width: 261px;
    height: 179px;
  }
  .BrandsText{
    font-family: IBM Plex Mono;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    margin-top: 14px;
    margin-left: 16px;
  }
`
const Bottom = styled.div`
  height: 120px;
  line-height: 120px;
  background: black;
  color:#ffffff;
  font-size: 30px;
  margin-bottom: 50px;
  padding-left: 28px;
  font-family: Optima;
  font-style: normal;
  font-weight: bold;
`
const RequestsTop = styled.div`
    display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #000000;
  padding-bottom: 16px;
  .title1{
    font-family: IBM Plex Mono;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
  }
  .title2{
    font-family: IBM Plex Mono;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
  }
`
const RequestsMiddle = styled.div`
  padding-top: 14px;
  padding-bottom: 30px;
  color: #1F191B;
  opacity: 0.7;
`
const RequestsBottom = styled.div`
  padding-top: 16px;
  padding-bottom: 34px;
  font-family: IBM Plex Mono;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
`
export default function Index() {
    return (
        <div>
           <Introduce >
               <div>
                   <div className='title1'>On Bounce you will find unique content for every taste</div>
                   <div className='title2'>Explore</div>
               </div>
               <img className='titleBounce' src={bounce_Title}/>
           </Introduce>
            <Vessel >
                <div className='introduceBottom'>
                    <IntroduceBottomItem>
                        <div>
                        <div className='title1'>Marketplace</div>
                        <div className='title2'>You can find your content here according to your taste</div>
                        </div>
                        <img className='introduceBottom1' src={introduceBottom1}/>
                    </IntroduceBottomItem>
                    <IntroduceBottomItem>
                        <div>
                            <div className='title1'>Brands</div>
                            <div className='title2'>You can find your content here according to your taste</div>
                        </div>
                        <img className='introduceBottom1' src={introduceBottom2}/>
                    </IntroduceBottomItem>
                    <IntroduceBottomItem>
                        <div>
                            <div className='title1'>Point-2-Point</div>
                            <div className='title2'>You can find your content here according to your taste</div>
                        </div>
                        <img className='introduceBottom1' src={introduceBottom3}/>
                    </IntroduceBottomItem>
                </div>
                <div className='popularTitle'>
                    Most Popular Items
                </div>
                <div className='popular'>
                    <PopularItem>
                        <img className='imgPopular' src={logo_bounce}/>
                        <div className='PopularText1'>Digital Image Name</div>
                        <div className='PopularText2'>0,9931 ETH</div>
                    </PopularItem>
                    <PopularItem>
                        <img className='imgPopular' src={logo_bounce}/>
                        <div className='PopularText1'>Digital Image Name</div>
                        <div className='PopularText2'>0,9931 ETH</div>
                    </PopularItem>
                    <PopularItem>
                        <img className='imgPopular' src={logo_bounce}/>
                        <div className='PopularText1'>Digital Image Name</div>
                        <div className='PopularText2'>0,9931 ETH</div>
                    </PopularItem>
                    <PopularItem>
                        <img className='imgPopular' src={logo_bounce}/>
                        <div className='PopularText1'>Digital Image Name</div>
                        <div className='PopularText2'>0,9931 ETH</div>
                    </PopularItem>
                </div>
                <div className='popularTitle'>
                    Hotest Brands
                </div>
                <div className='popular'>
                    <BrandsItem>
                        <img className='imgBrands' src={logo_bounce}/>
                        <div className='BrandsText'>Alpaca City</div>
                    </BrandsItem>
                    <BrandsItem>
                        <img className='imgBrands' src={logo_bounce}/>
                        <div className='BrandsText'>yGift Store</div>
                    </BrandsItem>
                    <BrandsItem>
                        <img className='imgBrands' src={logo_bounce}/>
                        <div className='BrandsText'>Alpaca City</div>
                    </BrandsItem>
                    <BrandsItem>
                        <img className='imgBrands' src={logo_bounce}/>
                        <div className='BrandsText'>yGift Store</div>
                    </BrandsItem>
                </div>
                <div className='popularTitle'>
                    Newest Requests
                </div>
                <div className='Requests'>
                    <RequestsItem>
                        <RequestsTop >
                            <div className='title1'>B-day Video</div>
                            <div className='title2'>Video</div>
                        </RequestsTop>
                        <RequestsMiddle >
                        I want to a custom video for my birthday. It shouldn’t be longer then ~20-30 sec. I want to a custom video for my birthday.
                        It shouldn’t be longer then ~20-30 sec.
                        </RequestsMiddle>
                        <RequestsBottom >
                            100 USDT
                        </RequestsBottom>
                    </RequestsItem>
                    <RequestsItem>
                        <RequestsTop >
                            <div className='title1'>Mobile Game</div>
                            <div className='title2'>Game</div>
                        </RequestsTop>
                        <RequestsMiddle >
                            I want to a custom video for my birthday. It shouldn’t be longer then ~20-30 sec. I want to a custom video for my birthday.
                            It shouldn’t be longer then ~20-30 sec.
                        </RequestsMiddle>
                        <RequestsBottom >
                            100 USDT
                        </RequestsBottom>
                    </RequestsItem>
                    <RequestsItem>
                        <RequestsTop >
                            <div className='title1'>Digital Picture</div>
                            <div className='title2'>Picture</div>
                        </RequestsTop>
                        <RequestsMiddle >
                            I want to a custom video for my birthday. It shouldn’t be longer then ~20-30 sec. I want to a custom video for my birthday.
                            It shouldn’t be longer then ~20-30 sec.
                        </RequestsMiddle>
                        <RequestsBottom >
                            100 USDT
                        </RequestsBottom>
                    </RequestsItem>
                    <RequestsItem>
                        <RequestsTop >
                            <div className='title1'>B-day Video</div>
                            <div className='title2'>Video</div>
                        </RequestsTop>
                        <RequestsMiddle >
                            I want to a custom video for my birthday. It shouldn’t be longer then ~20-30 sec. I want to a custom video for my birthday.
                            It shouldn’t be longer then ~20-30 sec.
                        </RequestsMiddle>
                        <RequestsBottom >
                            100 USDT
                        </RequestsBottom>
                    </RequestsItem>
                </div>
                <Bottom>
                    Create your unique NFT on Bounce
                </Bottom>
            </Vessel>
        </div>
    )
}
