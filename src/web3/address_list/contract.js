
const hostname = window.location.hostname
console.log(hostname)

export const getNFTFactory = (chainID) => {
    switch (chainID) {
        case 1:
            return ''
        case 4:
            return '0xb9BaC7b8C8ca157035E78e764bC3AD7D7BcCAb3A'
        case 56:
            if (hostname.indexOf('market.bounce.finance') !== -1) {
                return ''
            }
            return '0x092DEf18eCcDB576e51389771e295C4626014436'

        default:
            return '0xb9BaC7b8C8ca157035E78e764bC3AD7D7BcCAb3A'
    }
}

export const getBounceERC721WithSign = (chainID) => {
    switch (chainID) {
        case 1:
            return ''
        case 4:
            return '0xD9b73E3f331420C8bCBa26c98Fb7fbbCd2A682E7'
        case 56:
            if (hostname.indexOf('market.bounce.finance') !== -1) {
                return ''
            }
            return '0x479FCe86f116665b8a4d07165a0eB7799A4AEb30'

        default:
            return '0xD9b73E3f331420C8bCBa26c98Fb7fbbCd2A682E7'
    }
}

export const getBounceERC1155WithSign = (chainID) => {
    switch (chainID) {
        case 1:
            return ''
        case 4:
            return '0x57174694E5E1221709992B93C71d43eba7F5d73F'
        case 56:
            if (hostname.indexOf('market.bounce.finance') !== -1) {
                return ''
            }
            return '0xaAAeAe4283635358946E653883cD12E5c06cC5E3'

        default:
            return '0x57174694E5E1221709992B93C71d43eba7F5d73F'
    }
}

export const getFixedSwapNFT = (chainID) => {
    switch (chainID) {
        case 1:
            return ''
        case 4:
            return '0x65B2FA838588003102fb3883e608f8b0049BFDD1'
        case 56:
            if (hostname.indexOf('market.bounce.finance') !== -1) {
                return ''
            }
            return '0x1C035FD1F11eA9Bb753625fD167205Cd40029607'

        default:
            return '0x65B2FA838588003102fb3883e608f8b0049BFDD1'
    }
}

export const getEnglishAuctionNFT = (chainID) => {
    switch (chainID) {
        case 1:
            return ''
        case 4:
            return '0xFe8f5BaB50ff6a9d5C7eE4b598efDF792a6a5525'
        case 56:
            if (hostname.indexOf('market.bounce.finance') !== -1) {
                return ''
            }
            return '0x7eF2DECf116f8aeBb9a7940A4713C00997DF79fd'

        default:
            return '0xFe8f5BaB50ff6a9d5C7eE4b598efDF792a6a5525'
    }
}