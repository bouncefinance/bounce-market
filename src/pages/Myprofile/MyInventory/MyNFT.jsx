import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useActiveWeb3React } from "@/web3";
import { useHistory, useParams } from "react-router-dom";
import useAxios from "@utils/useAxios.js";

import { Button } from "@components/UI-kit";
import NFTInfoDropdown from "./components/NFTInfoDropdown";

import icon_copy from "@assets/images/icon/copy.svg";
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
			grid-template-rows: 44px 56px 100px 28px 37px 1fr;
			align-items: start;

			.NFTName {
				font-family: Optima;
				font-style: normal;
				font-weight: bold;
				font-size: 34px;
				line-height: 41px;
				color: #000000;
			}

			.account {
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

			.buttonGroup {
				display: grid;
				grid-template-columns: 1fr 1fr;
				column-gap: 16px;
			}
		}
	}
`;

const BreadcrumbNav = styled.div`
	font-family: IBM Plex Mono;
	font-style: normal;
	font-weight: 500;
	font-size: 12px;
	line-height: 16px;
	display: flex;
	align-items: center;
	color: #1f191b;
	opacity: 0.8;

	box-sizing: border-box;
	margin: 24px auto 0 0;

	display: flex;
	align-items: center;

	span {
		opacity: 0.4;
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
	grid-template-rows: 44px 56px 100px 28px 37px 1fr;
	align-items: start;
	grid-template-areas:
		"ImgName"
		"MyAddress"
		"ButtonGroup"
		"DescriptionTitle"
		"DescriptionContent"
		"InfoDropdowns";

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

	/* DescriptionTitle */
	span.description {
		font-family: IBM Plex Mono;
		font-style: normal;
		font-weight: 500;
		font-size: 12px;
		line-height: 16px;
		display: flex;
		align-items: center;
		color: #1f191b;
		opacity: 0.5;

		grid-area: DescriptionTitle;
	}

	/* DescriptionContent */
	span.descriptionContent {
		font-family: Helvetica Neue;
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 19px;
		display: flex;
		align-items: center;
		color: #1f191b;
	}

	/* InfoDropdowns */
`;

const InfoDropdowns = styled.div`
	height: 100%;
	grid-area: InfoDropdowns;
	display: grid;
`;

function MyNFT() {
	const { account, active } = useActiveWeb3React();
	const history = useHistory();
	const { nftId } = useParams();
	const { sign_Axios } = useAxios();

	const [NFTName, setNFTName] = useState();
	const [descriptionContent, setDescriptionContent] = useState();
	const [supply, setSupply] = useState();
	const [tokenID, setTokenID] = useState();
	const [tokenSymbol, setTokenSymbol] = useState();
	const [creator, setCreator] = useState();
	const [externalLink, setExternalLink] = useState();
	const [imgURL, setImgURL] = useState();

	/* const NFTInfoList = [
		{ title: "Description", content: "An irreplaceable girl" },
		{ title: "Supply", content: "114514" },
		{ title: "Token ID", content: "#123456" },
		{ title: "Token Symbol", content: "CKIE" },
		{ title: "Created By", content: "Ralph Waldo" },
		{ title: "External Link", content: "http://www.baidu.com" },
	]; */

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
						setNFTName(NFTInfoList.itemname);
						setDescriptionContent(NFTInfoList.description);
						setSupply(NFTInfoList.supply);
						setTokenID(NFTInfoList.id);
						setTokenSymbol(NFTInfoList.itemsymbol);
						setCreator(NFTInfoList.owneraddress);
						setExternalLink(NFTInfoList.externallink);
						setImgURL(NFTInfoList.fileurl);
					} else {
						alert("获取失败");
					}
				})
				.catch((err) => {
					alert("获取失败2");
				});
		};
		if (!active || !nftId) return;
		getNFTInfoList(nftId);
		// eslint-disable-next-line
	}, [active, nftId]);
	

	return (
		<Page>
			<BreadcrumbNav className="breadcrumb_Nav">
				My Inventory&nbsp;/&nbsp;
				<span className="NFTNameInNav">{NFTName}</span>
			</BreadcrumbNav>
			<PageBody className="sellNFT">
				<img className="NFTImg" src={imgURL} alt="" />

				<PageBodyRight className="right">
					<span className="NFTName">{NFTName}</span>

					<div className="account">
						<p>{account}</p>
						<CopyToClipboard text={account} onCopy={() => { }}>
							<img className="icon_copy" src={icon_copy} alt="" />
						</CopyToClipboard>
					</div>

					<div className="buttonGroup">
						<Button
							primary
							width="200px"
							value="Sell"
							onClick={() => {
								/* history.push("/MyInventory/:nftId/Sell") */
								history.push("/MyInventory/Sell");
							}}
						/>
						<Button width="200px" value="Transfer" />
					</div>

					<span className="description">Description</span>

					<span className="descriptionContent">
						{descriptionContent}
					</span>

					<InfoDropdowns>
						<NFTInfoDropdown title="Supply" content={supply} />
						<NFTInfoDropdown title="Token ID" content={tokenID} />
						<NFTInfoDropdown
							title="Token Symbol"
							content={tokenSymbol}
						/>
						<NFTInfoDropdown title="Created By" content={creator} />
						<NFTInfoDropdown
							title="External Link"
							content={externalLink}
						/>
					</InfoDropdowns>
				</PageBodyRight>
			</PageBody>
		</Page>
	);
}

export default MyNFT;
