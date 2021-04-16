import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";


const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 56, 128, 31337]
});

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
    1: "https://mainnet.infura.io/v3/0b500c5f885b43a4ab192e8048f6fa88",
    4: "https://rinkeby.infura.io/v3/8f6d3d5d7a1442a38d9e8050c31c1884",
    56: "https://bsc-dataseed4.binance.org",
    128:"https://http-mainnet.hecochain.com"
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

    const setItem = (name) => window && window.localStorage.setItem('BOUNCE_SELECT_WALLET', name)
    function onConnect (name = 'MetaMask', setIsLoading) {
        setIsLoading && setIsLoading(true)
        const type = window.localStorage.getItem('BOUNCE_SELECT_WALLET')
        const close = () => {
            setIsLoading && setIsLoading(false)
        }
        if (!type) {
            getMetaMskAccount().then((account) => {
                if (account) {
                    setItem(name)
                    window.location.reload()
                }
                close()
            })
            return
        }
        activate(wallets[name]).finally(() => {
            setItem(name)
            close()
        })
    }

    return { onConnect }
}

export const getMetaMskAccount = () => {
    return new Promise((resolve, reject) => {
    if (typeof window.ethereum === 'undefined') {
      alert('Looks like you need a Dapp browser to get started.')
      alert('Consider installing MetaMask!')
    } else {
      //如果用户安装了MetaMask，你可以要求他们授权应用登录并获取其账号
      window.ethereum.enable()
        //如果用户拒绝了登录请求
        .catch(function (reason) {
          resolve('')
          if (reason === 'User rejected provider access') {
            // 用户不想登录，你看该怎么办？
          } else {
            // 本不该执行到这里，但是真到这里了，说明发生了意外
            // alert('There was an issue signing you in.')
              resolve()
          }
        })

        .then(function (accounts) {

          const account = accounts?.[0]
          resolve(account)

        })

    }
  })
}