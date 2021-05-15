import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import { useActiveWeb3React } from '@/web3'
import useWrapperIntl from '@/locales/useWrapperIntl'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import useAxios from '@/utils/useAxios'
import SortHeader from './sortHeader';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import icon_search from '../component/Other/assets/search.svg'


import { apiGetRankingList } from './APIController';
import { Controller } from "@/utils/controller";
import { SkeletonTableRowCards } from '../component/Skeleton/TableRow'
import { throttle } from '@/utils/utils';



const RankingStyled = styled.div`
    width: 1100px;
    flex: 1;
    margin: 0 auto;
    margin-bottom: 30px;

    .nav_wrapper{
        width: 1100px;
        margin: 0 auto;
        margin-top: 40px;
        display: flex;;
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
        justify-content:flex-start;
        align-items:center;
        margin-left: 20%;
        span {
            text-align: center
        }
        .boxImage {
            width: 22px;
            margin-right: 6px;
            img {
               width: 100%;
               height: 22px; 
            }
        }
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

// const IconPan = (props) => {
//     return (
//         <SvgIcon {...props}>
//             <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
//         </SvgIcon>
//     )
// }

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }));

const params = { offset: 0, count: 100 };

export default function Ranking () {

    const classes = useStyles();
    const { sign_Axios } = useAxios();

    const { wrapperIntl } = useWrapperIntl()
    const [loading, setLoading] = useState(true)
    // const params = { offset: 0, count: 100 };
    // const [params, setParams] = useState({ offset: 0, count: 100 });
    const [searchCount, setSearchCount] = useState(0)

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
  
    const [channel, setChannel] = useState('Fangible');
    const history = useHistory()
    const { active } = useActiveWeb3React()
    const [tabValue ,setTabValue] = useState('All');

    /** Ranking列表数据 */
    const [tableData, setTableData] = useState([]);
    const [defaultValue, setDefaultValue] = useState('Search');

    /** 排序参数 */
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('dayVolume');

    const searchRef = useRef(null);

    const searchHandle = (event) => {
        let searchValue = event.target.value
        if (!searchValue) {
            setTableData([]);
            setLoading(true)
            setSearchCount(searchCount + 1);
            return;
            // return initData();
        }
        let result = tableData.filter(v => {
            if (v.brandname) {
                return ~v.brandname?.toLowerCase().indexOf(searchValue.toLowerCase())
            }
            return false;
        });
        setTableData(result);
    }

    const searchHandleKey = (e) => {
        if (e.keyCode === 13) {
            searchHandle(e)
        }
    }

    const handleFocus = () => {
        setDefaultValue('')
        if (defaultValue) searchRef.current.value = '';
    }

    /** 切换tab，筛选列表 */
    const handleChangeTab = (e, v) => {
        setTabValue(v);
    }

    useEffect(() => {

            /** 初始化数据 */
    const initData = async (params) => {
        try {
            const res = await apiGetRankingList(params);
            if (res?.data?.code === 200) {
                let tokens = res?.data.data.map(item => item.token);

                let contractData = [];
                let rt = await sign_Axios.post(Controller.brands.getbrandsbyfilter, { Brandcontractaddressess: tokens });
                if (rt && rt.data.code === 1) {
                    contractData = rt.data.data;
                    setLoading(false)
                }
                
                let realData = res.data.data.map(v => {
                    let indexContractData = contractData?.find(c => c.contractaddress.toLowerCase() === v.token.toLowerCase());
                    v.imgurl = indexContractData?.imgurl;
                    v.brandname = indexContractData?.brandname;
                    v.ownername = indexContractData?.ownername;
                    return v;
                })

            setTableData(realData)
            }
        } catch (e) {
            console.log('e', e);
            setLoading(false);
        }
    }
        initData(params)
        setChannel('Fangible')
        // eslint-disable-next-line
    }, [active, searchCount])


    const headerCellData = [
        { key: 'collections', numeric: false, disablePadding: true, sortable: false, label: 'RankingTabs.Collections', intlSpan:'RankingDescribe.Collections' },
        { key: 'volume', numeric: false, disablePadding: true, sortable: true, label: 'RankingTabs.7DAY.Volume', intlSpan: 'RankingDescribe.7DAY.Volume' },
        { key: 'change', numeric: false, disablePadding: true, sortable: true, label: 'RankingTabs.7DAY.Change', intlSpan: 'RankingDescribe.7DAY.Change' },
        { key: 'total', numeric: false, disablePadding: true, sortable: true, label: 'RankingTabs.Total.Volume', intlSpan: 'RankingDescribe.Total.Volume' },
        { key: 'avg', numeric: false, disablePadding: true, sortable: true, label: 'RankingTabs.Avg.Price', intlSpan: 'RankingDescribe.Avg.Price' },
        { key: 'owners', numeric: false, disablePadding: true, sortable: true, label: 'RankingTabs.Owners', intlSpan: 'RankingDescribe.Owners' },
        { key: 'asstes', numeric: false, disablePadding: true, sortable: true, label: 'RankingTabs.Assets', intlSpan: 'RankingDescribe.Assets' },
    ]

    /** 表头排序处理 */
    const handleRequestSort = (e, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    const compareDescending = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const getCompare = (order, orderBy) => {
        return order === 'desc' ? 
            (a, b) => compareDescending(a, b, orderBy) :
            (a, b) => -compareDescending(a, b, orderBy);
    }

    const stableSort = (arr, comparator) => {
        const wrapperArr = arr.map((item, index) =>[item, index]);
        wrapperArr.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order) return order;
            return a[1] - b[1];
        })

        return wrapperArr.map(item => item[0]);
    }

    /** 解析千分位数字 */
    const formatMonney = (str) => {
        return String(str).replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')
    }

    return (
        <>
            <RankingStyled>
                <ul className="nav_wrapper">
                    {NavList.map(nav => {
                        return <li key={nav.title} className={channel === nav.route ? 'active' : ''} onClick={
                        () => {
                            history.push('/Ranking')
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
                    <SearchStyled width={226}>
                    <input
                        type="text"
                        ref={searchRef}
                        placeholder={wrapperIntl('Ranking.placeholder')}
                        defaultValue={defaultValue}
                        onKeyUp={(e) => {
                            console.log('up');
                            e.stopPropagation();
                            e.nativeEvent.stopImmediatePropagation();
                            throttle(searchHandleKey(e), 1000)
                        }}
                        onChange={(e) => throttle(searchHandle(e), 1000) }
                        onFocus={() => {handleFocus()}}
                    />
                    </SearchStyled>
                </div>
                <div className="tableBox">
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        {/* <TableHead>
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
                        </TableHead> */}
                        <SortHeader
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            headCells={headerCellData}
                        />
                        <TableBody>
                            {stableSort(tableData, getCompare(order, orderBy)).map((row, index) => (
                                <StyledTableRow key={index} style={{height: '68px'}}>
                                    <StyledTableCell scope="row" align="right">
                                        <div className="headBox">
                                            <span style={{marginRight: '9px'}}>{index + 1}.</span>
                                                {
                                                    row.imgurl && <div className="boxImage"><img src={row.imgurl} alt="" className="cellImage" style={{width: '22px', height: '22px', borderRadius: '50%'}}/></div> 
                                                }
                                            <span>{row.brandname || 'brandName'}</span>
                                        </div>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.volume}</StyledTableCell>
                                    <StyledTableCell align="center"><span style={{color: row.change >= 0 ? '#3ab971': '#de5a4d'}}>{row.change / 100}%</span></StyledTableCell>
                                    <StyledTableCell align="center">${formatMonney(row.total)}</StyledTableCell>
                                    <StyledTableCell align="center">${formatMonney(row.avg)}</StyledTableCell>
                                    <StyledTableCell align="center">{row.owners}</StyledTableCell>
                                    <StyledTableCell align="center">{formatMonney(row.assets)}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                { loading && <SkeletonTableRowCards n={4}/> }
                </div>
            </RankingStyled>
        </>
    )
}