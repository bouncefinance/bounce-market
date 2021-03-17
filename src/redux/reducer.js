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

        default:
            return state
    }
}