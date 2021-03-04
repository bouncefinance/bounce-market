import React from 'react'
import { LayoutStyled } from './styled'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Header from './component/Header'
import Footer from './component/Footer'
import UIkit from '../test/UIkit'
import Test from '../test'

import Home from './Home'
import Marketplace from './Marketplace'
import Brands from './Brands'
import P2P from './P2P'

export default function Index() {

    return (
        <BrowserRouter>
            <LayoutStyled>
                <Header />
                <Route exact path='/test' component={Test} />
                <Route exact path='/UIkit' component={UIkit} />


                <Route exact path='/' render={() => { return <Redirect to='/Home' /> }} />
                <Route exact path='/Home' component={Home} />
                <Route exact path='/Marketplace' component={Marketplace} />
                <Route exact path='/Brands' component={Brands} />
                <Route exact path='/P2P' component={P2P} />

                <Footer />
            </LayoutStyled>
        </BrowserRouter>
    )
}
