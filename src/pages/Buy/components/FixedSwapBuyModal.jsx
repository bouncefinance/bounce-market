import { React, useEffect /* useState */ } from "react";
import styled from "styled-components";

import { makeStyles, /* withStyles */ } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
/* import Checkbox from "@material-ui/core/Checkbox"; */

import { Button } from "@components/UI-kit";
import AmountInput from './AmountInput'

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
	grid-template-rows: 120px /* 50px */ 48px;
	grid-template-areas:
		"inputAmount"
		/* "checkAgree" */
		"button_group";

	.input_amount {
		grid-area: inputAmount;
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
	inputMin,
	poolInfo,
	isLoading,
	onClick,
	amount,
	setAmount,
	USD_Price,
}) {
	const classes = useStyles();

	/* const [agree, setAgree] = useState(false); */

	useEffect(() => {
		/* console.log("inputMin", inputMin)
		console.log("poolInfo", poolInfo)
		console.log("maxVal", parseInt(poolInfo.amountTotal0) - parseInt(poolInfo.swappedAmount0P)) */
		
	}, [poolInfo, inputMin])


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
						<AmountInput
							className="input_amount"
							title="Buy Amount"
							width="100%"
							height="68px"
							marginTop="0"
							isInteger={true}
							minVal={inputMin}
							maxVal={parseInt(poolInfo.amountTotal0) - parseInt(poolInfo.swappedAmount0P)}
							defaultValue={"1"}
							onValChange={(val) => {
								if(!val) return
								setAmount(val);
							}}
							disabled={poolInfo.nftType === '1' && false}
							afterFix={poolInfo.token1 && poolInfo.token1.symbol}
							USD_Price={USD_Price}
						/>

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
								value="Cancel"
								disabled={isLoading || poolInfo.status !== 'Live'}
								onClick={() => {
									setOpen(false);
									/* setAgree(false); */
								}}
							/>
							<Button
								width="200px"
								height="48px"
								primary="primary"
								value="Checkout"
								disabled={isLoading || poolInfo.status !== 'Live' || amount === '0' /* || !agree */}
								onClick={() => {
									onClick()
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
