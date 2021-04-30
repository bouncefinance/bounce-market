
const hostname = window.location.hostname
console.log(hostname)

export const getNFTFactory = (chainID) => {
    switch (chainID) {
        case 1:
            return ''
        case 4:
            return '0xb9BaC7b8C8ca157035E78e764bC3AD7D7BcCAb3A'
        case 56:
            if (hostname.indexOf('market.bounce.finance') !== -1 || hostname.includes('127.0.0.1')
                || hostname.includes('fangible') || hostname.includes('cnmarket.bounce.finance')) {
                return '0xd0DAb597286e248fE5c30494a2D2ea138652890c'
            }
            return '0xf3af2a1b601c84033F1dEcc4aFE37E586A49f990'

        default:
            return '0xf3af2a1b601c84033F1dEcc4aFE37E586A49f990'
    }
}

export const getBounceERC721WithSign = (chainID) => {
    switch (chainID) {
        case 1:
            return ''
        case 4:
            return '0xD9b73E3f331420C8bCBa26c98Fb7fbbCd2A682E7'
        case 56:
            if (hostname.indexOf('market.bounce.finance') !== -1 || hostname.includes('127.0.0.1')
                || hostname.includes('fangible') || hostname.includes('cnmarket.bounce.finance')) {
                return '0xbf4f70215e8f99e384afdf641e55181155714163'
            }
            return '0x479FCe86f116665b8a4d07165a0eB7799A4AEb30'

        default:
            return '0x479FCe86f116665b8a4d07165a0eB7799A4AEb30'
    }
}

export const getBounceERC1155WithSign = (chainID) => {
    switch (chainID) {
        case 1:
            return ''
        case 4:
            return '0x57174694E5E1221709992B93C71d43eba7F5d73F'
        case 56:
            if (hostname.indexOf('market.bounce.finance') !== -1 || hostname.includes('127.0.0.1')
                || hostname.includes('fangible') || hostname.includes('cnmarket.bounce.finance')) {
                return '0x9f24433c60b51d2271c064028faab5da47cc714e'
            }
            return '0xaAAeAe4283635358946E653883cD12E5c06cC5E3'

        default:
            return '0xaAAeAe4283635358946E653883cD12E5c06cC5E3'
    }
}

export const getFixedSwapNFT = (chainID) => {
    switch (chainID) {
        case 1:
            return ''
        case 4:
            return '0x65B2FA838588003102fb3883e608f8b0049BFDD1'
        case 56:
            if (hostname.indexOf('market.bounce.finance') !== -1 || hostname.includes('127.0.0.1')
                || hostname.includes('fangible') || hostname.includes('cnmarket.bounce.finance')) {
                return '0x58E84d90fd976A183bEfB36a69caB464bef18cC5'
            }
            return '0x1C035FD1F11eA9Bb753625fD167205Cd40029607'

        default:
            return '0x1C035FD1F11eA9Bb753625fD167205Cd40029607'
    }
}

export const getEnglishAuctionNFT = (chainID) => {
    switch (chainID) {
        case 1:
            return ''
        case 4:
            return '0xFe8f5BaB50ff6a9d5C7eE4b598efDF792a6a5525'
        case 56:
            if (hostname.indexOf('market.bounce.finance') !== -1 || hostname.includes('127.0.0.1')
                || hostname.includes('fangible') || hostname.includes('cnmarket.bounce.finance')) {
                return '0x780451a32959A96789F99398dEb6678d2c438EB4'
            }
            return '0x7eF2DECf116f8aeBb9a7940A4713C00997DF79fd'

        default:
            return '0x7eF2DECf116f8aeBb9a7940A4713C00997DF79fd'
    }
}