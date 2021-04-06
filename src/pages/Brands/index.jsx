import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import SearchBar from '../component/Header/Search'
import { PullRadioBox as DropDownMenu } from '../../components/UI-kit'
import BrandCard from './BrandCard'

import { useQuery } from '@apollo/client'
import { QueryBrands } from '@/utils/apollo'
import useAxios from '@/utils/useAxios'
import { useActiveWeb3React } from '@/web3'
import { Controller } from '@/utils/controller'
import { SkeletonBrandRowCards } from '../component/Skeleton/Brandrow'

const StyledBrandPage = styled.div`
    width: 1100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    margin: 40px auto 0 auto;

    .row-1 {
        display: flex;
        justify-content: space-between;

        input {
            width: 821px;
            height: 48px;
            font-family: Optima;
            font-style: normal;
            font-weight: bold;
            font-size: 16px;
            line-height: 19px;
            text-transform: capitalize;
            color: #000000;
            opacity: 0.4;
            
            margin-left: 0;
        }
    }

    .BrandCardList {
        margin-top: 32px;

        display: grid;
        grid-gap: 32px;
    }
`

export default function Index () {
  const { data } = useQuery(QueryBrands);
  const { active } = useActiveWeb3React();
  const { sign_Axios } = useAxios();

  const [list, setList] = useState([])
  const [filterList, setFilterList] = useState([]);
  const [loding, setloding] = useState(true)

  useEffect(() => {
    // if (!active) return;
    if (data) {
      const bounce721Brands = data.bounce721Brands.map(item => item.id)
      const bounce1155Brands = data.bounce1155Brands.map(item => item.id)
      const list = bounce721Brands.concat(bounce1155Brands);
      setloding(true)
      sign_Axios.post(Controller.brands.getbrandsbyfilter, {
        Brandcontractaddressess: list
      })
        .then(res => {
          if (res.status === 200 && res.data.code === 1) {
            const itemList = res.data.data.map(item => ({
              id: item.id,
              img: item.imgurl,
              brandName: item.brandname,
              profile: item.description,
              avatar: item.imgurl,
              ownerName: item.ownername,
              standard: item.standard,
              popularweight: item.popularweight,
              owneraddress: item.owneraddress,
            }))
            .sort((a, b) => b.popularweight - a.popularweight);
            setList(itemList);
            setFilterList(itemList);
            setloding(false)
          }
        })
    }
    // eslint-disable-next-line
  }, [active, data]);
  
  const handleChange = (filterSearch) => {
    const result = list.filter(item => item.brandName.toLowerCase().indexOf(filterSearch) > -1
      || item.owneraddress.toLowerCase().indexOf(filterSearch) > -1);
    setFilterList(result);
  }

  return (
    <StyledBrandPage>
      <div className="row-1">
        <SearchBar placeholder={"Search Brand Name or Brand Creator"}
          onChange={handleChange} />
        <DropDownMenu
          width={"261px"}
          options={[{
            value: 'New'
          },
          ]}
          defaultValue={'New'}
          prefix={"Sort by:"}
          onChange={(item) => {
            // console.log(item)
          }}
        />
      </div>
      {loding && <SkeletonBrandRowCards n={2} />}
      <div className="BrandCardList">
        {
          filterList.map(
            (cardsInfo, index) => {
              return (
                <BrandCard
                  key={index}
                  img={cardsInfo.img}
                  brandName={cardsInfo.brandName}
                  profile={cardsInfo.profile}
                  avatar={cardsInfo.avatar}
                  ownerName={cardsInfo.ownerName}
                  id={cardsInfo.id}
                  standard={cardsInfo.standard} //1: 721 2: 1155
                  owneraddress={cardsInfo.owneraddress}
                />
              )
            }
          )
        }
      </div>
    </StyledBrandPage>
  )
}
