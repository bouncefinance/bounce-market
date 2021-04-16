import React from "react";

const ConnectToSelectedChain = async () => {
	let ethereum = window.ethereum;

	if (typeof ethereum !== "undefined") {
		console.log("MetaMask is installed!");
	}

	const BSCChainInfo = [
		{
			chainId: "0x38",
			chainName: "Binance Smart Chain Mainnet",
			nativeCurrency: {
				name: "BNB",
				symbol: "BNB",
				decimals: 18,
			},
			/* rpcUrls: ["https://bsc-dataseed.binance.org/"], */
			rpcUrls: ["https://bsc-dataseed4.binance.org"],
			blockExplorerUrls: ["https://bscscan.com/"],
		},
	];

    const result = await ethereum.request({method: 'wallet_addEthereumChain', params: BSCChainInfo}).catch()
    if (result) {
        console.log(result)
    }
};

export default function Index() {
	return (
		<div>
			<h1>Test Page</h1>

			{
				<button
                    style={{
                        border: "solid 1px rgb(0,0,0)"
                    }}
					onClick={() => {
						ConnectToSelectedChain();
					}}
				>
					connect BSC chain
				</button>
			}
		</div>
	);
}
