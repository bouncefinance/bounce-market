import { React /* useState */ } from "react";
import styled from "styled-components";
import useWrapperIntl from '@/locales/useWrapperIntl'

import { makeStyles /* withStyles */ } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { AutoStretchBaseWidthOrHeightImg } from "../../component/Other/autoStretchBaseWidthOrHeightImg";
/* import Checkbox from "@material-ui/core/Checkbox"; */

import { Button } from "@components/UI-kit";

import icon_close from "@assets/images/icon/close.svg";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		maxHeight: "100%",
		overflowY: "auto",
		/* width: 520,
		height: 340, */
	},
}));

const HeaderStyled = styled.div`
	border-bottom: 2px solid #000;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 30px 32px 24px 50px;

	h3 {
		font-size: 34px;
	}

	img {
		user-select: none;
		cursor: pointer;
	}
`;

const ModalContent = styled.div`
	box-sizing: border-box;
	padding: 30px 52px 36px 52px;

	display: grid;
	grid-template-rows: 22px 88px /* 50px */ 48px;
	grid-template-areas:
		"title_n_balance"
		"img_n_price"
		/* "checkAgree" */
		"button_group";

	.title_n_balance {
		grid-area: title_n_balance;
		display: flex;
		justify-content: space-between;

		.str_CurrentPrice {
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: bold;
			font-size: 13px;
			line-height: 16px;
			color: #000000;
			opacity: 0.6;
		}

		.balance {
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: normal;
			font-size: 12px;
			line-height: 130.5%;
			text-align: right;
			color: #1f191b;
			opacity: 0.6;

			.balanceValue {
				font-weight: 500;
			}
		}
	}

	.img_n_price {
		border: 1px solid rgba(0,0,0,0.2);
		box-sizing: border-box;
		height: 68px;
		padding: 12px 20px 12px 20px;

		display: flex;
		justify-content: space-between;

		.left {
			display: flex;
			align-items: center;

			.NFTName {
				font-family: Helvetica Neue;
				font-style: normal;
				font-weight: normal;
				font-size: 16px;
				line-height: 130.5%;
				color: #1f191b;

				margin-left: 12px;
			}
		}

		.right {
			display: flex;
			align-items: center;

			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: normal;
			color: #1f191b;
			line-height: 130.5%;

			.NFTPrice {
				font-size: 16px;
				margin-right: 8px;
			}

			.NFTUSDPrice {
				font-size: 13px;
				opacity: 0.4;
			}
		}
	}

	.button_group {
		grid-area: button_group;

		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 16px;
	}
`;

/* const CheckAgree = styled.div`
	grid-area: checkAgree;

	height: 18px;
	display: grid;
	grid-template-columns: 16px auto;
	column-gap: 8px;
	align-items: center;

	a {
		font-family: Helvetica Neue;
		font-style: normal;
		font-weight: normal;
		font-size: 14px;
		line-height: 130.5%;
		color: #0000ff;
	}
`;

const MyCheckbox = withStyles({
	root: {
		padding: 0,
	  '&$checked': {
		color: "#124EEB",
	  },
	},
	checked: {},
  })((props) => <Checkbox {...props} />); */

export default function ModalBox({
	open,
	setOpen,
	title,
	poolInfo,
	nftInfo,
	isLoading,
	onClick,
	price,
	USD_Price,
}) {
	const classes = useStyles();

	/* const [agree, setAgree] = useState(false); */

	const { wrapperIntl } = useWrapperIntl()

	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			className={classes.modal}
			open={open}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
			title={title}
			/* isClose={isClose} */
		>
			<Fade in={open}>
				<div className={classes.paper}>
					<HeaderStyled>
						<h3>{title}</h3>
						{
							<img
								src={icon_close}
								alt=""
								onClick={() => {
									setOpen && setOpen(false);
								}}
							/>
						}
					</HeaderStyled>

					<ModalContent>
						<div className="title_n_balance">
							{/* <span className="str_CurrentPrice">
								Current price
							</span> */}
							<span className="balance">
								{wrapperIntl("BuyNowModal.YourBalance")}:&nbsp;
								<span className="balanceValue">{(poolInfo.token1.balance).substr(0,6)} {poolInfo.token1.symbol}</span>
							</span>
						</div>

						<div className="img_n_price">
							<div className="left">
								<AutoStretchBaseWidthOrHeightImg
									src={nftInfo && nftInfo.fileurl}
									width={44}
									height={44}
								/>
								<span className="NFTName">
									{nftInfo.itemname || wrapperIntl("BuyNowModal.NameLoading")}
								</span>
							</div>
							<div className="right">
								<span className="NFTPrice">{price} {poolInfo.token1.symbol}</span>
								<span className="NFTUSDPrice">
									{/* ($10,24) */}
									{USD_Price}
								</span>
							</div>
						</div>

						{/* <CheckAgree className="checkAgree">
							<MyCheckbox
								color="primary"
								inputProps={{
									"aria-label": "checkbox",
								}}
								checked={agree}
								onClick={() => {
									setAgree(!agree);
								}}
							/>
							<div className="notification">
								<span>I agree to Fangible’s&nbsp;</span>
								<a target="_blank" href="#">
									Term of Service
								</a>
							</div>
						</CheckAgree> */}

						<div className="button_group">
							<Button
								width="200px"
								height="48px"
								value={wrapperIntl("BuyNowModal.Cancel")}
								disabled={
									isLoading || poolInfo.status !== "Live"
								}
								onClick={() => {
									setOpen(false);
									/* setAgree(false); */
								}}
							/>
							<Button
								width="200px"
								height="48px"
								primary="primary"
								value={wrapperIntl("BuyNowModal.Checkout")}
								disabled={
									isLoading ||
									poolInfo.status !== "Live" /* || !agree */
								}
								onClick={() => {
									onClick();
									/* setAgree(false); */
									setOpen(false);
								}}
							/>
						</div>
					</ModalContent>
				</div>
			</Fade>
		</Modal>
	);
}
