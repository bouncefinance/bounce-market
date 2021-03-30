import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";

import Button from "@components/UI-kit/Button/Button";

import { getFixedSwapNFT, getEnglishAuctionNFT } from "@/web3/address_list/contract";
import BounceFixedSwapNFT from '@/web3/abi/BounceFixedSwapNFT.json'
import BounceEnglishAuctionNFT from '@/web3/abi/BounceEnglishAuctionNFT.json'
import BounceERC721WithSign from '@/web3/abi/BounceERC721WithSign.json'
import BounceERC1155WithSign from '@/web3/abi/BounceERC1155WithSign.json'

import { getContract, useActiveWeb3React } from "@/web3";
import useTransferModal from "@/web3/useTransferModal";
import { numToWei, weiMul } from "@/utils/useBigNumber";
import useNftInfo from "@/utils/useToken";
import { ZERO_ADDRESS } from "@/web3/address_list/token";

const SummaryWrapper = styled.div`
	grid-area: Summary;
	align-self: start;

	width: 100%;
	background: #f0f0f0;
	margin-top:24px;
	display: grid;
	grid-template-rows: 57px 1fr;
	grid-template-areas:
		"summaryHeader"
		"listing"
		"fees";

	span.title {
		font-family: Helvetica Neue;
		font-style: normal;
		font-weight: bold;
		font-size: 14px;
		line-height: 17px;
		text-transform: capitalize;
		color: #000000;
	}

	span.text {
		font-family: Helvetica Neue;
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 19px;
		color: rgba(31, 25, 27, 0.3);
	}

	span.text2 {
		font-family: Helvetica Neue;
		font-style: normal;
		font-weight: 500;
		font-size: 14px;
		line-height: 17px;
		color: #000;
		min-width:140px;
		text-align:right;
	}

	.summaryHeader {
		grid-area: summaryHeader;

		padding: 20.78px 195px 20px 20px;
		box-sizing: border-box;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);

		display: grid;
		grid-template-columns: 12.8px 1fr;
		column-gap: 11.6px;
	}

	.listing {
		grid-area: listing;

		box-sizing: border-box;
		padding: 20px;
		span.bold {
			color: rgba(31, 25, 27, 1);
		}
		.listingDetail{
			display:flex;
			justify-content: space-between;
			margin-bottom:20px;
		}
		.fees{
			display:flex;
			justify-content: space-between;
			padding:0;
			margin-bottom:16px;
		}
		.title{
			font-weight: 500;
			opacity: 0.7;
			margin-right:4px;
		}
		.list{
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: normal;
			font-size: 14px;
			line-height: 17px;
			color: rgba(0,0,0,0.5);
		}
		.listingVal{
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: 500;
			font-size: 14px;
			line-height: 17px;
			text-align: right;
			color: #124EEB;
			min-width:140px;
		}
		button{
			width: 100%;
			height: 48px;
			line-height: 48px;
		}
	}
	.fees {
		grid-area: fees;

		padding: 20px 20px 30px 20px;

		display: grid;
		grid-template-rows: 15px 17px;
		row-gap: 10px;
		grid-template-columns: 68px 134px 34px;
		column-gap: 10px;
		grid-template-areas:
			"fees . ."
			"toBounce dotLine percentage";

		.title {
			grid-area: fees;
		}
		.toBounce {
			grid-area: toBounce;
		}
		.dotLine {
			grid-area: dotLine;
			align-self: center;
		}
		.percentage {
			grid-area: percentage;
		}
	}
`;

