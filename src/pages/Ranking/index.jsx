import React, { useEffect, useState/* , useContext */ } from 'react'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router'
import Search from '../component/Other/Search'
import axios from 'axios'
import { useActiveWeb3React } from '@/web3'
import Typography from '@material-ui/core/Typography';
import useWrapperIntl from '@/locales/useWrapperIntl'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ConnectWalletModal from '@components/Modal/ConnectWallet'
import useAxios from '@/utils/useAxios'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import icon_search from '../component/Other/assets/search.svg'
import SvgIcon from '@material-ui/core/SvgIcon';
import Tooltip from '@material-ui/core/Tooltip';



const RankingStyled = styled.div`
    width: 1100px;
    flex: 1;
    margin: 0 auto;
    margin-bottom: 30px;

    .nav_wrapper{
        width: 1100px;
        margin: 0 auto;
        margin-top: 40px;
        display: flex;
        // padding-bottom: 16px;
        // border-bottom: 2px solid rgba(0,0,0,.1);
        position: relative;
        li{
            padding: 7px 20px;
            height: 48px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            user-select: none;
            opacity: .4;
            img{
                margin-right: 7.15px;
            }

            &.active{
                background-color: rgba(0,0,0,.1);
                opacity: 1;
            }
        }
      .link {
        position: absolute;
        right: -20px;
      }
    }

    .contentBox{
        margin-top: 32px;
        /* margin-bottom: 50px; */
        display: flex;
        flex-direction:column;
        justify-content: center;
        align-items:center;
        .fontBox {
            font-size: 26px;
            text-align: center;
            font-weight: 400;
            font-family: Avenir Next,Avenir,Avenir Next Local,sans-serif!important;
            .fontBoxDiv {
                font-size: 18px;
                margin-top: 10px;
                height: 50px;
                color: rgb(53, 56, 64);
            }
        }
    }
    .contentMid {
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-bottom: 10px;
    }
    .tableBox {
        
    }
    .headBox {
        display:flex;
        justify-content:center;
        align-items:center;
    }
`

const SearchStyled = styled.div`
    position: relative;
    input{
        // width: 652px;
        width: ${({width}) => width}px;
        height: 48px;
        box-sizing: border-box;
        font-family: 'Optima';
        font-size: 16px;
        font-weight: 700;
        border: 1px solid rgba(0,0,0,.2);
        padding: 0 16px;
        padding-left: 44px;
        background: url(${icon_search}) no-repeat;
        background-size: 16px 16px;
        background-position: 16px center;
        text-overflow: ellipsis;
        &::placeholder{
            color: rgba(0,0,0,.2);
        }

        &:focus{
            border: 1px solid rgba(0,0,0,.4);
            /* text-indent: 28px; */
        }
    }
`

