import React, { useRef, useState/* , useEffect */ } from "react"
import styled from 'styled-components'
import defaultImg from '../../../assets/images/loading/3.svg'
import play from './assets/play_gray.svg'

import Grow from '@material-ui/core/Grow';

const VideoStyled = styled.div`
.videoWrapper {
  position: relative;
  background-repeat: no-repeat;
  background-size: 63px;
  background-position: center;
  /* background-color: rgba(0, 0, 0, 1); */
  background-color: ${
    ({hasBackgroundColor}) => {
      return hasBackgroundColor ? 'rgb(244,244,244)' : 'none';
    }
  };
  /* background-color: white; */

  .img-loading{
    position: absolute;
    top: 0px;
    left: 0px;
    background: rgb(234, 234, 234);
    width: 100%;
    height: 100%;
  }
  
  .defaultImg{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -33.5px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .playButton {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -15px;
    margin-left: -15px;
    z-index: 10;
    background-color: transparent;
    img {
      width: 30px;
      height: 30px;
      /* opacity: 1; */
    }
  }
}
`

export function VideoItem ({ src, width, height, style = {}, initPlayButtonVisible = true, hasBackgroundColor = true, initShowDefaultImage = true }) {

  const videoRef = useRef(null)
  /* const [imgShow, setImgShow] = useState(true)
  const [imgLoding, setImgLoding] = useState(!true) */
  const [playButtonVisiable, setPlayButtonVisiable] = useState(initPlayButtonVisible)
  const [playButtonClickable, setPlayButtonClickable] = useState(true)
  /* const [videoError, setVideoError] = useState(false) */
  const [showDefaultImage, setShowDefaultImage] = useState(initShowDefaultImage)
  // let [isHover, setIsHover] = useState(false)

  /* const onMouseMove = () => {
    const video = videoRef?.current
      if (!video) return
    // TODO   The error you provided does not contain a stack trace.
    video?.play()
    // video.defaultMuted = true
  } */

  const onMouseLeave = () => {
    const video = videoRef?.current
    if (!initPlayButtonVisible) return
    if (!video) return
    video?.pause()
    setPlayButtonVisiable(true)
  }

  return <VideoStyled playButtonVisiable={playButtonVisiable} hasBackgroundColor={hasBackgroundColor}>
    <div className="videoWrapper" style={{ ...style, width: `${width}px`, height: `${height}px`/* , backgroundImage: `url(${errorImg})` */ }}>
      {
        /* imgShow
        && */
        <video
          /* onMouseOver={onMouseMove} */
          onMouseLeave={onMouseLeave}
          ref={videoRef}
          style={{ objectFit: 'contain' }}
          width={width}
          height={height}
          src={src}
          alt=""
          onError={() => {
            /* setImgShow(false)
            setImgLoding(false) */
            /* setVideoError(true) */
            setPlayButtonClickable(false)
            console.log("onError")
          }}
          /* onLoad={() => {
            setImgLoding(false)
          }} */
          
          onCanPlay={() => {
            setShowDefaultImage(false)
          }}
        />
      }

      {/* {
        imgLoding
        &&
        <div className="img-loading">
        </div>
      } */}

      {
        /* videoError */
        showDefaultImage
        &&
        <div className="defaultImg">
          <img src={defaultImg} alt=""/>
        </div>
      }
      
      {
        playButtonVisiable
        &&
        <Grow
            in={playButtonVisiable}
            style={{ transformOrigin: 'center' }}
            {...(playButtonVisiable ? { timeout: 500 } : {})}
        >
          <div
            className="playButton"
            onClick={
              (e)=>{
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();

                if (!playButtonClickable) return
                setPlayButtonVisiable(false)
                const video = videoRef?.current
                if (!video) return
                video?.play()
              }
            }
          >
            <img src={play} alt=""/>
          </div>
        </Grow>
      }

    </div>
  </VideoStyled>
}

// 'https://vodm0pihssv.vod.126.net/edu-video/nos/mp4/2013/03/07/206001_7179dc6b829a49e29d53d63d941d996d_sd.mp4?ak=7909bff134372bffca53cdc2c17adc27a4c38c6336120510aea1ae1790819de8914c542fa3373cc1e6158acaa03a2359c451c5ef6bd3d51342659c80414047823059f726dc7bb86b92adbc3d5b34b1327c7f4eb5a3208751c748f68b0af6e3dc'