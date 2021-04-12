import Button from '@/components/UI-kit/Button/Button';
import { DEBOUNCE } from '@/utils/const';
import useAxios from '@/utils/useAxios';
import { useDebouncedValue } from '@/utils/useDebouncedValue';
import { Skeleton } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { AutoStretchBaseWidthOrHeightImg } from '../Other/autoStretchBaseWidthOrHeightImg';
import icon_search from './assets/search.svg'
import { useQuery } from '@apollo/client';
import { QueryTradePools } from '@/utils/apollo'
import { AUCTION_TYPE } from '@/utils/const'

const getStandardTypeValue = (e) => e === 2 ? 'english-auction' : 'fixed-swap'
let search = ''
export default function Search ({ placeholder, value, onChange }) {
    const {sign_Axios} = useAxios()
    const [inSearch, setInSearch] = useState('')
    const [searchLoding, setSearchLoding] = useState(!false)
    const [data, setdata] = useState({})
    const { poolData } = useQuery(QueryTradePools)
    const handleChange = (e) => {
        const value = e.target.value && e.target.value.toLowerCase();
        search = value
    }
    const onSearch = async () => {
        setInSearch(search)
        // TODO 去头尾空
        if (!search) return
        setSearchLoding(true)
        try {
            const res = await sign_Axios.post(`/api/v2/main/getbylikestr`, { likestr: search })
            if (res.data.code === 1) {
                const data = res.data.data
                console.log(data)
                console.log('---getPools---')
                console.log(getPools())
                data.items = data.items.filter((_, i) => i < 3)
                data.brands = data.brands.filter((_, i) => i < 3)
                data.account = data.account.filter((_, i) => i < 3)
                setdata(data)
                setSearchLoding(false)
            } else {
                setSearchLoding(false)
            }
        } catch (error) {
            setSearchLoding(false)
        }
    }
    
    const getPools = () => {
        // console.log('poolData', poolData)
        const data = poolData
        const tradePools = data.tradePools.map((item) => ({
            ...item,
            poolType: AUCTION_TYPE.FixedSwap
        })).filter((item) => item.state !== 1)
        const tradeAuctions = data.tradeAuctions.map((item) => ({
            ...item,
            price: item.lastestBidAmount !== '0' ? item.lastestBidAmount : item.amountMin1,
            poolType: AUCTION_TYPE.EnglishAuction
        }))
            .filter((item) => item.state !== 1 && item.poolId !== 0)

        return tradePools.concat(tradeAuctions);
    }
    const debounceFilter = useDebouncedValue(search, DEBOUNCE);
    
    // useEffect(() => {
    //     // if (!loading) return
    //     console.log('poolData', poolData)
    //  }, [loading])
    
    useEffect(() => {
        onChange && onChange(debounceFilter);
        // eslint-disable-next-line
    }, [debounceFilter])
    useEffect(() => {
        search = ''
        const onEnter = (function (e) {
            var event = e || window.event;
            var key = event.which || event.keyCode || event.charCode;
            if (key === 13) {
                onSearch()
            }
        })
        document.addEventListener('keyup', onEnter)
        return () => {
            document.removeEventListener('keyup', onEnter)
        }
        // eslint-disable-next-line
    }, [])

    return (<SearchBoxStyled className={'flex flex-center-y'}>
        <SearchStyled
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
        />
        <Button onClick={onSearch} primary={true}>Search</Button>
        <div className="search-inner">
            <div style={inSearch.length <= 0 ? { minHeight: '0px', height: '0px', width: '0px', padding: '0px', opacity: 0, overflow: 'hidden' } : { minHeight: '100px', width: '483px' }} className="search-info">
                
                <div className="search-result-title">Items</div>
                {searchLoding ? <Loding /> : <div className="row-box">
                    {data.items?.map((item, key) => <Link key={key} to={`/Marketplace/FineArts/${getStandardTypeValue(item.standard)}/${item.id}`} className="search-result-item-row flex">
                        <AutoStretchBaseWidthOrHeightImg width={41} height={41} src={item.fileurl} />
                        <div className="row-right">
                            <p className="item-name">{item.itemname}</p>
                            <p>
                                <span className="coin">-- BNB</span>
                                <span className="price">(--$)</span>
                            </p>
                        </div>
                    </Link>)}
                </div>}
                <div className="search-result-title">Brands</div>
                {searchLoding ? <Loding /> : <div className="row-box">
                    {data.brands?.map((item, key) => <Link key = { key } to={`/AirHome/${item.id}/${item.standard}/FineArts`} className="search-result-brands-row flex flex-center-y">
                        <AutoStretchBaseWidthOrHeightImg style={{ borderRadius: '50%', overflow: 'hidden' }} width={41} height={41} src={item.imgurl} />
                        <div className="brand-name">{item.brandname}</div>
                    </Link>)}
                </div>}
                <div className="search-result-title">Users</div>
                {searchLoding ? <Loding /> : <div className="row-box">
                    {/* TODO  没有brand 提示 */}
                    {data.account?.map((item, key) => <Link key={key} to={`/AirHome/${item.id}/1/FineArts`} className="search-result-users-row flex">
                        <AutoStretchBaseWidthOrHeightImg style={{ borderRadius: '50%', overflow: 'hidden' }} width={41} height={41} src={item.imgurl } />
                        <div className="row-right">
                            <p className="user-name">{item.username}</p>
                            <p>
                                <span className="account-address">{item.accountaddress}</span>
                            </p>
                        </div>
                    </Link>)}
                </div>}
            </div>
        </div>
    </SearchBoxStyled>
    )
}

