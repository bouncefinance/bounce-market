// import React, {useState} from 'react'
import React from 'react'
import CommonHeader from '../CommonHeader'
import styled from 'styled-components'
import { CardItem, AddCardItem } from './ListCardItem'
import { useHistory } from 'react-router'
import { useBrandList } from './useHook'
// import TransferStatusModal, { approveStatus, initStatus } from '@components/Modal/TransferStatusModal'


const BrandsStyled = styled.div`
    width: 1100px;
    margin: 0 auto;

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
`


export default function Index() {
    const history = useHistory()
    const { brand_list } = useBrandList()
    // const [modalStatus, setModalStatus] = useState(initStatus);

    return (
        <div>
            <CommonHeader />

            <BrandsStyled>
                <ul className="list_wrapper">
                    {/* <li>
                        <button onClick={()=>{
                            setModalStatus(approveStatus)
                        }}>按钮</button>
                    </li> */}
                    <li>
                        <AddCardItem />
                    </li>
                    {brand_list.map((item) => {
                        return <li key={item.id} onClick={() => {
                            history.push(`/MyBrands/${item.id}/All`)
                        }}>
                            <CardItem
                                cover={item.imgurl}
                                name={item.brandname}
                                count={0}
                            />
                        </li>
                    })}
                </ul>

            </BrandsStyled>
            {/* <TransferStatusModal modalStatus={modalStatus} onDismiss={() => {
                setModalStatus(initStatus)
            }} /> */}
        </div>
    )
}
