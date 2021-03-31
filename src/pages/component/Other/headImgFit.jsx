import React, { useState } from "react"
import styled from 'styled-components'
// import errorImg from '../../../assets/images/loading/3.svg'

const AutoStretchBaseWidthOrHeightImgStyled = styled.div`
div{
  background-repeat: no-repeat;
  background-size: 63px;
  background-position: center;
  /* background-color: rgba(0, 0, 0, 1); */
  background-color: rgb(224,224,224);
  img{
    background-color: rgb(230, 230, 230);
    /* background-color: white; */
    object-fit: contain;
    border-radius: 50%;
  }
}
`
export function HeadImgFit ({ src, width, height }) {
  const [imgShow, setImgShow] = useState(true)
  return <AutoStretchBaseWidthOrHeightImgStyled>
    <div style={{ width: `${width}px`, height: `${height}px`, borderRadius: '50%', background: `linear-gradient(154.16deg,#306AFF 6.12%,#3E74FE 49.44%,#003BD3 89.29%)` }}>
      {imgShow && <img width={width} height={height} src={src} alt="" onError={() => setImgShow(false)} />}
    </div>
  </AutoStretchBaseWidthOrHeightImgStyled>
}
