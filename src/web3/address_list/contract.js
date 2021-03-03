export const getBotAddr = (chainID) => {
    switch (chainID) {
        case 1:
            return '0x主网地址'
        case 4:
            return '0x测试网地址'
        case 56:
            return '0x币安网地址'

        default:
            return '0x主网地址'
    }
}

export const getAUCTIONAddr = (chainID) => {
    switch (chainID) {
        case 1:
            return '0x主网地址'
        case 4:
            return '0x测试网地址'
        case 56:
            return '0x币安网地址'

        default:
            return '0x主网地址'
    }
}