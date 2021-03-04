import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";


const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 56, 31337]
});

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
    1: "https://mainnet.infura.io/v3/0b500c5f885b43a4ab192e8048f6fa88",
    4: "https://rinkeby.infura.io/v3/8f6d3d5d7a1442a38d9e8050c31c1884"
};

const walletconnect = new WalletConnectConnector({
    rpc: { 1: RPC_URLS[1] },
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    pollingInterval: POLLING_INTERVAL
});

const wallets = {
    'MetaMask': injected,
    'WalletConnect': walletconnect,
}

export const useWalletConnect = () => {
    const {
        activate
    } = useWeb3React()


    function onConnect(name, setIsLoading) {
        window && window.localStorage.setItem('BOUNCE_SELECT_WALLET', name)
        setIsLoading && setIsLoading(true)
        activate(wallets[name]).finally(() => {
            setIsLoading && setIsLoading(false)
        })
    }

    return { onConnect }
}
