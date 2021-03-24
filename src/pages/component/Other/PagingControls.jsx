import React, { useState } from 'react'
import styled from 'styled-components'

// import arrows_left from '@assets/images/icon/arrows-left.svg'
// import arrows_right from '@assets/images/icon/arrows-right.svg'
import { Pagination } from '@material-ui/lab'

const PagingControlsStyled = styled.div`
    height: 48px;
    // display: flex;
    justify-content: end;
    align-items: center;
    margin-top: 28px;
    margin-bottom: 84px;

    button{
        // width: 48px;
        // height: 48px;
        // box-sizing: border-box;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        // background-color: rgba(0,0,0,.1);
        // cursor: pointer;

        &.left{
            margin-left: auto;
        }
    }

    .to_text{
        display: inline-block;
        margin-left: 10px;
    }

    input{
        width: 48px;
        height: 48px;
        box-sizing: border-box;
        text-align: center;
        
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    p{
        margin-left: 25px;
    }
    
`

export default function PagingControls () {
    const [curPage, setCurPage] = useState(1)

    return (
        <PagingControlsStyled>
            {/* <button className='left'>
                <img src={arrows_left} alt="" />
            </button>
            <input type="number" defaultValue={curPage} onChange={(e) => {
                let value = e.target.value
                value = value.replace(/[^0-9]/g, '')
                setCurPage(value)

            }}/>
            <button className='right'>
                <img src={arrows_right} alt="" />
            </button>

            <p>of 50 112</p> */}

            <div className="flex flex-space-x">
                <div></div>
                <div className="flex flex-center-y">
                    <Pagination count={10} page={curPage} onChange={() => { }} />
                    <span className="to_text">to</span>
                    <input type="number" defaultValue={curPage} onChange={(e) => {
                        let value = e.target.value
                        value = value.replace(/[^0-9]/g, '')
                        setCurPage(value)
                    }} />
                </div>
            </div>
        </PagingControlsStyled>
    )
}
