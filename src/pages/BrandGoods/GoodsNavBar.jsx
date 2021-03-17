import React from 'react'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router'

import nav_audio from '@assets/images/icon/nav_audio.svg'
import nav_game from '@assets/images/icon/nav_game.svg'
import nav_image from '@assets/images/icon/nav_image.svg'
import nav_other from '@assets/images/icon/nav_other.svg'
import nav_video from '@assets/images/icon/nav_video.svg'

const StyledGoodsNavBar = styled.div`
    .nav_wrapper {
        width: 1100px;
        margin: 0 auto;
        display: flex;
        padding-bottom: 16px;
        border-bottom: 2px solid rgba(0,0,0,.1);
        li {
            width: 124px;
            height: 48px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 20px;
            cursor: pointer;
            user-select: none;
            opacity: .4;
            img {
                margin-right: 7.15px;
            }

            &.active {
                background-color: rgba(0,0,0,.1);
                opacity: 1;
            }
        }
    }
`

const goods_NavList = [{
    name: 'Images',
    icon: nav_image,
    route: 'Images'
}, {
    name: 'Video',
    icon: nav_video,
    route: 'Video'
}, {
    name: 'Audios',
    icon: nav_audio,
    route: 'Audios'
}, {
    name: 'Game',
    icon: nav_game,
    route: 'Game'
}, {
    name: 'Others',
    icon: nav_other,
    route: 'Others'
}]

function GoodsNavBar() {
    const { brandId, type } = useParams()
    const history = useHistory()
    return (
        <StyledGoodsNavBar>
            <ul className="nav_wrapper">
                {goods_NavList.map((item) => {
                    return <li key={item.name} className={type === item.route ? 'active' : ''} onClick={() => {
                        history.push(`/Brands/${brandId}/${item.route}`)
                    }}>
                        <img src={item.icon} alt="" />
                        <p>{item.name}</p>
                    </li>
                })}
            </ul>
        </StyledGoodsNavBar>
    )
}

export default GoodsNavBar
