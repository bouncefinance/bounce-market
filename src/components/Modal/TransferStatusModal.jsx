import Modal, { ModalContent, ModalTitle ,ModalIcon} from "./OldBounceModal";
import Lottie from "react-lottie";
import icon_wait from "@assets/images/status_wait.svg";
import styled from 'styled-components'
import icon_success from "@assets/images/status_success.svg";
import icon_error from "@assets/images/status_error.svg";
import { Button } from "@components/UI-kit";
import React, { useContext, useEffect, useState } from "react";
import bounce_loading from "@assets/videos/bounce_loading.json";
import { myContext } from "@/redux";
import useWrapperIntl from '@/locales/useWrapperIntl'

const TransferStatusModalStyled = styled.div`
    .modal_box{
        /* img{
            width: 50px;
            height: 50px;
        } */
    }
`

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: bounce_loading,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

export const useStatus = () => {
    const { wrapperIntl } = useWrapperIntl()
    const status = {
        approveStatus : { 
            status: 1,
            title: wrapperIntl("TransferStatusModal.title1"),
            content: wrapperIntl("TransferStatusModal.content1"),
        },
        confirmStatus : { 
            status: 2,
            title: wrapperIntl("TransferStatusModal.title2"),
            content: wrapperIntl("TransferStatusModal.content2"),
        },
        pendingStatus : { 
            status: 3,
            title: wrapperIntl("TransferStatusModal.title3"),
            content: wrapperIntl("TransferStatusModal.content3"),
        },
        successStakeStatus : { 
            status: 4,
            title: wrapperIntl("TransferStatusModal.title4"),
            content: wrapperIntl("TransferStatusModal.content4"),
        },
        successUnStakeStatus : { 
            status: 5,
            title: wrapperIntl("TransferStatusModal.title5"),
            content: wrapperIntl("TransferStatusModal.content5"),
        },
        errorStatus : { 
            status: -1,
            title: wrapperIntl("TransferStatusModal.title-1"),
            content: wrapperIntl("TransferStatusModal.content-1"),
        },
        cancelStatus : { 
            status: -2,
            title: wrapperIntl("TransferStatusModal.title-2"),
            content: wrapperIntl("TransferStatusModal.content-2"),
        },
        initStatus : { 
            status: 0,
            title: '',
            content: '' },
        successClaimStatus : { 
            status: 6,
            title: wrapperIntl("TransferStatusModal.title6"),
            content: wrapperIntl("TransferStatusModal.content6"),
        },
        successStatus : { 
            status: 7,
            title: wrapperIntl("TransferStatusModal.title7"),
            content: wrapperIntl("TransferStatusModal.content7"),
        },
    }
    return status
}



/* export const approveStatus = { status: 1, title: 'Bounce Requests Approval', content: 'Please enable Bounce to access your tokens' }
export const confirmStatus = { status: 2, title: 'Waiting for confirmation', content: 'Confirm this transaction in your wallet' }
export const pendingStatus = { status: 3, title: 'Loading', content: 'Please wait a little' }
export const successStakeStatus = { status: 4, title: 'Your BOT was Staked', content: 'You can claim your principle' }
export const successUnStakeStatus = { status: 5, title: 'Your BOT was Unstaked', content: 'You successfully unstake your token' }

export const errorStatus = { status: -1, title: 'Transaction Failed', content: 'Your transaction was cancelled and wasn’t submitted' }
export const cancelStatus = { status: -2, title: 'Canceling your pool creation', content: 'You cancel your pool creation' }
export const initStatus = { status: 0, title: '', content: '' }

const successClaimStatus = { status: 6, title: 'Success!', content: 'You successfully claim your reward' }
const successStatus = { status: 7, title: 'successfully!', content: 'The transaction has been successfully completed!' } */



export default function TransferStatusModal({ successCallback }) {
    // console.log('modalStatus', modalStatus)
    const { state } = useContext(myContext)
    const { wrapperIntl } = useWrapperIntl()
    const [modalStatus, setModalStatus] = useState('initStatus')
    const { status, title, content } = modalStatus
    const [isShow, setIsShow] = useState(false)

    const approveStatus = useStatus().approveStatus
    const confirmStatus = useStatus().confirmStatus
    const pendingStatus = useStatus().pendingStatus
    const successStakeStatus = useStatus().approvesuccessStakeStatusStatus
    const successUnStakeStatus = useStatus().successUnStakeStatus
    const errorStatus = useStatus().errorStatus
    const cancelStatus = useStatus().cancelStatus
    const initStatus = useStatus().initStatus

    const successClaimStatus = useStatus().successClaimStatus
    const successStatus = useStatus().successStatus

    useEffect(() => {
        if (!state.TransferModal) return setIsShow(false)
        console.log(state.TransferModal)
        setIsShow(true)
        switch (state.TransferModal) {
            case 'initStatus':
                setModalStatus(initStatus)
                break;

            case 'approveStatus':
                setModalStatus(approveStatus)
                break;

            case 'confirmStatus':
                setModalStatus(confirmStatus)
                break;

            case 'successStatus':
                setModalStatus(successStatus)
                break;

            case 'pendingStatus':
                setModalStatus(pendingStatus)
                break;

            case 'successStakeStatus':
                setModalStatus(successStakeStatus)
                break;

            case 'successUnStakeStatus':
                setModalStatus(successUnStakeStatus)
                break;

            case 'errorStatus':
                setModalStatus(errorStatus)
                break;

            case 'cancelStatus':
                setModalStatus(cancelStatus)
                break;

            case 'successClaimStatus':
                setModalStatus(successClaimStatus)
                break;

            default:
                setIsShow(false)
                break;
        }
        // eslint-disable-next-line
    }, [state.TransferModal])

    const onDismiss = () => {
        setIsShow(false)
    }

    return isShow && (
        <TransferStatusModalStyled>
            <Modal class='modal_box' isOpen={status !== 0} onDismiss={() => {
                onDismiss()
            }}>
                <ModalTitle style={{ textAlign: 'center' }}>{title}</ModalTitle>

                {(status === 1 || status === 2 || status === 3) &&
                    <Lottie width={200} height={200} options={defaultOptions} />}

                {status === 4 &&
                    <ModalIcon ><img alt='' src={icon_wait} /></ModalIcon>}

                {(status === 5 || status === 6) &&
                    <ModalIcon ><img alt='' src={icon_success} /></ModalIcon>}

                {(status === -1) &&
                    <ModalIcon><img alt='' src={icon_error} /></ModalIcon>}

                <ModalContent style={{ width: 320, textAlign: 'center' }}>{content}</ModalContent>
                {(status === 1 || status === 2 || status === 3) && <Button width={'320px'} black>{wrapperIntl("TransferStatusModal.Awaiting")}</Button>}
                {(status === 4 || status === 6 || status === 5|| status === 7) && <Button width={'320px'} black onClick={() => {
                    //onDismiss()
                    window.location.reload()
                }}>{wrapperIntl("TransferStatusModal.Close")}</Button>}
                {status === -1 && <Button onClick={() => { 
                    // onDismiss()
                    window.location.reload()
                }} width={'320px'} black>{wrapperIntl("TransferStatusModal.TryAgain")}</Button>}
            </Modal>
        </TransferStatusModalStyled>
    )
}