const Loding = () => {
    return <>
        <Skeleton variant="rect" width={210} height={118} />
    </>
}

const SearchBoxStyled = styled.div`
 margin-left: 60px;
 position: relative;
 .search-inner{
     position: absolute;
     bottom: 0px;
     z-index: 10;
     .search-info{
        transition: all 300ms;
        position: absolute;
        left: 0px;
        top: 4px;
        background-color: #ffff;
        border: 1px solid #EAEAEA;
        box-sizing: border-box;
        box-shadow: 4px 1px 14px rgba(0, 0, 0, 0.1);
        padding: 0px 20px 14px 20px;
        min-height: 100px;
        width: 483px;
        .search-result-title{
            font-weight: bold;
            font-size: 13px;
            line-height: 16px;
            color: #000;
            opacity: 0.6;
            margin-top: 16px;
            margin-bottom: 8px;
        }
        .row-box{
            max-height: 250px;
            overflow: auto;
        }
        .search-result-item-row{
            margin-bottom: 18px;
            &:last-child{
                margin-bottom: 0px;
            }
            .row-right{
                margin-left: 12px;
                .item-name{
                    font-weight: bold;
                    font-size: 16px;
                    line-height: 20px;
                    width: 350px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .coin{
                    font-weight: 500;
                    font-size: 16px;
                }
                .price{
                    margin-left: 4px;
                    color: #000000;
                    opacity: 0.3;
                }
            }
        }
        .search-result-brands-row{
            margin-bottom: 16px;
            &:last-child{
                margin-bottom: 0px;
            }
            .brand-name{
                font-size: 16px;
                font-weight: 600;
                margin-left: 12px;
            }
        }
        .search-result-users-row{
            margin-bottom: 16px;
            &:last-child{
                margin-bottom: 0px;
            }
            .row-right{
                margin-left: 12px;
                .user-name{
                    font-size: 16px;
                    font-weight: 600;
                }
                .account-address{
                    font-size: 14px;
                    line-height: 17px;
                    color: #000000;
                    opacity: 0.3;
                }
            }
        }
     }
 }
`

const SearchStyled = styled.input`
    width: 250px;
    height: 36px;
    /* margin-left: 60px; */
    box-sizing: border-box;
    font-family: 'Optima';
    font-size: 13px;
    font-weight: 700;
    border: 1px solid rgba(0,0,0,.2);
    padding: 0 16px;
    padding-left: 44px;
    background: url(${icon_search}) no-repeat;
    background-size: 16px 16px;
    background-position: 16px center;
    /* text-indent: 28px; */
    text-overflow: ellipsis;
    &::placeholder{
        color: rgba(0,0,0,.2);
    }

    &:focus{
        border: 1px solid rgba(0,0,0,.4);
        /* text-indent: 28px; */
    }
`