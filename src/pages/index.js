import React from 'react'
import { LayoutStyled } from './styled'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Header from './component/Header'
import Footer from './component/Footer'
import UIkit from '../test/UIkit'
import Test from '../test'
import Test2 from '../test/test2'

import Home from './Home'
import Marketplace from './Marketplace/index'
import MyMarket from './Marketplace/MyMarket'
import Buy from './Buy/newIndex'

import Brands from './Brands'
import BrandGoods from './BrandGoods'
import P2P from './P2P'
import Factory from './Factory'
import ListNFT from './ListNFT'
import Page404 from './Page404'

import MyGallery from './Myprofile/MyGallery'
import MyNFT from './Myprofile/MyGallery/MyNFT'
import SellNFT from './Myprofile/MyGallery/SellNFT'
import TransferNFT from './Myprofile/MyGallery/TransferNFT'

import MyBrands from './Myprofile/MyBrands'
import BrandsByType from './Myprofile/MyBrands/BrandsByType'
import MyActivities from './Myprofile/MyActivities'
import MyP2P from './Myprofile/Point-2-Point'
import TransferStatusModal from '@components/Modal/TransferStatusModal'
import ModalMessage from '@components/Modal/ModalMessage'
import ErrorNotification from '@components/Modal/ErrorNotification'
import { AirHome } from './AirHome/index'
import  ArtistHome  from './ArtistHome/index'
import MyLiked from './Myprofile/MyLiked'
import { InitAxios } from '@/utils/utils'

InitAxios()
export default function Index() {

    return (
        <BrowserRouter>
            <LayoutStyled>
                <ModalMessage />
                <ErrorNotification />
                <Header />
                <Route exact path='/test' component={Test} />
                <Route exact path='/test2' component={Test2} />
                <Route exact path='/UIkit' component={UIkit} />

                <Route exact path='/' render={() => { return <Redirect to='/Home' /> }} />
                <Route exact path='/Home' component={Home} />
                <Route exact path='/Marketplace' render={() => { return <Redirect to='/Marketplace/FineArts' /> }} />
                <Route exact path='/Marketplace/:channel' component={Marketplace} />
                <Route exact path='/MyMarket' render={() => { return <Redirect to='/MyMarket/FineArts' /> }} />
                <Route exact path='/MyMarket/:channel' component={MyMarket} />
                <Route exact path='/Marketplace/:channel/:aucType/:poolId' component={Buy} />

                <Route exact path='/Brands' component={Brands} />
                <Route exact path='/Brands/:brandId/:type' component={BrandGoods} />
                <Route exact path='/BrandsGoods/' component={BrandGoods} />

                <Route exact path='/P2P' render={() => { return <Redirect to='/P2P/Requests' /> }} />
                <Route exact path='/P2P/:type' component={P2P} />
                <Route exact path='/Factory' component={Factory} />
                <Route exact path='/ListNFT' component={ListNFT} />

                <Route exact path='/MyGallery' component={MyGallery} />
                <Route exact path='/MyGallery/:nftId' component={MyNFT} />
                <Route exact path='/MyGallery/:nftId/Sell' component={SellNFT} />
                <Route exact path='/MyGallery/:nftId/Transfer' component={TransferNFT} />
                <Route exact path='/Transfer' component={TransferNFT} />

                <Route exact path='/MyBrands' component={MyBrands} />
                <Route exact path='/MyBrands/:brandId/:category' component={BrandsByType} />
                <Route exact path='/MyActivities' component={MyActivities} />

                <Route exact path='/MyLiked' component={MyLiked} />

                <Route exact path='/MyP2P' render={() => { return <Redirect to='/MyP2P/Requests' /> }} />
                <Route exact path='/MyP2P/:type' component={MyP2P} />

                <Route exact path='/AirHome/:id/:standard/:channel' component={AirHome} />
                <Route exact path='/ArtistHome/:userName' component={ArtistHome} />

                <Route exact path='/404' component={Page404} />

                <Footer />
                {/* 交易状态模态框 */}
                <TransferStatusModal />
            </LayoutStyled>
        </BrowserRouter>
    )
}
