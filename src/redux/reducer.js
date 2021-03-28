export const initState = {
    TransferModal: '', // Connect_Wallect
    userInfo: {},
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'UserInfo':
            return {
                ...state,
                userInfo: action.userInfo
            }

        case 'TransferModal':
            return {
                ...state,
                TransferModal: action.value
            }
        case 'Modal_Message':
            return { ...state, showMessageModal: action.showMessageModal,modelType: action.modelType,modelMessage:action.modelMessage }
        case 'Error_Notification':
            return { ...state, showErrorNotificationModal: action.showErrorNotificationModal}
        case 'Token':
            return { ...state, authToken: action.authToken}
        default:
            return state
    }
}