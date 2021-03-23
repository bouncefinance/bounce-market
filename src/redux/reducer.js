export const initState = {
    TransferModal: '', // Connect_Wallect
    UserInfo: {},
    Show_Modal: null, // Connect_Wallect
    showMessageModal: false,
    showErrorNotificationModal:false,
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
        case 'Modal_Message':
            return { ...initState, showMessageModal: action.showMessageModal,modelType: action.modelType,modelMessage:action.modelMessage }
        case 'Error_Notification':
            return { ...initState, showErrorNotificationModal: action.showErrorNotificationModal}
        default:
            return state
    }
}