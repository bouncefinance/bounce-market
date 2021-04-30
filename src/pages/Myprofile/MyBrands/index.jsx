import React, { useEffect, useState } from 'react'
import CommonHeader from '../CommonHeader'
import styled from 'styled-components'
import { CardItem, AddCardItem } from './ListCardItem'
import { useHistory } from 'react-router'
import { useBrandList } from './useHook'
// import TransferStatusModal, { approveStatus, initStatus } from '@components/Modal/TransferStatusModal'

import { getContract, useActiveWeb3React } from '@/web3'
import { getNFTFactory } from '@/web3/address_list/contract'
import BounceNFTFactory from '@/web3/abi/BounceNFTFactory.json'
import { ZERO_ADDRESS } from '@/web3/address_list/token'
import axios from 'axios'
import useAxios from '@/utils/useAxios'

const BrandsStyled = styled.div`
    width: 1100px;
    margin: 0 auto;
    flex: 1;
    display: flex;
    flex-direction: column;

    ul.list_wrapper{
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 82px;
        li{
            margin-top: 20px;
            margin-right: 17px;

            &:nth-child(4n){
                margin-right: 0px;
            }
        }
    }

    .emptyNoticeWrapper {
      flex: 1;
      display: flex;
      .emptyNotice {
        margin: auto;
      }
    }
`


export default function Index() {
    const history = useHistory()
    const { brand_list, getBrandList } = useBrandList()
    // const [modalStatus, setModalStatus] = useState(initStatus);
    const { sign_Axios } = useAxios()
    const { active, library, chainId, account } = useActiveWeb3React()
    const [brandAddress, setbrandAddress] = useState('')
    const [brandAddContract, setbrandAddContract] = useState(true)
// eslint-disable-next-line
    const [brandList, setBrandList] = useState([])

    const [brandList, setBrandList] = useState([])

    useEffect(() => {
        if (!active) return
        const getCreatedBrand = async () => {
            try {
                // console.log('context', context)
                // console.log('library', library, chainId, account, active)
                const Factory_CT = getContract(library, BounceNFTFactory.abi, getNFTFactory(chainId))
                // console.log(account)
                const brand_address = await Factory_CT.methods.brands(account).call()

                return brand_address

            } catch (error) {
                return ''
            }
        }
        getCreatedBrand().then(address => {
            // console.log('address:', address)
            const addressNull = address.split('0x').join('').split('').filter(e => e !== '0').join('') !== ''
            setbrandAddContract(addressNull)
            setbrandAddress(address)
        })
        // eslint-disable-next-line
    }, [active])
    const hasAddressButNotBrand = brand_list.length === 0 && brandAddContract

    useEffect(() => {
        if (!active) return
        getBrandListByChain()
        // eslint-disable-next-line
    }, [active])

    const getBrandListByChain = async () => {

        try {
            const params = {
                offset: 0,
                count: 100,
                user_address: account
            }

            const brandListRes = await axios.get('/brands', { params })
            if (brandListRes.status === 200 && brandListRes.data.code === 200) {
                const data = brandListRes.data.data

                const brandList_721 = (data.erc721 || []).map(item => {
                    return {
                        standard: 1,
                        ...item
                    }
                })

                const brandList_1155 = (data.erc1155 || []).map(item => {
                    return {
                        standard: 2,
                        ...item,
                        contract_address: item.Token
                    }
                })

                const brandList = [...brandList_721, ...brandList_1155]
                linkBrandInfo(brandList)
            }
        } catch (error) {
            console.error('Failed to obtain brand information')
        }
    }

    const linkBrandInfo = async (brandList) => {
        const brandInfo = await getBrandInfoByAccount()
        console.log(brandList, brandInfo)
        const list = brandList.map(listItem => {
            // console.log(listItem, brandInfo)
            const tarItem = brandInfo.find(brandItem => String(brandItem.contractaddress).toLowerCase() === String(listItem.contract_address).toLowerCase())
            return {
                ...listItem,
                ...tarItem
            }
        })
        .filter(item=>item.contract_address&&item.contractaddress)
        // console.log(list)
        setBrandList(list)
    }

    const getBrandInfoByAccount = async () => {
        try {
            const brandInfoRes = await sign_Axios.post('/api/v2/main/auth/getaccountbrands', { accountaddress: account })
            if (brandInfoRes.status === 200 && brandInfoRes.data.code === 1) {
                return brandInfoRes.data.data
            } else {
                return []
            }
        } catch (error) {
            return []
        }
    }


    return (
        <>
            <CommonHeader />

            <BrandsStyled>
                <AddCardItem run={getBrandList} hasAddressButNotBrand={hasAddressButNotBrand} brandAddress={brandAddress} isCreate={hasAddressButNotBrand ? true : !brandAddContract} />

                {
                    active && brand_list.length > 0
                        ?
                        <ul className="list_wrapper">
                            {/* <li>
                            <button onClick={()=>{
                                setModalStatus(approveStatus)
                            }}>按钮</button>
                        </li> */}
                            {brandList.filter(item => item.contractaddress !== ZERO_ADDRESS).map((item) => {
                                return <li key={item.id} onClick={() => {
                                    history.push(`/MyBrands/${item.id}/All`)
                                }}>
                                    <CardItem
                                        cover={item.imgurl}
                                        name={item.brandname}
                                        standard={item.standard}
                                    />
                                </li>
                            })}
                        </ul>
                        :
                        <div className="emptyNoticeWrapper">
                            <span className="emptyNotice">
                                You doesn't have any brand.
                      </span>
                        </div>
                }

            </BrandsStyled>
            {/* <TransferStatusModal modalStatus={modalStatus} onDismiss={() => {
                setModalStatus(initStatus)
            }} /> */}
        </>
    )
}
