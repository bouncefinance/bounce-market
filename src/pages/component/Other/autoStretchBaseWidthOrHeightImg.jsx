import React from "react"
import styled from 'styled-components'

const AutoStretchBaseWidthOrHeightImgStyled = styled.div`
div{
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
`
export function AutoStretchBaseWidthOrHeightImg ({ src, width, height }) {
  return <AutoStretchBaseWidthOrHeightImgStyled>
    <div style={{ width: `${width}px`, height: `${height}px`, backgroundImage: `url(${src})` }}></div>
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