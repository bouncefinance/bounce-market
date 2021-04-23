import React, {useState, useEffect} from "react";

import { useActiveWeb3React } from "@/web3";

export default function Index() {
	const { account, active, activate, deactivate } = useActiveWeb3React();

	useEffect(() => {
		console.log("account: ", account)
		console.log("active: ", active)
	}, [account, active])

	return (
		active && <div
			style={{
				display: "grid",
				gridTemplateRows: "repeat(3, max-content)",
				gridTemplateColumns: "max-content",
				rowGap: "20px",
				justifyContent: "center",
			}}
		>
			<h1>Test Page</h1>
			{<span style={{ border: "1px solid red" }}>
				active: {active ? "true" : "false"}
			</span>}

			<span
				style={{
					border: "1px solid grey",
				}}
			>
				account: {account ? account : "--"}
			</span>

			{
				<button
					style={{ border: "1px solid black", borderRadius: "50px" }}
					onClick={() => {
						/* if (!active) activate();
						else deactivate(); */
						activate()
					}}
				>
					{active ? "deactivate" : "activate"}
				</button>
			}
		</div>
	);
}
