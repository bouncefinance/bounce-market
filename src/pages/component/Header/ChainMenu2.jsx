import { useState, useRef, useEffect } from "react";
import { useActiveWeb3React } from "@/web3";
import styled from 'styled-components'

const chainsName = {
	56: "BSC",
	128: "HECO",
};

const chains = [
	{
		Id: 56,
		name: "BSC",
	},
	{
		Id: 128,
		name: "HECO",
	},
];

const ConnectToChain = async (Id) => {
	let ethereum = window.ethereum;

	if (typeof ethereum !== "undefined") {
		console.log("MetaMask is installed!");
	}

	const chainsInfo = {
		56: {
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
		128: {
			chainId: "0x80",
			chainName: "Huobi ECO Chain Mainnet",
			nativeCurrency: {
				name: "HT",
				symbol: "HR",
				decimals: 18,
			},
			rpcUrls: ["https://http-mainnet.hecochain.com"],
			blockExplorerUrls: ["https://scan.hecochain.com"],
		},
	};

	const result = await ethereum
		.request({ method: "wallet_addEthereumChain", params: chainsInfo[Id] })
		.catch();
	if (result) {
		console.log(result);
	}

	window.location.reload();
};

const Menu = styled.ul`
	display: flex;
	flex-direction: column;
`

export default function ChainMenu() {
	const { chainId } = useActiveWeb3React();
	const [openMenu, setOpenMenu] = useState(false);

	return (
		<>
			{chainId && (
				<span
					className="currentChain"
					onClick={() => {
						setOpenMenu(true);
					}}
				>
					{chainsName[chainId]}
				</span>
			)}
			{openMenu && (
				<Menu className="ChainMenu">
					{chains.map((chain, index) => {
						if (chainId === chain.Id) return;
						return <li className="chainOption">{chain.name}</li>;
					})}
				</Menu>
			)}
		</>
	);
}
