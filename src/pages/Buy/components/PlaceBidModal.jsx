import { React, useState } from "react";
import styled from "styled-components";
import { useActiveWeb3React } from "@/web3";
import { getUSDTAddress, getBUSDAddress, getUSDCAddress } from "@/web3/address_list/token";


import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Checkbox from "@material-ui/core/Checkbox";

import { Button } from "@components/UI-kit";
import InputPrice from "./InputPrice";

import icon_close from "@assets/images/icon/close.svg";
import icon_BNB from '@assets/images/wallet/icon_BNB.svg'
import icon_BUSD from '@assets/images/wallet/icon_BUSD.png'
import icon_ETH_new from '@assets/images/wallet/icon_ETH_new.svg'
import icon_USDT from '@assets/images/wallet/icon_USDT.svg'
import icon_USDC from '@assets/images/wallet/icon_USDC.svg'

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		// border: '2px solid #000',
		boxShadow: theme.shadows[5],
		// padding: theme.spacing(2, 4, 3),
		maxHeight: "100%",
		overflowY: "auto",
		width: 520,
		height: 368,
	},
}));

const HeaderStyled = styled.div`
	border-bottom: 2px solid #000;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 30px 32px 24px 38px;

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
	padding: 40px 52px 44px 52px;

	display: grid;
	grid-template-rows: 68px 18px 48px;
	grid-template-areas:
		"inputPrice"
		"checkAgree"
		"button_group";

	.button_group {
		margin-top: 50px;
		grid-area: button_group;

		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 16px;
	}
`;

const CheckAgree = styled.div`
	grid-area: checkAgree;

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


export default function ModalBox({ open, setOpen, title, /* isClose = true */ }) {
	const classes = useStyles();

	const [agree, setAgree] = useState(false);
    const [price, setPrice] = useState(0);
    const [unit, setUnit] = useState("ETH")

    
	const { chainId } = useActiveWeb3React()

	const unitOptions = [
		{
			value: chainId === 56 ? 'BNB' : 'ETH',
			contract: '0x0000000000000000000000000000000000000000',
			icon: chainId === 56 ? icon_BNB : icon_ETH_new,
			isShow: true,
			decimals: 18
		}, {
			value: 'BUSD',
			contract: getBUSDAddress(chainId),
			icon: icon_BUSD,
			isShow: chainId === 56 ? true : false,
			decimals: 18
		},
		{
			value: "USDT",
			contract: getUSDTAddress(chainId),
			icon: icon_USDT,
			isShow: true,
			decimals: 6
		},
		{
			value: "USDC",
			contract: getUSDCAddress(chainId),
			icon: icon_USDC,
			isShow: true,
			decimals: 18
		}
	];

	// eslint-disable-next-line

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
						{/* isClose &&  */(
							<img
								src={icon_close}
								alt=""
								onClick={() => {
									setOpen && setOpen(false);
								}}
							/>
						)}
					</HeaderStyled>

					<ModalContent>
						<InputPrice
                            gridArea="inputPrice"
                            price={price}
                            setPrice={setPrice}
                            unit={unit}
                            setUnit={setUnit}
                            options={unitOptions}
                        />

						<CheckAgree className="checkAgree">
							<Checkbox
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
						</CheckAgree>

						<div className="button_group">
							<Button
								width="200px"
								height="48px"
								value="Cancel"
								onClick={() => {
									setOpen(false);
								}}
							/>
							<Button
								width="200px"
								height="48px"
								primary="primary"
								value="Place a bid"
								disabled={agree ? "" : "disabled"}
								onClick={() => {
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
