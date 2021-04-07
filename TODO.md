首页样式改版，暂时不用

G:\bounce-market\src\pages\Home\CardBanner.jsx
```jsx
import React from 'react'
import styled from 'styled-components'
import arrows_blue from '@assets/images/icon/arrows-blue.svg'
import banner_1 from './assets/banner_1.1.svg'
import banner_2 from './assets/banner_2.1.svg'
// import banner_3 from './assets/banner_3.svg'
// import { Tooltip } from '@material-ui/core'
import { Link } from 'react-router-dom'

const CardBannerStyled = styled.ul`
    width: 1100px;
    height: 110px;
    margin: 0 auto;
    margin-top: 52px;
    display: flex;
    justify-content: space-between;
`


export default function CardBannerGroup () {
    return (
        <CardBannerStyled>
            <Link to="/Marketplace" style={{
                        background: 'linear-gradient(259.9deg, #839356 20.66%, #BEB13B 57.56%)',
                        borderRadius: '9px'
                    }}>
                <CardBannerItem
                    title='Marketplace'
                    context='Fine Arts, Comics, Sports and others.'
                    img={banner_1}
                />
            </Link>
            <Link to="/Brands" style={{
                background: 'rgb(46,57,86)',
                borderRadius: '9px',
            }}>
                <CardBannerItem
                    title='Brands'
                    context='Many different brands with Fangible'
                    img={banner_2}
                />
            </Link>
            {/* <Tooltip title="Coming soon">
                <div style={{ opacity: 0.5, cursor: 'pointer' }}>
                    <CardBannerItem
                        title='Point-2-Point'
                        context='Fine Arts, Comics, Sports and others. You can find your content here according to your taste of brands'
                        img={banner_3}
                    />
                </div>
            </Tooltip> */}
        </CardBannerStyled>
    )
}


const CardBannerItemStyled = styled.li`
    width: 540px;
    height: 110px;
    box-sizing: border-box;
    /* border: 2px solid #000000; */
    display: flex;
    justify-content: space-between;
    color: #fff;
    
    .left{
        width: 280px;
        height: 30px;
        margin-left: 28px;
        margin-top: 24px;

        .top{
            display: flex;
            h5{
                font-size: 20px;
            }
            img{
                width: 20px;
                margin-left: 10px;
            }
        }
        .bottom{
            margin-top: 8px;
            font-size: 14px;
            line-height: 14.88px;
            /* color: rgba(31,25,27,.7) */
            color: #fff;
        }
    }

    .right {
        margin-right: 36px;
        img {
            height: 106px;
        }
    }
`

function CardBannerItem ({ title, context, img }) {
    return (
        <CardBannerItemStyled>
            <div className="left">
                <div className="top">
                    <h5>{title}</h5>
                    {/* <img src={arrows_blue} alt="" /> */}
                </div>
                <div className="bottom">
                    <p>{context}</p>
                </div>
            </div>

            <div className="right">
                <img src={img} alt="" />
            </div>
        </CardBannerItemStyled>
    )
}

```


G:\bounce-market\src\pages\Home\index.jsx

```jsx
import img_banner from '@assets/images/banner2.png'
.banner_wrapper{
      width: 100%;
      min-width: 1100px;
      height: 280px;
      box-sizing: border-box;
      background-color: #000;
      position: relative;

      .banner_img{
        width: 1100px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .content{
          margin: auto;
          position: relative;
          z-index: 1;
          text-align: center;
        }
        .bg{
          position: absolute;
          left: 0px;
          top: 0px;
        }


      <div className="banner">
        {/* <ul>
          {banner_Nav.map((item) => {
            return <li key={item.name}><Link to={`/Marketplace/${item.name}`}>{item.name}</Link></li>
          })}
        </ul> */}
        <div className="banner_wrapper" style={{ background: `url(${img_banner}) center center no-repeat`, backgroundSize: '100%!important', position: 'relative', }}>
          <div className='banner_img'>
            <div className='content'>
              <h1>Create and Find
                  unique content with Fangible</h1>
              <button>
                <Link to="/Marketplace">Explore</Link>
              </button>
            </div>
          </div>
        </div>
      </div>


```