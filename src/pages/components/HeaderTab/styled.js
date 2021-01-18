import styled from 'styled-components'
import icon_kyc from './assets/icon-kyc.svg'
import icon_kyc_sel from './assets/icon-kyc-sel.svg'
import icon_acs from './assets/icon-acs.svg'
import icon_acs_sel from './assets/icon-acs-sel.svg'
import icon_pi from './assets/icon-pi.svg'
import icon_pi_sel from './assets/icon-pi-sel.svg'

export const HeaderTabStyled = styled.div`
    width: 100%;
    height: 80px;
    background-color: #fff;
    display: flex;
    align-items: center;

    .container{
        width: 1100px;
        height: 100%;
        display: flex;
        margin: 0 auto;
        justify-content: space-between;
        align-items: center;
        position: relative;
        .right{
            display: flex;

            ul{
                display: flex;
                align-items: center;
                li{
                    font-size: 16px;
                    margin-left: 32px;
                    color: rgba(0,0,0,.4);
                    cursor: pointer;

                    &.active{
                        color: rgba(0,0,0,1);
                    }
                }
            }

            .personal{
                width: 28px;
                height: 28px;
                border-radius: 50%;
                margin-left: 35px;
                cursor: pointer;
                background: linear-gradient(154.16deg, #306AFF 6.12%, #3E74FE 49.44%, #003BD3 89.29%);
            }
        }
    }
`


export const PerModalStyled = styled.div`
    position: absolute;
    right: 0;
    top: 80px;
    width:　220px;
    border: 1px solid #EAEAEA;
    background-color: #fff;

    .account{
        padding: 12px 24px;
        font-family: 'Helvetica Neue';
        h5{
            font-weight: 700;
            font-size: 16px;
        }

        p{
            font-size: 14px;
            font-weight: 500;
            color: rgba(0,0,0,.4);
            margin-top: 9px;
        }
    }

    ul{
        li{ 
            padding: 12px 24px;
            font-size: 14px;
            color: #1F191B;
            display: flex;
            cursor: pointer;

            &:hover{
                background-color: #000;
                color: #fff;
            }


            i{
                display: block;
                width: 16px;
                height: 16px;
                margin-right: 16px;
                background-size: contain;
                background-position: 0 0;
                &.kyc{
                    background: url('${icon_kyc}') no-repeat;
                }

                &.pi{
                    background: url('${icon_pi}') no-repeat;
                }

                &.acs{
                    background: url('${icon_acs}') no-repeat;
                }
            }

            
            &:hover i{
                &.kyc{
                    background: url('${icon_kyc_sel}') no-repeat;
                }

                &.pi{
                    background: url('${icon_pi_sel}') no-repeat;
                }

                &.acs{
                    background: url('${icon_acs_sel}') no-repeat;
                }
            }
        }
    }
`
