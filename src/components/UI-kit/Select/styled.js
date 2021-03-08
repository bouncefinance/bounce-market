import styled from 'styled-components'

import icon_check_black from '../assets/check_black.svg'
import icon_check_white from '../assets/check_white.svg'

import icon_no_select from '../assets/no_select.svg'
import icon_yes_select from '../assets/yes_select.svg'

export const PullRadioBoxStyled = styled.div`
    cursor: pointer;
    position: relative;
    .select{
        width: 262px;
        height: 48px;
        padding:0 20px;
        box-sizing: border-box;
        border: 1px solid rgba(0,0,0,.2);
        display: flex;
        justify-content: space-between;
        align-items: center;
        user-select: none;
        /* margin-top: 20px; */

        &>div{
            display: flex;
            font-size: 16px;
            color: rgba(0,0,0,.8);
            align-items: center;

            .prefix{
                margin-right: 6px;
            }
        }

        &>img{
            transition: all .3s;
            &.up{
                transform:rotate(180deg);
            }

            &.down{
                transform:rotate(0deg);
            }
        }

        &:hover{
            border: 1px solid rgba(0,0,0,.6);
        }

        &.open{
            border: 1px solid rgba(0,0,0,.8);
        }

        &.disabled{
            border: 1px solid rgba(0,0,0,.5);
            color: #000;
            opacity: .4;
            &:hover{
                border: 1px solid rgba(0,0,0,.6);
            }
        }
    }

    ul.options{
        position: absolute;
        width: 262px;
        max-height: 220px;
        box-sizing: border-box;
        overflow-x: hidden;
        background: #FFFFFF;
        border: 1px solid #EAEAEA;
        box-sizing: border-box;
        box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.1);
        margin-top: 5px;
        li{
            width: 100%;
            height: 42px;
            line-height: 42px;
            font-size: 16px;
            color: rgba(0,0,0,.8);
            padding: 0 42px;
            box-sizing: border-box;

            &:hover{
                background-color: #000;
                color: #FFFFFF;
            }
            

            &.check{
                background: url(${icon_check_black}) no-repeat;
                background-size: 13px;
                background-position: 16px center;

                &:hover{
                    color: #FFFFFF;
                    background: url(${icon_check_white}) no-repeat;
                    background-color: #000;
                    background-size: 13px;
                    background-position: 16px center;
                }
            }

        }
    }
`

export const PullCheckBoxStyled = styled.div`
    cursor: pointer;
    position: relative;
    .select{
        width: 440px;
        height: 48px;
        padding:0 20px;
        box-sizing: border-box;
        border: 1px solid rgba(0,0,0,.2);
        display: flex;
        justify-content: space-between;
        align-items: center;
        user-select: none;
        margin-top: 20px;

        &>div{
            display: flex;
            font-size: 16px;
            color: rgba(0,0,0,.8);
            align-items: center;

            .prefix{
                margin-right: 6px;
            }
        }

        &>img{
            transition: all .3s;
            &.up{
                transform:rotate(180deg);
            }

            &.down{
                transform:rotate(0deg);
            }
        }

        &:hover{
            border: 1px solid rgba(0,0,0,.6);
        }

        &.open{
            border: 1px solid rgba(0,0,0,.8);
        }

        &.disabled{
            border: 1px solid rgba(0,0,0,.5);
            color: #000;
            opacity: .4;
            &:hover{
                border: 1px solid rgba(0,0,0,.6);
            }
        }
    }

    ul.options{
        position: absolute;
        width: 440px;
        max-height: 220px;
        box-sizing: border-box;
        overflow-x: hidden;
        background: #FFFFFF;
        border: 1px solid #EAEAEA;
        box-sizing: border-box;
        box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.1);
        margin-top: 5px;
        li{
            width: 100%;
            height: 42px;
            line-height: 42px;
            font-size: 16px;
            color: rgba(0,0,0,.8);
            padding: 0 42px;
            box-sizing: border-box;
            background: url(${icon_no_select}) no-repeat;
            background-size: 13px;
            background-position: 16px center;
            

            &.check{
                background: url(${icon_yes_select}) no-repeat;
                background-size: 13px;
                background-position: 16px center;
            }

        }
    }
`