import React, { useEffect, useRef, useState } from "react"
import styled from 'styled-components'
import errorImg from '../../../assets/images/loading/3.svg'

const VideoStyled = styled.div`
div{
  position: relative;
  background-repeat: no-repeat;
  background-size: 63px;
  background-position: center;
  /* background-color: rgba(0, 0, 0, 1); */
  /* background-color: rgb(224,224,224); */
  background-color: white;
  .img-loading{
    position: absolute;
    top: 0px;
    left: 0px;
    background: rgb(234, 234, 234);
    width: 100%;
    height: 100%;
  }
}`

export function VideoItem ({ src, width, height, style = {} }) {
  const videoRef = useRef(null)
  const [imgShow, setImgShow] = useState(true)
  const [imgLoding, setImgLoding] = useState(!true)
  // let [isHover, setIsHover] = useState(false)
  useEffect(() => {
  }, [])
  const onMouseMove = () => {
    const video = videoRef?.current
      if (!video) return
    // TODO   The error you provided does not contain a stack trace.
    video?.play()
  }
  const onMouseLeave = () => {
    const video = videoRef?.current
    if (!video) return
    video?.pause()
  }
  return <VideoStyled>
    <div  style={{ ...style, width: `${width}px`, height: `${height}px`, backgroundImage: `url(${errorImg})` }}>
      {imgShow && <video onMouseOver={onMouseMove} onMouseLeave={onMouseLeave} ref={videoRef} style={{ objectFit: 'contain' }} width={width} height={height} src={src} alt="" onError={() => {
        setImgShow(false)
        setImgLoding(false)
      }} onLoad={() => {
        setImgLoding(false)
      }} />}
      {imgLoding && <div className="img-loading"></div>}
    </div>
  </VideoStyled>
}

{/* <VideoItem width={262} height={262} src={itemInfo.fileurl} /> */ }
// 'https://vodm0pihssv.vod.126.net/edu-video/nos/mp4/2013/03/07/206001_7179dc6b829a49e29d53d63d941d996d_sd.mp4?ak=7909bff134372bffca53cdc2c17adc27a4c38c6336120510aea1ae1790819de8914c542fa3373cc1e6158acaa03a2359c451c5ef6bd3d51342659c80414047823059f726dc7bb86b92adbc3d5b34b1327c7f4eb5a3208751c748f68b0af6e3dc'