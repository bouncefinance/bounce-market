export const initState = {
    Show_Modal: null, // Connect_Wallect
    showMessageModal: false,
    showErrorNotificationModal:false,
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'Show_Modal':
            return {
                ...initState,
                Show_Modal: action.value
            }
        case 'Modal_Message':
            return { ...initState, showMessageModal: action.showMessageModal,modelType: action.modelType,modelMessage:action.modelMessage }
        case 'Error_Notification':
            return { ...initState, showErrorNotificationModal: action.showErrorNotificationModal}
        default:
            return state
    }
}