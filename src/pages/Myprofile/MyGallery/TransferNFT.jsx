import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useHistory, useParams } from "react-router-dom";
import useAxios from "@utils/useAxios.js";
import { myContext } from "@/redux";
import { Button } from "@components/UI-kit";
import BreadcrumbNav from "@/components/UI-kit/NavBar/BreadcrumbNav";
/* import NFTInfo from "./components/NFTInfo"; */
import useWrapperIntl from "@/locales/useWrapperIntl";

import icon_copy from "@assets/images/icon/copy.svg";
import { AutoStretchBaseWidthOrHeightImg } from "@/pages/component/Other/autoStretchBaseWidthOrHeightImg";
import useNftInfo from "@/utils/useToken";
import { getContract, useActiveWeb3React } from "@/web3";
import BounceERC721 from "@/web3/abi/BounceERC721.json";
import BounceERC1155 from "@/web3/abi/BounceERC1155.json";
import useTransferModal from "@/web3/useTransferModal";

function TransferNFT() {
	const { account, library, active } = useActiveWeb3React();
	const { nftId } = useParams();
	const history = useHistory();
	const { sign_Axios } = useAxios();
	const { wrapperIntl } = useWrapperIntl();
	const { exportNftInfoV2 } = useNftInfo();
	const [receiverAddress, setReceiverAddress] = useState("");
	const [disableButton, setDisableButton] = useState(true);
	const [showNotice, setShowNotice] = useState(false);
	const [NFTInfo, setNFTInfo] = useState();
	const { showTransferByStatus } = useTransferModal();

	const { dispatch } = useContext(myContext);

	const setInitNFTInfo = async (nftId) => {
		const NFTInfo = await exportNftInfoV2(nftId);

		setNFTInfo(NFTInfo);
	};

	useEffect(() => {
		if (!active) return;
		setInitNFTInfo(nftId);
		// eslint-disable-next-line
	}, [active]);

	useEffect(() => {
		console.log("NFTInfo: ", NFTInfo);
	}, [NFTInfo]);

	const NavList = [
		{
			title: "My Gallery",
			route: "/MyGallery",
		},
		{
			title: NFTInfo && NFTInfo.itemname || "itemName",
			route: "/MyGallery/" + nftId,
		},
		{
			title: NFTInfo && "Transfer",
			route: "/MyGallery/" + nftId + "Transfer",
		},
	];

	const handleAddressInput = (e) => {
		setReceiverAddress(e.target.value);
	};

	useEffect(() => {
		if (receiverAddress.match("^0x.{40}$")) {
			setDisableButton(false);
			setShowNotice(true);
		} else {
			setDisableButton(true);
			setShowNotice(false);
		}
	}, [receiverAddress]);

	const handleClick = () => {
		/* alert("Transfer"); */
		try {
			if (NFTInfo) {
				if (parseInt(NFTInfo.standard) === 1) {
					const BounceERC721_CT = getContract(
						library,
						BounceERC721.abi,
						NFTInfo.contractaddress
					);
					BounceERC721_CT.methods
						.safeTransferFrom(
							account,
							receiverAddress,
							parseInt(NFTInfo.id)
						)
						.send({ from: account })
						.on("transactionHash", (hash) => {
							// setBidStatus(pendingStatus)
							showTransferByStatus("pendingStatus");
						})
						.on("receipt", async (_, receipt) => {
							// console.log('bid fixed swap receipt:', receipt)
							// setBidStatus(successStatus)
							history.push("/MyGallery");
							showTransferByStatus("successStatus");
						})
						.on("error", (err, receipt) => {
							// setBidStatus(errorStatus)
							showTransferByStatus("errorStatus");
						});
				} else if (parseInt(NFTInfo.standard) === 2) {
					const BounceERC1155_CT = getContract(
						library,
						BounceERC1155.abi,
						NFTInfo.contractaddress
					);
					BounceERC1155_CT.methods
						.safeTransferFrom(
							account,
							receiverAddress,
							parseInt(NFTInfo.id)
						)
						.send({ from: account })
						.on("transactionHash", (hash) => {
							// setBidStatus(pendingStatus)
							showTransferByStatus("pendingStatus");
						})
						.on("receipt", async (_, receipt) => {
							// console.log('bid fixed swap receipt:', receipt)
							// setBidStatus(successStatus)
							history.push("/MyGallery");
							showTransferByStatus("successStatus");
						})
						.on("error", (err, receipt) => {
							// setBidStatus(errorStatus)
							showTransferByStatus("errorStatus");
						});
				}
			}
		} catch (e) {
			console.log(e);
			showTransferByStatus("errorStatus");
		}
	};

	return (
		<Page>
			<BreadcrumbNav marginTop="24px" NavList={NavList} />
			<PageBody className="sellNFT">
				{NFTInfo && NFTInfo.category === "video" ? (
					<video
						width="400px"
						height="400px"
						src={NFTInfo && NFTInfo.fileurl}
						controls="controls"
						autoPlay
					></video>
				) : (
					<AutoStretchBaseWidthOrHeightImg
						src={NFTInfo && NFTInfo.fileurl}
						width={400}
						height={400}
					/>
				)}

				<PageBodyRight className="right">
					<span className="NFTName">
						{NFTInfo && NFTInfo.itemname}
					</span>

					<div className="account">
						<p>{account}</p>
						<CopyToClipboard text={account} onCopy={() => {}}>
							<img className="icon_copy" src={icon_copy} alt="" />
						</CopyToClipboard>
					</div>

					<TransferBox>
						<span className="str_Transfer">Transfer</span>

						<span className="str_WalletAddress">
							Wallet Address
						</span>

						<input
							className="inputAddress"
							type="text"
							placeholder="e.g. 0x1ed3.... or destination.eth"
							value={receiverAddress}
							onChange={handleAddressInput}
						/>
						<span className="str_transferTo">
							{showNotice &&
								`“${
									NFTInfo && NFTInfo.itemname
								}” will be transferred to 
								${receiverAddress.slice(0, 6) + "..." + receiverAddress.slice(-5, -1)}`}
						</span>

						<Button
							primary
							width="492px"
							height="48px"
							marginLeft="24px"
							onClick={handleClick}
							disabled={disableButton}
						>
							Transfer
						</Button>
					</TransferBox>
				</PageBodyRight>
			</PageBody>
		</Page>
	);
}

