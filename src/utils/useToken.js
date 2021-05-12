import useAxios from "./useAxios"
// import { getBounceERC721WithSign } from "@/web3/address_list/contract";
import BounceERC721WithSign from '@/web3/abi/BounceERC721WithSign.json'
import BounceERC1155WithSign from '@/web3/abi/BounceERC1155WithSign.json'
import BounceERC20 from '@/web3/abi/BounceERC20.json'
import { getContract, useActiveWeb3React } from "@/web3";
import { equalAddress } from "./compareFun";
import { ZERO_ADDRESS } from "@/web3/address_list/token";
import Web3 from "web3";
import { weiDiv, weiToNum } from "./useBigNumber";
import axios from "axios";

// import { getUSDTAddress, getBUSDAddress, getUSDCAddress } from "@/web3/address_list/token";

// import icon_BNB from '@assets/images/wallet/icon_BNB.svg'
// import icon_BUSD from '@assets/images/wallet/icon_BUSD.png'
// import icon_ETH_new from '@assets/images/wallet/icon_ETH_new.svg'
// import icon_USDT from '@assets/images/wallet/icon_USDT.svg'
// import icon_USDC from '@assets/images/wallet/icon_USDC.svg'

export default function useToken() {
    const { library, account, chainId } = useActiveWeb3React()
    const { sign_Axios } = useAxios()

    const exportNftInfoV2 = async (nftId) => {
        if (!nftId) {
            // console.log('error, nftId is ' + nftId)
            return {}
        }
        // console.log(nftId)
        if (nftId.includes('-')) {
            const [contract, tokenId] = nftId.split('-')
            console.log(contract, tokenId)
            const info = await exportNftInfoByAddressAndTokenId(contract, tokenId)
            return info
        }
    }

    const exportNftInfoByAddressAndTokenId = async (contract, tokenId) => {
        // console.log(contract, tokenId)
        if (!contract && !tokenId) return
        const params = {
            id: Number(tokenId),
            ct: contract
        }
        try {
            const res = await sign_Axios.post('/api/v2/main/auth/getoneitembyid', params)
            if (res.status === 200 && res.data.code === 1) {
                return res.data.data || {}
            } else {
                return {}
            }
        } catch (error) {
            return {
                error
            }
        }
    }

    const exportArrayNftInfo = async (nftIdArray, category = '', channel = '') => {
        if (!nftIdArray) {
            // console.log('error, nftId is ' + nftId)
            return {}
        }
        try {
            const res = await sign_Axios.post('/api/v2/main/auth/getitemsbyfilter', { ids: nftIdArray, category, channel })
            if (res.status === 200 && res.data.code === 1) {
                return res.data.data
            } else {
                return {}
            }
        } catch (error) {
            return {
                error
            }
        }
    }

    const isOwner_ERC_721 = async (tokenContract, nftId, accountAddr = account) => {
        const BounceERC721WithSign_CT = getContract(library, BounceERC721WithSign.abi, tokenContract)
        const balance = await BounceERC721WithSign_CT.methods.balanceOf(accountAddr).call()
        if (parseInt(balance) > 0) {
            // 拥有此 NFT某个id
        }
        const ownerAddress = await BounceERC721WithSign_CT.methods.ownerOf(parseInt(nftId)).call()
        // console.log(ownerAddress)
        if (equalAddress(ownerAddress, accountAddr)) {
            return true
        } else {
            return false
        }
    }

    const hasApprove_ERC_721 = async (tokenContract, nftId, tarContract) => {
        const BounceERC721WithSign_CT = getContract(library, BounceERC721WithSign.abi, tokenContract)
        const approveAddress = await BounceERC721WithSign_CT.methods.getApproved(parseInt(nftId)).call()
        console.log('approveAddress', approveAddress)
        if (equalAddress(tarContract, approveAddress)) {
            return true
        } else {
            return false
        }
    }

    const hasApprove_ERC_1155 = async (tokenContract, tarContract, accountAddr = account) => {
        const BounceERC1155WithSign_CT = getContract(library, BounceERC1155WithSign.abi, tokenContract)
        console.log(BounceERC1155WithSign_CT);
        const approveRes = await BounceERC1155WithSign_CT.methods.isApprovedForAll(accountAddr, tarContract).call()
        return approveRes
    }

    const getBalance_ERC_1155 = async (tokenContract, nftId, accountAddr = account) => {
        const BounceERC1155WithSign_CT = getContract(library, BounceERC1155WithSign.abi, tokenContract)
        const balance = await BounceERC1155WithSign_CT.methods.balanceOf(accountAddr, nftId).call()
        return balance
    }
    const getBalance_ERC_721 = async (tokenContract, nftId, accountAddr = account) => {
        const BounceERC721WithSign_CT = getContract(library, BounceERC721WithSign.abi, tokenContract)
        const balance = await BounceERC721WithSign_CT.methods.balanceOf(accountAddr).call()
        return balance
    }
    const getAccountHasNftCount = async (tokenContract, tokenId, account) => {
        try {
            const BounceERC721WithSign_CT = getContract(library, BounceERC721WithSign.abi, tokenContract)
            const ownerAddress = await BounceERC721WithSign_CT.methods.ownerOf(parseInt(tokenId)).call()
            return ownerAddress?.toLowerCase() === account?.toLowerCase() ? 1 : 0
        } catch (error) {
            const BounceERC1155WithSign_CT = getContract(library, BounceERC1155WithSign.abi, tokenContract)
            const balance = await BounceERC1155WithSign_CT.methods.balanceOf(account, parseInt(tokenId)).call()
            return balance
        }
    }

    const exportErc20Info = async (tokenAddr, flag) => {
        let _chainId = chainId || window.localStorage.LastChainId
        let price = 0
        let web3
        if ((typeof web3 !== 'undefined') && !chainId) {
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed4.binance.org'));
        }

        if (tokenAddr === ZERO_ADDRESS) {
            const balanceOf = account ? await web3.eth.getBalance(account) : 0
            if (flag) {
                price = _chainId === 56 || _chainId === 97 ? await queryPrice('BNB') : _chainId === 128 ? await queryPrice('HT') : await queryPrice('ETH')
            }
            return {
                chainId: _chainId,
                contract: tokenAddr,
                decimals: 18,
                symbol: _chainId === 1 || _chainId === 4 ? 'ETH' : _chainId === 128 ? 'HT' : 'BNB',
                balanceOf,
                balance: weiToNum(balanceOf),
                price
            }
        }


        // console.log(web3, tokenAddr)

        let BounceERC20_CT = library ? getContract(library, BounceERC20.abi, tokenAddr) : new web3.eth.Contract(BounceERC20.abi, tokenAddr)


        const decimals = await BounceERC20_CT.methods.decimals().call()
        const symbol = await BounceERC20_CT.methods.symbol().call()
        const balanceOf = '0' //account ? await BounceERC20_CT.methods.balanceOf(account).call() : '0'

        if (flag) {
            price = await queryPrice(symbol)
        }


        return {
            chainId,
            contract: tokenAddr,
            decimals: parseInt(decimals),
            symbol,
            balanceOf,
            balance: weiToNum(balanceOf, decimals),
            price
        }
    }

    const hasApprove_ERC_20 = async (token, spender, amount = '1', accountAddr = account) => {
        const BounceERC20_CT = getContract(library, BounceERC20.abi, token)
        const allowance = await BounceERC20_CT.methods.allowance(accountAddr, spender).call()
        console.log(allowance)
        if (parseFloat(weiDiv(allowance, amount)) < 1) {
            return false
        } else {
            return true
        }
    }

    const queryPrice = async (tokenSymbol) => {
        let price = 0
        let code = 'ethereum'
        if (String(tokenSymbol).toLowerCase() === 'bnb') {
            code = 'binance-coin'
        } else if (String(tokenSymbol).toLowerCase() === 'auction') {
            code = 'auction'
        } else if (String(tokenSymbol).toLowerCase() === 'btc') {
            code = 'bitcoin'
        } else if (String(tokenSymbol).toLowerCase() === 'ht') {
            code = 'ht'
        } else if (String(tokenSymbol).toLowerCase() === 'usdt' || String(tokenSymbol).toLowerCase() === 'busd' || String(tokenSymbol).toLowerCase() === 'usdc') {
            return 1
        }
        try {
            const res = await axios.get('https://dncapi.bqrank.net/api/v2/Coin/market_ticker?page=1&pagesize=1&code=' + code)
            if (res.data.code === 200) {
                // console.log(res)
                price = res.data.data[0].price
            }
            return price
        } catch (error) {
            return 0
        }
    }

    const getPriceByToken1 = async (_price, token1) => {
        if (!_price || !token1) return {}
        const { symbol, decimals } = await exportErc20Info(token1)
        const price = weiToNum(_price, decimals)
        return { price, symbol }
    }

    return {
        exportNftInfoV2,
        exportArrayNftInfo,
        hasApprove_ERC_721,
        hasApprove_ERC_1155,
        isOwner_ERC_721,
        exportErc20Info,
        getBalance_ERC_1155,
        getBalance_ERC_721,
        hasApprove_ERC_20,
        getPriceByToken1,
        queryPrice,
        getAccountHasNftCount,
        // tokenList
        exportNftInfoByAddressAndTokenId
    }
}