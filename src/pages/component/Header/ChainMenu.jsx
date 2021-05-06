import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from '@material-ui/core/styles';
import { useActiveWeb3React } from "@/web3";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
	},
	
}));

const options = ["BSC", "HECO"];

const chainsName = {
	56: "BSC",
	128: "HECO",
};

const chainsId = {
	BSC: 56,
	HECO: 128,
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

const ConnectToChain = async (chainName) => {
	let ethereum = window.ethereum;

	if (typeof ethereum !== "undefined") {
		console.log("MetaMask is installed!");
	}

	const BSCInfo = [{
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
	}];

	const HECOInfo = [{
		chainId: "0x80",
		chainName: "Huobi ECO Chain Mainnet",
		nativeCurrency: {
			name: "HT",
			symbol: "HR",
			decimals: 18,
		},
		rpcUrls: ["https://http-mainnet.hecochain.com"],
		blockExplorerUrls: ["https://scan.hecochain.com"],
	}];

	const result = await ethereum
		.request({
			method: "wallet_addEthereumChain",
			params: chainName === "BSC" ? BSCInfo : HECOInfo,
		})
		.catch();
	if (result) {
		console.log(result);
	}

	window.location.reload();
};

const StyledMenu = withStyles({
	paper: {
	  border: '1px solid #d3d4d5',
	},
  })((props) => (
	<Menu
	  elevation={0}
	  getContentAnchorEl={null}
	  anchorOrigin={{
		vertical: 'bottom',
		horizontal: 'center',
	  }}
	  transformOrigin={{
		vertical: 'top',
		horizontal: 'center',
	  }}
	  {...props}
	/>
  ));

export default function SimpleListMenu() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [selectedIndex, setSelectedIndex] = React.useState(1);
	const {chainId} = useActiveWeb3React()

	const handleClickListItem = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index);
		setAnchorEl(null);
		console.log("chainsId[options[index]]", chainsId[options[index]]);
		let selectedId = chainsId[options[index]];
		let selectedChainName = options[index];
		ConnectToChain(selectedChainName);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={classes.root}>
			<List component="nav" aria-label="Device settings">
				<ListItem
					button
					aria-haspopup="true"
					aria-controls="lock-menu"
					aria-label="when device is locked"
					onClick={handleClickListItem}
				>
					<ListItemText primary={chainsName[chainId] ? chainsName[chainId] : 'Unsupported'} />
				</ListItem>
			</List>
			<StyledMenu
				id="lock-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{options.map((option, index) => (
					<MenuItem
						key={option}
						// disabled={index === 0}
						selected={index === selectedIndex}
						onClick={(event) => handleMenuItemClick(event, index)}
					>
						{option}
					</MenuItem>
				))}
			</StyledMenu>
		</div>
	);
}
