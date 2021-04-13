import React from "react";
import Modal from "./Modal";
import styled from "styled-components";
import { Button } from "@components/UI-kit";
import useTransferModal from "@/web3/useTransferModal";

import { getFixedSwapNFT } from "@/web3/address_list/contract";
import BounceFixedSwapNFT from '@/web3/abi/BounceFixedSwapNFT.json'
import { useActiveWeb3React, getContract } from "@/web3";
import useWrapperIntl from '@/locales/useWrapperIntl'

const Wrapper = styled.div`
	box-sizing: border-box;
	padding: 32px 40px 44px 40px;

	span.alert {
		font-size: 16px;
		font-family: "Helvetica Neue";
		font-weight: 400;
		color: rgb(31, 25, 27);
	}

	.button_group {
		margin-top: 50px;

		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 16px;
	}
`;

function ConfirmCancelModal({ width, height, open, setOpen, onConfirm, poolId }) {
	const { library, chainId, account } = useActiveWeb3React()
	const { showTransferByStatus } = useTransferModal()
	const { wrapperIntl } = useWrapperIntl()

	const handelFixedSwapCancel = async () => {
		const BounceFixedSwapNFT_CT = getContract(library, BounceFixedSwapNFT.abi, getFixedSwapNFT(chainId))

		BounceFixedSwapNFT_CT.methods.cancel(poolId)
			.send({ from: account })
			.on('transactionHash', hash => {
				// setBidStatus(pendingStatus)
				showTransferByStatus('pendingStatus')
			})
			.on('receipt', async (_, receipt) => {
				// console.log('bid fixed swap receipt:', receipt)
				// setBidStatus(successStatus)
				showTransferByStatus('successStatus')
			})
			.on('error', (err, receipt) => {
				// setBidStatus(errorStatus)
				showTransferByStatus('errorStatus')
			})
	}

	return (
		<>
			<Modal
				width={width}
				height={height}
				open={open}
				setOpen={setOpen}
				header={{ title: wrapperIntl("pages.buy.ConfirmCancel"), isClose: true }}
			>
				<Wrapper>
					<span className="alert">{wrapperIntl("pages.buy.AreYouSure")}</span>

					<div className="button_group">
						<Button
							width="150px"
							height="48px"
							value={wrapperIntl("pages.buy.Yes")}
							onClick={() => {
								onConfirm && onConfirm();
								!onConfirm && handelFixedSwapCancel()
								setOpen(false);
							}}
						/>
						<Button
							width="150px"
							height="48px"
							primary="primary"
							value={wrapperIntl("pages.buy.No")}
							onClick={() => {
								setOpen(false);
							}}
						/>
					</div>
				</Wrapper>
			</Modal>
		</>
	);
}

export default ConfirmCancelModal;
