import useAxios from "./useAxios"
// import { getBounceERC721WithSign } from "@/web3/address_list/contract";
import BounceERC721WithSign from '@/web3/abi/BounceERC721WithSign.json'
import BounceERC1155WithSign from '@/web3/abi/BounceERC1155WithSign.json'
import BounceERC20 from '@/web3/abi/BounceERC20.json'
import { getContract, useActiveWeb3React } from "@/web3";
import { equalAddress } from "./compareFun";
import { ZERO_ADDRESS } from "@/web3/address_list/token";
import Web3 from "web3";
import { weiToNum } from "./useBigNumber";
import axios from "axios";

export default function useToken() {
    const { library, account, chainId } = useActiveWeb3React()
    const { sign_Axios } = useAxios()

    const exportNftInfo = async (nftId) => {
        if (!nftId) {
            // console.log('error, nftId is ' + nftId)
            return {}
        }
        try {
            const res = await sign_Axios.post('/api/v2/main/auth/getoneitembyid', { id: parseInt(nftId) })
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
        console.log(ownerAddress)
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
        const approveRes = await BounceERC1155WithSign_CT.methods.isApprovedForAl(accountAddr, tarContract).call()
        return approveRes
    }

    const exportErc20Info = async (tokenAddr) => {
        if (tokenAddr === ZERO_ADDRESS) {
            const web3 = new Web3(library.provider)
            const balanceOf = await web3.eth.getBalance(account)
            return {
                chainId,
                decimals: 18,
                symbol: chainId === 56 || chainId === 97 ? 'BNB' : 'ETH',
                balanceOf,
                balance: weiToNum(balanceOf, 18),
                price: chainId === 56 || chainId === 97 ? await queryPrice('BNB') : await queryPrice('ETH')
            }
        }
        const BounceERC20_CT = getContract(library, BounceERC20.abi, tokenAddr)
        const decimals = await BounceERC20_CT.methods.decimals().call()
        const symbol = await BounceERC20_CT.methods.symbol().call()
        const balanceOf = await BounceERC20_CT.methods.balanceOf(account).call()
        const price = queryPrice(symbol)


        return {
            chainId,
            decimals,
            symbol,
            balanceOf,
            balance: weiToNum(balanceOf, decimals),
            price
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
        }
        const res = await axios.get('https://dncapi.bqrank.net/api/v2/Coin/market_ticker?page=1&pagesize=1&code=' + code)
        if (res.data.code === 200) {
            console.log(res)
            price = res.data.data[0].price
        }
        return price
    }

    return {
        exportNftInfo,
        hasApprove_ERC_721,
        hasApprove_ERC_1155,
        isOwner_ERC_721,
        exportErc20Info
    }
}
