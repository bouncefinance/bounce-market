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
            return {
                ...state,
                showMessageModal: action.showMessageModal,
                modelType: action.modelType,
                modelMessage:action.modelMessage,
                modelUrlMessage:action.modelUrlMessage,
                modelOpenUrl:action.modelOpenUrl,
                modelTimer:action.modelTimer,
                subsequentActionType:action.subsequentActionType,
                canClose: action.canClose===false ? action.canClose : true,
            }
        case 'Error_Notification':
            return { ...state, showErrorNotificationModal: action.showErrorNotificationModal}
        case 'Token':
            return { ...state, authToken: action.authToken}
        default:
            return state
    }
}