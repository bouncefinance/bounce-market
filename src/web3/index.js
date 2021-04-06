import { useWeb3React } from '@web3-react/core'
import Web3 from "web3";

export function getContract(library, abi, address) {
    let web3 = null
    if(library){
        web3 = new Web3(library.provider)
    }else{
        web3 = new Web3('https://rinkeby.infura.io/v3/8f6d3d5d7a1442a38d9e8050c31c1884')
    }
    // const web3 = new Web3(library.provider);
    return new web3.eth.Contract(abi, address)
}

export const useActiveWeb3React = () => {
    const context = useWeb3React()
    const type = window.localStorage.getItem('BOUNCE_SELECT_WALLET')
    return { ...context, type }
}