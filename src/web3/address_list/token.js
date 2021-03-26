export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const getAUCTIONAddr = (chainId) => {
    switch (chainId) {
        case 1:
            return '0xa9b1eb5908cfc3cdf91f9b8b3a74108598009096'
        case 4:
            return '0x5e26fa0fe067d28aae8aff2fb85ac2e693bd9efa'
        case 56:
            return '0x1188d953aFC697C031851169EEf640F23ac8529C'
        default:
            return '0x5bEaBAEBB3146685Dd74176f68a0721F91297D37'
    }
}

export function getBotAddress(chainId) {
    switch (chainId) {
        case 1:
            return '0x5bEaBAEBB3146685Dd74176f68a0721F91297D37'
        case 4:
            return '0xAbF690E2EbC6690c4Fdc303fc3eE0FBFEb1818eD'
        case 56:
            return '0x48DC0190dF5ece990c649A7A07bA19D3650a9572'
        default:
            return '0x5bEaBAEBB3146685Dd74176f68a0721F91297D37'
    }
}

export function getUSDTAddress(chainId) {
    switch (chainId) {
        case 1:
            return '0xdac17f958d2ee523a2206206994597c13d831ec7'
        case 4:
            return '0x101194a3FF67f83A05B3E15AfA52D45D588614ca'
        case 97:
            return ''
        case 56:
            return '0x55d398326f99059ff775485246999027b3197955'
        default:
            return '0xdac17f958d2ee523a2206206994597c13d831ec7'
    }
};


export function getWBTCAddress(chainId) {
    switch (chainId) {
        case 1:
            return '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
        case 4:
            return '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
        case 97:
            return ''
        case 56:
            return '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
        default:
            return '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
    }
};


export function getYFIAddress(chainId) {
    switch (chainId) {
        case 1:
            return '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e'
        case 4:
            return '0xBA8913A83C899dDB0F071bf64f7a1A299B578758'
        case 97:
            return ''
        case 56:
            return ''
        default:
            return '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e'
    }
};
