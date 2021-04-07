import React, { useState } from "react"
import styled from 'styled-components'
// G: \bounce - market\src\assets\images\loading\2.svg
// import errorImg from '../../../assets/images/loading/2.svg'
import errorImg from '../../../assets/images/loading/3.svg'

const AutoStretchBaseWidthOrHeightImgStyled = styled.div`
div{
  position: relative;
  background-repeat: no-repeat;
  background-size: 63px;
  background-position: center;
  /* background-color: rgba(0, 0, 0, 1); */
  background-color: rgb(224,224,224);
  img{
    /* background-color: rgb(247, 247, 247); */
    background-color: white;
    object-fit: contain;
  }
  .img-loading{
    position: absolute;
    top: 0px;
    left: 0px;
    background: rgb(234, 234, 234);
    width: 100%;
    height: 100%;
  }
}
`
export function AutoStretchBaseWidthOrHeightImg ({ src, width, height }) {
  const [imgShow, setImgShow] = useState(true)
  const [imgLoding, setImgLoding] = useState(true)
  return <AutoStretchBaseWidthOrHeightImgStyled>
    <div style={{ width: `${width}px`, height: `${height}px`, backgroundImage: `url(${errorImg})` }}>
      {imgShow && <img width={width} height={height} src={src} alt="" onError={() => {
        setImgShow(false)
        setImgLoding(false)
      }} onLoad={() => {
        setImgLoding(false)
      }} />}
      {imgLoding && <div className="img-loading"></div>}
    </div>
  </AutoStretchBaseWidthOrHeightImgStyled>
}


// export function AutoStretchBaseWidthOrHeightImg ({ src, width, height }) {
//   const [imgWidth, setImgWidth] = useState('auto')
//   const [imgHeight, setImgHeight] = useState('auto')
//   useEffect(() => {
//     const img = document.createElement('img')
//     img.src = src
//     document.body.appendChild(img)
//     const imgRect = img.getBoundingClientRect()
//     if (imgRect.width > imgRect.height) {
//       setImgWidth(width + 'px')
//     }
//     if (imgRect.width <= imgRect.height) {
//       setImgHeight(height + 'px')
//     }
//     document.body.removeChild(img)
//   }, [width, height, src])
//   return <div style={{ width: `${width}px`, height: `${height}px` }} className="flex flex-center-y flex-center-x">
//     <img src={src} width={imgWidth} height={imgHeight} alt="" />
//   </div>
// }



// list test
// index == 0 ? img_example_1 :
//     index == 1 ? 'https://market-test.bounce.finance/pngfileget/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20210325152735-1616657350.png' :
//         index == 2 ? 'https://market-test.bounce.finance/pngfileget/20210325154254-1616658231.png' :
//             '//edu-image.nosdn.127.net/BB712DAF6CB2760EE4EE6284EB243773.png'

// width: 262px;
// height: 262px;
// background - image: url(https://market-test.bounce.finance/pngfileget/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20210325152735-1616657350.png);
//   background - image: url(https://market-test.bounce.finance/pngfileget/20210325154254-1616658231.png);
//     background - image: url(//edu-image.nosdn.127.net/BB712DAF6CB2760EE4EE6284EB243773.png);
//       background - repeat: no - repeat;
// background - size: contain;
// background - position: center;


// const AutoStretchBaseWidthOrHeightImgStyled = styled.div`
// div{
//   background-repeat: no-repeat;
//   background-size: contain;
//   background-position: center;
// }
// `
// export function AutoStretchBaseWidthOrHeightImg ({ src, width, height }) {
//   return <AutoStretchBaseWidthOrHeightImgStyled>
//     <div style={{ width: `${width}px`, height: `${height}px`, backgroundColor: 'rgba(0,0,0,.03)', backgroundImage: `url(${src})` }}></div>
//   </AutoStretchBaseWidthOrHeightImgStyled>
// }