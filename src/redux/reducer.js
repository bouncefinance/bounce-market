export const initState = {
    Show_Modal: null, // Connect_Wallect
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'Show_Modal':
            return {
                ...initState,
                Show_Modal: action.value
            }

            case 'CONNECT_WALLET':
                return {
                    ...initState,
                    CONNECT_WALLET: action.value
                }

        default:
            return state
    }
}