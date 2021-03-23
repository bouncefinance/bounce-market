export const initState = {
    TransferModal: '', // Connect_Wallect
    UserInfo: {}
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'UserInfo':
            return {
                ...initState,
                UserInfo: action.value
            }

        case 'TransferModal':
            return {
                ...initState,
                TransferModal: action.value
            }

        default:
            return state
    }
}