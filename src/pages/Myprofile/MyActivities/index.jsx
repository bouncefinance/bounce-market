import React from 'react'
import CommonHeader from '../CommonHeader'
import TableList from './TableList'
import styled from 'styled-components'

const ContentWrapper = styled.div`
    width: 1100px;
    margin: 0 auto;
    flex: 1;
    display: flex;
    flex-direction: column;
`

export default function Index() {

    return (
        <>
            <CommonHeader />
            
            <ContentWrapper>
                <TableList />
            </ContentWrapper>
        </>
    )
}
