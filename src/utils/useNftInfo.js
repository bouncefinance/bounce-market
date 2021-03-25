import useAxios from "./useAxios"
// import { getBounceERC721WithSign } from "@/web3/address_list/contract";
import BounceERC721WithSign from '@/web3/abi/BounceERC721WithSign.json'
import BounceERC1155WithSign from '@/web3/abi/BounceERC1155WithSign.json'
import { getContract, useActiveWeb3React } from "@/web3";
import { equalAddress } from "./compareFun";

export default function useNftInfo() {
    const { library, account } = useActiveWeb3React()
    const { sign_Axios } = useAxios()

    const exportNftInfo = async (nftId) => {
        if (!nftId) {
            console.log('error, nftId is' + nftId)
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
        if (equalAddress(ownerAddress, accountAddr)){
            return true
        }else{
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

    const hasApprove_ERC_1155 = async (tokenContract, tarContract,accountAddr = account) => {
        const BounceERC1155WithSign_CT = getContract(library, BounceERC1155WithSign.abi, tokenContract)
        const approveRes = await BounceERC1155WithSign_CT.methods.isApprovedForAl(accountAddr, tarContract).call()
        return approveRes
    }

    return {
        exportNftInfo,
        hasApprove_ERC_721,
        hasApprove_ERC_1155,
        isOwner_ERC_721
    }
}