function Summary({ auctionType, price, amount, unit, duration, fees, nftInfo, minPrice, maxPrice, minIncr, newUnit }) {
	const { chainId, library, account } = useActiveWeb3React()
	const { showTransferByStatus } = useTransferModal()
	const [btnLock, setBtnLock] = useState(true)
	const { hasApprove_ERC_721, hasApprove_ERC_1155, isOwner_ERC_721 } = useNftInfo()

	useEffect(() => {
		if (auctionType === 'setPrice') {
			if (price && nftInfo) {
				setBtnLock(false)
			} else {
				setBtnLock(true)
			}
		} else {
			if (price && price && unit && duration && nftInfo) {
				setBtnLock(false)
			} else {
				setBtnLock(true)
			}
		}
	}, [auctionType, price, unit, duration, fees, nftInfo])

	const handelSubmit = async () => {
		if (auctionType === 'setPrice') {
			// Fixswap NFT
			const _name = nftInfo.itemname
			const _token0 = nftInfo.contractaddress
			// const _token1 = ZERO_ADDRESS
			const _token1 = newUnit.contract
			const _tokenId = nftInfo.id
			const _amountTotal1 = numToWei(price, newUnit.decimals)
			const _onlyBot = false

			const BounceFixedSwapNFT_CT = getContract(library, BounceFixedSwapNFT.abi, getFixedSwapNFT(chainId))

			const BounceERC721WithSign_CT = getContract(library, BounceERC721WithSign.abi, _token0)
			const BounceERC1155WithSign_CT = getContract(library, BounceERC1155WithSign.abi, _token0)

			// console.log(nftInfo)
			// console.log(_name, _token0, _token1, _tokenId, _amountTotal1, _onlyBot)

			try {
				if (nftInfo.standard === 1) {

					// approve
					showTransferByStatus('approveStatus')
					const isOwner = await isOwner_ERC_721(_token0, _tokenId, account)
					// 没有这个 NFT
					if (!isOwner) showTransferByStatus('errorStatus')
					let approveResult = await hasApprove_ERC_721(_token0, _tokenId, getFixedSwapNFT(chainId))
					if (!approveResult) {
						approveResult = await BounceERC721WithSign_CT.methods.approve(
							getFixedSwapNFT(chainId),
							parseInt(_tokenId)
						).send({ from: account });
					}

					if (!approveResult) return showTransferByStatus('errorStatus')


					BounceFixedSwapNFT_CT.methods.createErc721(_name, _token0, _token1, _tokenId, _amountTotal1, _onlyBot).send({ from: account })
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
				} else if (nftInfo.standard === 2) {
					// approve
					console.log(amount, price)

					const _amountTotal0 = amount
					const _amountTotal1 = weiMul(numToWei(price), amount)

					showTransferByStatus('approveStatus')
					let approveResult = await hasApprove_ERC_1155(_token0, getFixedSwapNFT(chainId), account)
					if (!approveResult) {
						approveResult = await BounceERC1155WithSign_CT.methods.setApprovalForAll(
							getFixedSwapNFT(chainId),
							true
						).send({ from: account });
					}

					if (!approveResult) return showTransferByStatus('errorStatus')
					console.log(_name, _token0, _token1, _tokenId, _amountTotal0, _amountTotal1, _onlyBot)

					BounceFixedSwapNFT_CT.methods.createErc1155(_name, _token0, _token1, _tokenId, _amountTotal0,
						_amountTotal1, _onlyBot)
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
			} catch (e) { console.log(e); showTransferByStatus('errorStatus') }
		} else {
			try {
				// Fixswap NFT
				const _name = nftInfo.itemname
				const _token0 = nftInfo.contractaddress
				const _token1 = ZERO_ADDRESS
				const _tokenId = nftInfo.id
				const _amountMax1 = numToWei(maxPrice, 18)
				const _amountMin1 = numToWei(minPrice, 18)
				const _amountMinIncr1 = numToWei(minIncr, 18)
				const _amountReserve1 = numToWei(price, 18)
				const _duration = duration * 60 * 60 * 24
				const _onlyBot = false

				console.log(_name, _token0, _token1, _tokenId,
					_amountMax1, _amountMin1, _amountMinIncr1, _amountReserve1, _duration, _onlyBot)

				const BounceEnglishAuctionNFT_CT = getContract(library, BounceEnglishAuctionNFT.abi, getEnglishAuctionNFT(chainId))


				const BounceERC721WithSign_CT = getContract(library, BounceERC721WithSign.abi, _token0)
				const BounceERC1155WithSign_CT = getContract(library, BounceERC1155WithSign.abi, _token0)

				if (nftInfo.standard === 1) {

					// approve
					showTransferByStatus('approveStatus')
					const isOwner = await isOwner_ERC_721(_token0, _tokenId, account)
					// 没有这个 NFT
					if (!isOwner) showTransferByStatus('errorStatus')
					let approveResult = await hasApprove_ERC_721(_token0, _tokenId, getEnglishAuctionNFT(chainId))
					if (!approveResult) {
						approveResult = await BounceERC721WithSign_CT.methods.approve(
							getEnglishAuctionNFT(chainId),
							parseInt(_tokenId)
						).send({ from: account });
					}

					if (!approveResult) return showTransferByStatus('errorStatus')


					BounceEnglishAuctionNFT_CT.methods.createErc721(_name, _token0, _token1, _tokenId,
						_amountMax1, _amountMin1, _amountMinIncr1, _amountReserve1, _duration, _onlyBot).send({ from: account })
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
				} else if (nftInfo.standard === 2) {
					// approve
					console.log(amount, price)

					const _amountTotal0 = amount;
					// const _amountTotal1 = weiMul(numToWei(price), amount)

					showTransferByStatus('approveStatus')
					let approveResult = await hasApprove_ERC_1155(_token0, getEnglishAuctionNFT(chainId), account)
					if (!approveResult) {
						approveResult = await BounceERC1155WithSign_CT.methods.setApprovalForAll(
							getEnglishAuctionNFT(chainId),
							true
						).send({ from: account });
					}

					if (!approveResult) return showTransferByStatus('errorStatus')
					console.log(_name, _token0, _token1, _tokenId, _amountTotal0,
						_amountMax1, _amountMin1, _amountMinIncr1, _amountReserve1, _duration, _onlyBot)


					BounceEnglishAuctionNFT_CT.methods.createErc1155(_name, _token0, _token1, _tokenId, _amountTotal0,
						_amountMax1, _amountMin1, _amountMinIncr1, _amountReserve1, _duration, _onlyBot)
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
			} catch (e) { console.log(e); showTransferByStatus('errorStatus') }
		}
	}

	return (
		<SummaryWrapper>
			<div className="summaryHeader">
				<span className="title">Summary</span>
			</div>
			<div className="listing">
				<div className="listingDetail">
					<p className="list"><span className="title">Listing.</span>
						{auctionType === "setPrice" &&
							<span>Your item will be listed for</span>
						}
						{auctionType === "EnglishAuction" &&
							<span>Your item will be auctioned. The highest bidder will win it as long as their bid is at least 2ETH.</span>
						}
					</p>
					<span className="listingVal">{price || "0"} {unit}</span>
				</div>
				{auctionType === "EnglishAuction" &&
					<div className="listingDetail">
						<p className="list"><span className="title">Expiration Date</span></p>
						<span className="text2 percentage">{moment()
							.add(duration, "days")
							.format("ha on MMMM DD,YYYY")}</span>
					</div>
				}
				<div className="fees">
					<p className="list"><span className="title">Fees.</span>To Fangible </p>
					<span className="text2 percentage">{fees}%</span>
				</div>
				<Button primary disabled={btnLock} onClick={handelSubmit}>Post your Listing</Button>
			</div>
		</SummaryWrapper>
	);
}

export default Summary;
