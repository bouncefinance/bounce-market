export const getFixedSwapNFT = (chainID) => {
    switch (chainID) {
        case 1:
            return ''
        case 4:
            return '0xDb922B6D4dF57a44e0faC7d3A8AA052f5af1af93'
        case 56:
            return ''

        default:
            return '0xDb922B6D4dF57a44e0faC7d3A8AA052f5af1af93'
    }
}

export const getNFTFactory = (chainID) => {
    switch (chainID) {
        case 1:
            return ''
        case 4:
            return '0xb9BaC7b8C8ca157035E78e764bC3AD7D7BcCAb3A'
        case 56:
            return ''

        default:
            return '0xb9BaC7b8C8ca157035E78e764bC3AD7D7BcCAb3A'
    }
}