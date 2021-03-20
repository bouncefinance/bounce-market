import  Modal,{ ModalContent, ModalTitle } from "./OldBounceModal";
// import  { ModalContent, ModalTitle } from "./OldBounceModal";
// import Modal from "./Modal";
import Lottie from "react-lottie";
// import { FormStatus } from "./Form";
import icon_wait from "@assets/images/status_wait.svg";

import icon_success from "@assets/images/status_success.svg";
import icon_error from "@assets/images/status_error.svg";
import { Button } from "@components/UI-kit";
import React from "react";
import bounce_loading from "@assets/videos/bounce_loading.json";


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
export const pendingStatus = { status: 3, title: 'Staking Bounce Finance', content: 'Please wait a Little' }
export const successStakeStatus = { status: 4, title: 'Your BOT was Staked', content: 'You can claim your principle' }
export const successUnStakeStatus = { status: 5, title: 'Your BOT was Unstaked', content: 'You successfully unstake your token' }

export const errorStatus = { status: -1, title: 'Transaction Failed', content: 'Your transaction was cancelled and wasn’t submitted' }
export const cancelStatus = { status: -2, title: 'Canceling your pool creation', content: 'You cancel your pool creation' }
export const initStatus = { status: 0, title: '', content: '' }

export const successClaimStatus = { status: 6, title: 'Success!', content: 'You successfully claim your reward' }



export default function TransferStatusModal({ modalStatus, onDismiss}){
    // console.log('modalStatus', modalStatus)
    const { status, title, content } = modalStatus

    return (
        <Modal isOpen={status !== 0} onDismiss={() => {
            onDismiss()
        }}>
            <ModalTitle style={{ textAlign: 'center' }}>{title}</ModalTitle>

            {(status === 1 || status === 2 || status === 3) &&
                <Lottie width={200} height={200} options={defaultOptions} />}

            {status === 4 &&
                <div ><img alt='' src={icon_wait} /></div>}

            {(status === 5 || status === 6) &&
                <div ><img alt='' src={icon_success} /></div>}

            {(status === -1) &&
                <div><img alt='' src={icon_error} /></div>}

            <ModalContent style={{ width: 300, textAlign: 'center' }}>{content}</ModalContent>
            {(status === 1 || status === 2 || status === 3) && <Button width={'320px'} black>Awaiting...</Button>}
            {(status === 4 || status === 6 || status === 5) && <Button width={'320px'} black onClick={() => {
                //onDismiss()
                window.location.reload()
            }}>Close</Button>}
            {status === -1 && <Button onClick={() => { onDismiss() }} width={'320px'} black>Try again</Button>}
        </Modal>
    )
}