const Page = styled.div`
	display: flex;
	flex-direction: column;
	width: 1100px;
	margin: 0 auto 34px auto;

	.sellNFT {
		margin-top: 50px;
		display: grid;
		grid-template-columns: 400px max-content;
		column-gap: 52px;

		img.NFTImg {
			width: 400px;
		}

		.right {
			display: grid;
			// grid-template-rows: 44px 56px 70px 28px 37px 1fr;
			align-items: start;

			.NFTName {
				font-family: Optima;
				font-style: normal;
				font-weight: bold;
				font-size: 34px;
				line-height: 41px;
				color: #000000;
				margin-bottom: 10px;
			}

			.account {
				display: flex;
				align-items: center;
				margin-top: 5px;
				margin-bottom: 20px;
				p {
					font-size: 16px;
					line-height: 20.88px;
					color: rgba(0, 0, 0, 0.4);
				}

				img.icon_copy {
					margin-left: 12px;
					cursor: pointer;
				}
			}

			.buttonGroup {
				display: grid;
				grid-template-columns: 1fr 1fr;
				column-gap: 16px;
			}
		}
	}
`;

const PageBody = styled.div`
	margin-top: 50px;
	display: grid;
	grid-template-columns: 400px 416px;
	column-gap: 52px;
	grid-template-areas: "left right";

	/* left of pagebody*/
	img.NFTImg {
		grid-area: left;
		width: 400px;
	}

	/* right of pagebody */
`;

const PageBodyRight = styled.div`
	display: grid;
	// grid-template-rows: 44px 56px 100px 28px 37px 1fr;
	align-items: start;
	grid-template-areas:
		"ImgName"
		"MyAddress"
		"transferBox";

	/* ImgName */
	.NFTName {
		font-family: Optima;
		font-style: normal;
		font-weight: bold;
		font-size: 34px;
		line-height: 41px;
		color: #000000;

		grid-area: ImgName;
	}

	/* MyAddress */
	.account {
		grid-area: MyAddress;

		display: flex;
		align-items: center;
		margin-top: 5px;

		p {
			font-size: 16px;
			line-height: 20.88px;
			color: rgba(0, 0, 0, 0.4);
		}

		img.icon_copy {
			margin-left: 12px;
			cursor: pointer;
		}
	}

	/* ButtonGroup */
	.buttonGroup {
		grid-area: ButtonGroup;

		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 16px;
	}
`;

const TransferBox = styled.div`
	box-sizing: border-box;
	width: 540px;
	height: 272px;
	border: 1px solid rgba(0, 0, 0, 0.2);

	display: grid;
	grid-template-rows: repeat(5, max-content);
	grid-template-areas:
		"str_Transfer"
		"str_WalletAddress"
		"inputAddress"
		"str_transferTo"
		"transferButton";

	.str_Transfer {
		font-family: Optima;
		font-style: normal;
		font-weight: bold;
		font-size: 24px;
		line-height: 29px;
		color: #000000;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		height: 57px;
		box-sizing: border-box;
		padding-top: 16px;
		padding-bottom: 14px;
		padding-left: 24px;
	}

	.str_WalletAddress {
		font-family: Helvetica Neue;
		font-style: normal;
		font-weight: 500;
		font-size: 13px;
		line-height: 16px;
		color: #000000;
		opacity: 0.6;
		box-sizing: border-box;
		padding-top: 24px;
		padding-bottom: 8px;
		padding-left: 24px;
	}

	.inputAddress {
		width: 492px;
		height: 48px;
		border: 1px solid rgba(0, 0, 0, 0.2);
		box-sizing: border-box;
		margin-left: 24px;
		text-indent: 20px;
		font-weight: 500;
		font-size: 16px;
		line-height: 20px;

		&::-webkit-input-placeholder {
			/* Edge */
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: 500;
			font-size: 16px;
			line-height: 20px;
			color: #000000;
			opacity: 0.3;
		}

		&:-ms-input-placeholder {
			/* Internet Explorer 10-11 */
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: 500;
			font-size: 16px;
			line-height: 20px;
			color: #000000;
			opacity: 0.3;
		}

		&::placeholder {
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: 500;
			font-size: 16px;
			line-height: 20px;
			color: #000000;
			opacity: 0.3;
		}
	}

	.str_transferTo {
		font-family: Helvetica Neue;
		font-style: normal;
		font-weight: normal;
		font-size: 12px;
		line-height: 131.6%;
		color: #000000;
		opacity: 0.5;
		padding-top: 8px;
		padding-bottom: 24px;
		padding-left: 24px;
		height: 15px;
	}
`;

export default TransferNFT;
