export const initState = {
    Show_Modal: null, // Connect_Wallect
    Modal_Message: false,
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'Show_Modal':
            return {
                ...initState,
                Show_Modal: action.value
            }
        case 'Modal_Message':
            return { ...state, showMessageModal: action.showMessageModal,modelType: action.modelType,modelMessage:action.modelMessage }
        default:
            return state
    }
}