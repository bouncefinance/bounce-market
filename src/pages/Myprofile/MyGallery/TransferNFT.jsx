import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useActiveWeb3React } from "@/web3";
import { useHistory, useParams } from "react-router-dom";
import useAxios from "@utils/useAxios.js";
import { myContext } from "@/redux";
import { Button } from "@components/UI-kit";
import BreadcrumbNav from "@/components/UI-kit/NavBar/BreadcrumbNav";
import NFTInfo from "./components/NFTInfo";
import useWrapperIntl from "@/locales/useWrapperIntl";

import icon_copy from "@assets/images/icon/copy.svg";
import { AutoStretchBaseWidthOrHeightImg } from "@/pages/component/Other/autoStretchBaseWidthOrHeightImg";
/* import pic_NFT1 from "./assets/pic_NFT1.svg"; */

const Page = styled.div`
	display: flex;
	flex-direction: column;
	width: 1100px;
	margin: 0 auto 34px auto;

	.sellNFT {
		margin-top: 50px;
		display: grid;
		grid-template-columns: 400px 416px;
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
			opacity: 0.8;
		}

		&:-ms-input-placeholder {
			/* Internet Explorer 10-11 */
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: 500;
			font-size: 16px;
			line-height: 20px;
			color: #000000;
			opacity: 0.8;
		}

		&::placeholder {
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: 500;
			font-size: 16px;
			line-height: 20px;
			color: #000000;
			opacity: 0.8;
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
	}
`;

function TransferNFT() {
	const { account, active } = useActiveWeb3React();
	const history = useHistory();
	const { nftId } = useParams();
	const { sign_Axios } = useAxios();
	const { wrapperIntl } = useWrapperIntl();

	const [NFTName, setNFTName] = useState();
	// const [descriptionContent, setDescriptionContent] = useState();
	const [supply, setSupply] = useState();
	const [tokenID, setTokenID] = useState();
	const [tokenSymbol, setTokenSymbol] = useState();
	const [creator, setCreator] = useState();
	const [externalLink, setExternalLink] = useState();
	const [imgURL, setImgURL] = useState();
	const [category, setCategory] = useState();
	const [description, setDescription] = useState();
	const [receiverAddress, setReceiverAddress] = useState("");
	const [disableButton, setDisableButton] = useState(true);

	const { dispatch } = useContext(myContext);

	useEffect(() => {
		const getNFTInfoList = async (nftId) => {
			const params = {
				id: parseInt(nftId),
			};

			sign_Axios
				.post("/api/v2/main/auth/getoneitembyid", params)
				.then((res) => {
					if (res.status === 200 && res.data.code === 1) {
						/* alert("获取成功"); */
						/* console.log(res); */
						let NFTInfoList = res.data.data;
						/* console.log(NFTInfoList) */
						// console.log(JSON.stringify(NFTInfoList));
						setNFTName(NFTInfoList.itemname);
						// setDescriptionContent(NFTInfoList.description);
						setSupply(NFTInfoList.supply);
						setTokenID(NFTInfoList.id);
						setTokenSymbol(NFTInfoList.itemsymbol);
						setCreator(NFTInfoList.owneraddress);
						setExternalLink(NFTInfoList.externallink);
						setImgURL(NFTInfoList.fileurl);
						setCategory(NFTInfoList.category);
						setDescription(NFTInfoList.description || "");
					} else {
						dispatch({
							type: "Modal_Message",
							showMessageModal: true,
							modelType: "error",
							modelMessage: wrapperIntl("TryAgain"),
						});
					}
				})
				.catch((err) => {
					dispatch({
						type: "Modal_Message",
						showMessageModal: true,
						modelType: "error",
						modelMessage: wrapperIntl("TryAgain"),
					});
				});
		};
		if (!active || !nftId) return;
		getNFTInfoList(nftId);
		// eslint-disable-next-line
	}, [active, nftId]);

	const NavList = [
		{
			title: "My Gallery",
			route: "/MyGallery",
		},
		{
			title: NFTName || "",
			route: "/MyGallery/" + nftId,
		},
	];

	/* useEffect(() => {
		console.log("typeof(receiverAddress): ", typeof receiverAddress);
		console.log("receiverAddress: ", receiverAddress);
		console.log("alertStatus: ", alertStatus);
		console.log("receiverAddress.length: ", receiverAddress.length);
		console.log("-------------");
	}, [alertStatus, receiverAddress]); */

	const handleAddressInput = (e) => {
		setReceiverAddress(e.target.value);
		if (receiverAddress.match("^0x.{40}$")) {
			console.log("case 0");
			console.log(e.target.value)
		}
		/* } else if (receiverAddress.length === 0) {
			console.log("case 1");
			setAlertStatus("empty");
		} else if (receiverAddress === "0") {
			console.log("case 2");
			setAlertStatus("typing");
		} else if (receiverAddress === "0x") {
			console.log("case 3");
			setAlertStatus("typing");
		} else if (receiverAddress.match("^0x.{0,40}$") !== null) {
			console.log("case 4");
			setAlertStatus("incorrectHeader");
		} else {
			console.log("case 5");
		
		console.log("receiverAddress.length: ", receiverAddress.length);
		console.log("alertStatus: ", alertStatus); */
	};

	useEffect(() => {
		if (receiverAddress.match("^0x.{40}$")) {
			console.log("Correct Address");
			setDisableButton(false)
		}
		else {
			console.log("InCorrect Address");
			setDisableButton(true)
		}
	}, [receiverAddress])

	const handleClick = () => {
		alert("Transfer")
	}

	return (
		<Page>
			<BreadcrumbNav marginTop="24px" NavList={NavList} />
			<PageBody className="sellNFT">
				{category && category === "Videos" ? (
					<video
						width="400px"
						height="400px"
						src={imgURL}
						controls="controls"
						autoPlay
					></video>
				) : (
					<AutoStretchBaseWidthOrHeightImg
						src={imgURL}
						width={400}
						height={400}
					/>
				)}

				<PageBodyRight className="right">
					<span className="NFTName">
						{"Digital Image Name" /* {NFTName} */}
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
							“Digital Image Name” will be transferred to {receiverAddress.slice(0,6)+'...'+receiverAddress.slice(-5,-1)}
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

export default TransferNFT;
