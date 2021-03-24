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

export const approveStatus = { status: 1, title: 'Bounce Requests Approval', content: 'Please enable Bounce to access your tokens' }
export const confirmStatus = { status: 2, title: 'Waiting for confirmation', content: 'Confirm this transaction in your wallet' }
export const pendingStatus = { status: 3, title: 'Pendding Bounce Finance', content: 'Please wait a Little' }
export const successStakeStatus = { status: 4, title: 'Your BOT was Staked', content: 'You can claim your principle' }
export const successUnStakeStatus = { status: 5, title: 'Your BOT was Unstaked', content: 'You successfully unstake your token' }

export const errorStatus = { status: -1, title: 'Transaction Failed', content: 'Your transaction was cancelled and wasn’t submitted' }
export const cancelStatus = { status: -2, title: 'Canceling your pool creation', content: 'You cancel your pool creation' }
export const initStatus = { status: 0, title: '', content: '' }

const successClaimStatus = { status: 6, title: 'Success!', content: 'You successfully claim your reward' }
const successStatus = { status: 7, title: 'successfully!', content: 'The transaction has been successfully completed！' }



export default function TransferStatusModal({ successCallback }) {
    // console.log('modalStatus', modalStatus)
    const { state } = useContext(myContext)
    const [modalStatus, setModalStatus] = useState('initStatus')
    const { status, title, content } = modalStatus
    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        if (!state.TransferModal) return setIsShow(false)
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

                <ModalContent style={{ width: 300, textAlign: 'center' }}>{content}</ModalContent>
                {(status === 1 || status === 2 || status === 3) && <Button width={'320px'} black>Awaiting...</Button>}
                {(status === 4 || status === 6 || status === 5) && <Button width={'320px'} black onClick={() => {
                    //onDismiss()
                    window.location.reload()
                }}>Close</Button>}
                {status === -1 && <Button onClick={() => { 
                    // onDismiss()
                    window.location.reload()
                }} width={'320px'} black>Try again</Button>}
            </Modal>
        </TransferStatusModalStyled>
    )
}
