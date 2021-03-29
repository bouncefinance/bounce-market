import React from "react";
import Modal from "./Modal";
import styled from "styled-components";
import { Button } from "@components/UI-kit";

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

function ConfirmCancelModal({ width, height, open, setOpen, onConfirm }) {
	return (
		<>
			<Modal
				width={width}
				height={height}
				open={open}
				setOpen={setOpen}
				header={{ title: "Confirm Cancel", isClose: true }}
			>
				<Wrapper>
					<span className="alert">Are you sure to cancel?</span>

					<div className="button_group">
						<Button
							width="150px"
							height="48px"
							value="Yes"
							onClick={() => {
								onConfirm();
								setOpen(false);
							}}
						/>
						<Button
							width="150px"
							height="48px"
							primary="primary"
							value="No"
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
