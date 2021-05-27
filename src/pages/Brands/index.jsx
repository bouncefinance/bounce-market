import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'

import SearchBar from './SearchBar'
import { PullRadioBox as DropDownMenu } from '../../components/UI-kit'
import BrandCard from './BrandCard'

import useAxios from '@/utils/useAxios'
import { useActiveWeb3React } from '@/web3'
import { Controller } from '@/utils/controller'
import { SkeletonBrandRowCards } from '../component/Skeleton/Brandrow'

import useWrapperIntl from '@/locales/useWrapperIntl'
import axios from 'axios'
import { myContext } from '@/redux/index.js';

const StyledBrandPage = styled.div`
    width: 1100px;
    flex: 1;

    margin: 40px auto 0 auto;

    .row-1 {
        display: flex;
        justify-content: space-between;

        input {
            width: 821px;
            height: 48px;
            font-family: Helvetica Neue;
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
            margin-left: 0;
        }
    }

    .BrandCardList {
        margin-top: 32px;
        margin-bottom: 32px;
        min-height: 336px;
        display: grid;
        grid-gap: 32px;
    }
`

const brandParmas = { offset: 0, count: 1e4 }
export default function Index() {
  // const { data } = useQuery(QueryBrands);

  const [data, setData] = useState({ erc721: [], erc1155: [] })
  const initPools = async (params) => {
    const res = await axios.get('/brands', { params: params })
    if (res.data.code === 200) {
      setData(res.data.data)
    }
  }
  useEffect(() => {
    initPools(brandParmas)
  }, [])

  const { active } = useActiveWeb3React();
  const { sign_Axios } = useAxios();

  const [list, setList] = useState([])
  const [filterList, setFilterList] = useState([]);
  const [loding, setloding] = useState(true)

  const { wrapperIntl } = useWrapperIntl()
  const { dispatch } = useContext(myContext);

  const [sortBy, setSortBy] = useState()


  useEffect(() => {
    // if (!active) return;
    if (!active) {
      dispatch({
        type: 'Modal_Message',
        showMessageModal: true,
        modelType: 'error',
        modelMessage: wrapperIntl("ConnectWallet"),
        modelTimer: 24 * 60 * 60 * 1000,
      });
    }

    if (data) {
      const bounce721Brands = (data.erc721 || []).map(item => item.contract_address)
      const bounce1155Brands = (data.erc1155 || []).map(item => item.Token)
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
              avatar: item.ownerimg,
              ownerName: item.ownername,
              standard: item.standard,
              popularweight: item.popularweight,
              owneraddress: item.owneraddress,
            })).filter(item => item.id !== 117)
            // console.log(itemList)
            setList(itemList);
            setloding(false)
          }
        })
    }
    // eslint-disable-next-line
  }, [active, data]);

  useEffect(() => {
    if (!list.length || !sortBy) return
    console.log(sortBy)
    let filter
    if (sortBy === 'Popular') {
      filter = list.sort((item1, item2) => {
        return item2.popularweight - item1.popularweight
      })
    } else {
      filter = list.sort((item1, item2) => {
        return item2.id - item1.id
      })
    }

    setFilterList(filter)
    setloding(false)
  }, [sortBy, list])

  const handleChange = (filterSearch) => {
    console.log(filterSearch)
    const result = list.filter(item => item.brandName.toLowerCase().indexOf(filterSearch) > -1
      || item.owneraddress.toLowerCase().indexOf(filterSearch) > -1);
    setFilterList(result);
  }

  return (
    filterList&&<StyledBrandPage>
      <div className="row-1">
        <SearchBar placeholder={wrapperIntl("Brands.placeholder")}
          onChange={(e) => { handleChange(e) }} />
        <DropDownMenu
          width={"261px"}
          options={[{
            value: 'Popular'
          }, {
            value: 'New'
          },
          ]}
          defaultValue={'Popular'}
          prefix={"Sort by:"}
          onValChange={(item) => {
            // console.log(item)
            setSortBy(item)
            setloding(true)
          }}
        />
      </div>
      {loding && <SkeletonBrandRowCards n={2} />}
      <div className="BrandCardList" style={{ marginBottom: 30 }}>
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
                  standard={cardsInfo.standard} //0: 721 1: 1155
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
