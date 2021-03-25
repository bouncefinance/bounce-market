import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ErrorStatus } from "./error_config";

const InputStyled = styled.div`
	margin-top: ${({ marginTop }) => {
		return marginTop;
	}};

	.title {
		font-weight: 700;
		font-size: 13px;
		color: rgba(0, 0, 0, 0.6);
		margin-bottom: 8px;

		&.error {
			color: #e43f29;
		}
	}

	input {
		width: ${({ width }) => {
			return width;
		}};
		height: ${({ height }) => {
			return height;
		}};
		border: 1px solid rgba(0, 0, 0, 0.2);
		box-sizing: border-box;
		color: rgba(0, 0, 0, 0.8);
		font-weight: 500px;
		font-size: 16px;
		padding: 0 20px;

		&:hover {
			border: 1px solid rgba(0, 0, 0, 0.6);
		}

		&:focus {
			border: 1px solid rgba(0, 0, 0, 0.8);
			color: rgba(0, 0, 0, 1);
		}

		&:disabled {
			border: 1px solid rgba(0, 0, 0, 1);
			color: rgba(0, 0, 0, 1);
			opacity: 0.2;
		}

		&.lockInput:disabled {
			border: 1px solid rgba(0, 0, 0, 0.2);
			color: rgba(0, 0, 0, 0.8);
			opacity: 1;
		}

		&.error {
			border: 1px solid #e43f29;
			color: #e43f29;
		}
	}

	.number_input {
		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
		}
	}

	.err_msg{
        color: #E43F29;
        font-size: 12px;
        line-height: 16px;
        margin-top: 4px;
        min-height:16px;
        visibility: hidden;
    }
    .errorType{
        visibility: visible;
    }
`;

export default function TextInput({
	title,
	placeholder,
	disabled,
	onChange,
	defaultValue,
	onValChange,
	maxLength,
	required = false,
	width = "440px",
	height = "48px",
	marginTop = "20px",
	lockInput,
	inputType = "text"
}) {
	const [error, setError] = useState(false);
	const [errMsg, setErrMsg] = useState(null);

	useEffect(() => {
		onValChange && onValChange(defaultValue);
		// eslint-disable-next-line
	}, []);

	const handelChange = (e) => {
		onChange && onChange(e);

		if (!onValChange) return;
		const val = e.target.value;

		return onValChange(val);
	};

	const handelBlur = (e) => {
		const val = e.target.value;
		if (required && val.trim() === "") {
			setError(true);
			setErrMsg(ErrorStatus.required.tip);
		}else if(inputType ==="email" && (required || val.trim() !== "")  && !ErrorStatus.email.reg.test(val)){
			setError(true);
			setErrMsg(ErrorStatus.email.tip);
		}else if(inputType ==="url" && (required || val.trim() !== "") && !ErrorStatus.url.reg.test(val)){
			setError(true);
			setErrMsg(ErrorStatus.url.tip);
		}
	};

	const handelFocus = () => {
		setError(false);
	};

	return (
		<InputStyled width={width} height={height} marginTop={marginTop}>
		<label>
			{title && <p className={`title ${error && "error"}`}>{title}</p>}
				<input
					type="text"
					className={`${error && "error"} ${lockInput && "lockInput"}`}
					defaultValue={defaultValue}
					placeholder={placeholder}
					disabled={disabled || lockInput}
					onChange={handelChange}
					onBlur={handelBlur}
					onFocus={handelFocus}
					required={required}
					maxLength={maxLength}
				/>
			</label>	
			<p className={`${error && 'errorType'} ${'err_msg'}`}>{errMsg}</p>
		</InputStyled>
	);
}
