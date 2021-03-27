import { SkeletonNFTCards } from '@/pages/component/Skeleton/NFTCard'
import PopularItem from '@/pages/Home/PopularItem'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CommonHeader from '../CommonHeader'

const MyLikedStyled = styled.div`
    width: 1100px;
    margin: 0 auto;
    padding-bottom: 20px;
    .con{

        display: flex;
        flex-wrap: wrap;
        margin-top: 16px;
    }
`
export default function MyLiked () {
  const [loading, setLoding] = useState(true)
  const [list, setlist] = useState([])
  useEffect(() => {
    const init = async () => {
      setLoding(true)
      await new Promise((resolve,) => setTimeout(resolve, 600))
      setLoding(false)
      setlist(new Array(8).fill().map((_, i) => ({
        src:
          i === 0 ? 'https://market-test.bounce.finance/pngfileget/wheatfield--big-1616654589.png' :
            i === 1 ? 'https://market-test.bounce.finance/pngfileget/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20210325152735-1616657350.png' :
              i === 2 ? 'https://market-test.bounce.finance/pngfileget/20210325154254-1616658231.png' :
                '//edu-image.nosdn.127.net/BB712DAF6CB2760EE4EE6284EB243773.png'
        , name: 'name' + i, price: i + 'E'
      })))
    }
    init()
  }, [])
  return <div>
    <CommonHeader />
    <MyLikedStyled>
      <div className="con">
        {list.map((({ src, name, price }) => (
          <PopularItem style={{ marginTop: '17px' }} key={name} src={src} name={name} price={price} />
        )))}
      </div>
      {loading && <SkeletonNFTCards n={3} ></SkeletonNFTCards>}
    </MyLikedStyled>
  </div>
}