const AntTabs = withStyles({
    root: {
    //   borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
      backgroundColor: '#000',
    },
  })(Tabs);
  
  const AntTab = withStyles((theme) => ({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        color: '#40a9ff',
        opacity: 1,
      },
      '&$selected': {
        color: '#000',
        fontWeight: theme.typography.fontWeightMedium,
        // 'border-bottom': '5px solid #000'
      },
      '&:focus': {
        color: '#40a9ff',
      },
    },
    selected: {
        color: '#000'
    },
  }))((props) => <Tab disableRipple {...props} />);

  const StyledTableCell = withStyles((theme) => ({
      root: {
        
      },
    head: {
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);


const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
    //   backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const IconPan = (props) => {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    )
}

export default function Ranking () {

    const { wrapperIntl } = useWrapperIntl()
    const [loading, setLoading] = useState(true)
    const poolsParmas = { offset: 0, count: 1e4 }
    const { sign_Axios } = useAxios();

    const NavList = [
      {
        title: wrapperIntl('Ranking.fangible'),
        route: "Fangible",
        channelRequestParam: "Fangible",
      },
      {
        title: wrapperIntl('Ranking.bsc'),
        route: "/",
        channelRequestParam: "Bsc",
      }
    ]

    const TabList = [
        {
            title: wrapperIntl('RankingTabs.All'),
            value: 'All'
        },
        {
            title: wrapperIntl('RankingTabs.New'),
            value: 'New'
        },
        {
            title: wrapperIntl('RankingTabs.Art'),
            value: 'Art'
        },
        {
            title: wrapperIntl('RankingTabs.Sports'),
            value: 'Sports'
        },
        {
            title: wrapperIntl('RankingTabs.Comics'),
            value: 'Comics'
        },
    ]
  
    // let { channel } = useParams()
    const [channel, setChannel] = useState('Fangible');
    const history = useHistory()
    const { active, chainId } = useActiveWeb3React()
    const [tabValue ,setTabValue] = useState('All');

    /** Ranking列表数据 */
    const [tableData, setTableData] = useState([]);
    const [defaultValue, setDefaultValue] = useState('Search');

    const searchHandle = (searchData) => {
        console.log('data', searchData.target.value);
    }

    /** 切换tab */
    const handleChangeTab = (e, v) => {
        console.log('----->>v', v);
        setTabValue(v);
    }

    useState(() => {
        setTableData([
            {
                collection: 'NFT',
                volume: 100,
                change: '100%',
                totalVolume: 10000,
                avgPrice: 5,
                owner: '3232',
                assets: '183465'
            },
            {
                collection: 'NFT',
                volume: 100,
                change: '100%',
                totalVolume: 10000,
                avgPrice: 5,
                owner: '3232',
                assets: '183465'
            },
            {
                collection: 'NFT',
                volume: 100,
                change: '100%',
                totalVolume: 10000,
                avgPrice: 5,
                owner: '3232',
                assets: '183465'
            },
            {
                collection: 'NFT',
                volume: 100,
                change: '100%',
                totalVolume: 10000,
                avgPrice: 5,
                owner: '3232',
                assets: '183465'
            },
            {
                collection: 'NFT',
                volume: 100,
                change: '100%',
                totalVolume: 10000,
                avgPrice: 5,
                owner: '3232',
                assets: '183465'
            }
        ])
    }, []);

    const initPools = async (params) => {
        const res = await axios.get('/pools', { params: params })
        if (res.data.code === 200) {
          setTableData(res.data.data)
        }
    }
    useEffect(() => {
        initPools(poolsParmas)
    }, [])

    // useEffect(() => {
    
    //     if (tableData) {
    //       const tradePools = (tableData.tradePools || []).map(item => ({
    //         ...item,
    //       })).filter(item => item.state !== 1)
    //       const tradeAuctions = (tableData.tradeAuctions || []).map(item => ({
    //         ...item,
    //         price: item.lastestBidAmount !== '0' ? item.lastestBidAmount : item.amountMin1,
    //       }))
    //         .filter(item => item.state !== 1 && item.poolId !== 0)
    
    
    //       setLoading(true)
    //       sign_Axios.post('', {})
    //         .then(res => {
    //           if (res.status === 200 && res.data.code === 1) {
    
    //             setLoading(false)
    //           }
    //         })
    //         .catch(() => {
    //           setLoading(false)
    //         })
    //     }
    //     // eslint-disable-next-line
    //   }, [active, tableData])

    return (
        <>
            <RankingStyled>
                <ul className="nav_wrapper">
                    {NavList.map(nav => {
                        return <li key={nav.title} className={channel === nav.route ? 'active' : ''} onClick={
                        () => {
                            history.push('/Marketplace/' + nav.route)
                        }}>
                        <p className="flex flex-center-y">{nav.title}</p>
                        </li>
                    })}
                    {/* {(active && localStorage.getItem('JWT_TOKEN_V2')) && <li className="link">
                        <Button onClick={() => { history.push('/MyMarket') }}>
                            {wrapperIntl('Ranking.myMarket')}
                        </Button>
                    </li>} */}
                </ul>
                <div className="contentBox">
                    <h1 className="fontBox">
                        Top Non-Fungible Tokens
                        <div className="fontBoxDiv">
                        Volume, average, price and other top statistics for non-fungible tokens (NFTs), updated hourly.
                        </div>
                    </h1>
                </div>
                <div className="contentMid">
                    <AntTabs value={tabValue} onChange={handleChangeTab} aria-label="ant example">
                        {
                            TabList.map((item, index) => {
                                return <AntTab label={item.title} key={index} value={item.value} />
                            })
                        }
                    </AntTabs>
                    {/* <Search placeholder={wrapperIntl('Ranking.placeholder')} onChange={searchHandle} width={'226px'}/> */}
                    <SearchStyled width={226}>
                    <input
                        type="text"
                        placeholder={wrapperIntl('Ranking.placeholder')}
                        defaultValue={defaultValue}
                        onKeyUp={(e) => {
                            e.stopPropagation();
                            e.nativeEvent.stopImmediatePropagation();
                            searchHandle(e)
                        }}
                        onChange={searchHandle}
                        onFocus={() => {setDefaultValue('')}}
                    />
                    </SearchStyled>
                </div>
                <div className="tableBox">
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <Tooltip title={wrapperIntl('RankingDescribe.Collections')} placement="top" arrow>
                                    <StyledTableCell align="center">{wrapperIntl('RankingTabs.Collections')}</StyledTableCell>
                                </Tooltip>
                                <Tooltip title={wrapperIntl('RankingDescribe.7DAY.Volume')} placement="top" arrow>
                                    <StyledTableCell align="center">{wrapperIntl('RankingTabs.7DAY.Volume')}</StyledTableCell>
                                </Tooltip>
                                <Tooltip title={wrapperIntl('RankingDescribe.7DAY.Change')} placement="top" arrow>
                                    <StyledTableCell align="center">{wrapperIntl('RankingTabs.7DAY.Change')}</StyledTableCell>
                                </Tooltip>
                                <Tooltip title={wrapperIntl('RankingDescribe.Total.Volume')} placement="top" arrow>
                                    <StyledTableCell align="center">{wrapperIntl('RankingTabs.Total.Volume')}</StyledTableCell>
                                </Tooltip>
                                <Tooltip title={wrapperIntl('RankingDescribe.Avg.Price')} placement="top" arrow>
                                    <StyledTableCell align="center">{wrapperIntl('RankingTabs.Avg.Price')}</StyledTableCell>
                                </Tooltip>
                                <Tooltip title={wrapperIntl('RankingDescribe.Owners')} placement="top" arrow>
                                    <StyledTableCell align="center">{wrapperIntl('RankingTabs.Owners')}</StyledTableCell>
                                </Tooltip>
                                <Tooltip title={wrapperIntl('RankingDescribe.Assets')} placement="top" arrow>
                                    <StyledTableCell align="center">{wrapperIntl('RankingTabs.Assets')}</StyledTableCell>
                                </Tooltip>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row, index) => (
                                <StyledTableRow key={row.name} style={{height: '68px'}}>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        <div className="headBox">
                                            <span>{index + 1}.</span>
                                            <IconPan color="secondary"/>
                                            <span>{row.collection}</span>
                                        </div>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.volume}</StyledTableCell>
                                    <StyledTableCell align="center">{row.change}</StyledTableCell>
                                    <StyledTableCell align="center">{row.totalVolume}</StyledTableCell>
                                    <StyledTableCell align="center">{row.avgPrice}</StyledTableCell>
                                    <StyledTableCell align="center">{row.owner}</StyledTableCell>
                                    <StyledTableCell align="center">{row.assets}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </div>
            </RankingStyled>
        </>
    )
}