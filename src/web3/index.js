import { useWeb3React } from '@web3-react/core'
import Web3 from "web3";

export function getContract(library, abi, address) {
    const web3 = new Web3(library.provider);
    return new web3.eth.Contract(abi, address)
}

export const useActiveWeb3React = () => {
    const context = useWeb3React()
    const type = window.localStorage.getItem('BOUNCE_SELECT_WALLET')
    return { ...context, type }
}