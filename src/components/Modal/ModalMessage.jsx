import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import { myContext } from "@/redux/index.js";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
		width: "100%",
		zIndex: 9999,
		"& > * + *": {
			marginTop: theme.spacing(2),
		},
		"& .MuiAlert-standardInfo": {
			backgroundColor: "#000000",
		},
		"& .MuiAlert-standardSuccess": {
			backgroundColor: "#2DAB50",
		},
		"& .MuiAlert-standardWarning": {
			backgroundColor: "rgb(255, 244, 229)",
		},
		"& .MuiAlert-standardError": {
			backgroundColor: "#E43F29",
		},
	},
	alerts: {
		height: "60px",
		borderRadius: "0",
		color: "#fff",
		"& .MuiAlert-message": {
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			fontSize: "14px",
		},
		"& .MuiAlert-action": {
			marginRight: "0",
		},
	},
	close: {
		color: "#fff",
	},
	links: {
		textDecoration: "underline",
		cursor: "pointer",
		marginLeft: "10px",
	},
}));
// modelType:'info'/'success'/'error'/'warning'

export default function ModalMessage() {
	const classes = useStyles();
	const { state, dispatch } = useContext(myContext);
	const [bodyOverflow, setBodyOverflow] = React.useState(null);
	let timer;
	if (timer) {
		clearTimeout(timer);
	}
	if (state.modelTimer) {
		timer = setTimeout(() => {
			if (state.showMessageModal) {
				dispatch({
					type: "Modal_Message",
					showMessageModal: false,
					modelType: "",
					modelMessage: "",
					modelTimer: 5000,
				});
			}
		}, state.modelTimer);
	} else {
		timer = setTimeout(() => {
			if (state.showMessageModal) {
				dispatch({
					type: "Modal_Message",
					showMessageModal: false,
					modelType: "",
					modelMessage: "",
					modelTimer: 5000,
				});
			}
		}, 5000);
	}

	/* const openNewWeb = () => {
		if (state.modelOpenUrl) {
			window.open(state.modelOpenUrl);
		}
	}; */

  

  const ConnectToBSCChain = async () => {
    let ethereum = window.ethereum;

    if (typeof ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    }

    const BSCChainInfo = [
      {
        chainId: "0x38",
        chainName: "Binance Smart Chain Mainnet",
        nativeCurrency: {
          name: "HT",
          symbol: "HT",
          decimals: 18,
        },
        /* rpcUrls: ["https://bsc-dataseed.binance.org/"], */
        rpcUrls: ["https://bsc-dataseed4.binance.org"],
        blockExplorerUrls: ["https://bscscan.com/"],
      },
    ];

      const result = await ethereum.request({method: 'wallet_addEthereumChain', params: BSCChainInfo}).catch()
      console.log("switch chain")
      window.location.reload()

      if (result) {
          console.log(result)
      }
  };

	const subsequentAction = () => {
		switch (state.subsequentActionType) {
		case "openNewWeb":
			if (state.modelOpenUrl) {
			window.open(state.modelOpenUrl);
			}
			break;

		case "connectToBSCChain":
			ConnectToBSCChain();
			break;

		case "connectWallet":
			/* alert("connectWallet!!!") */
			state.subsequentActionFunc(true)
			break;
		
		default:
			break;
		}
	};
  
	useEffect(() => {
		const originalStyle = window.getComputedStyle(document.body).overflow;
		if (originalStyle === "hidden") {
			setBodyOverflow("fixed");
		} else {
			setBodyOverflow("relative");
		}
	}, [state.showMessageModal]);

  /* useEffect(() => {
    console.log("state", state)
  }, [state]) */

	return (
		<div className={classes.root} style={{ position: bodyOverflow }}>
			<Collapse in={state.showMessageModal}>
				<Alert
					severity={state.modelType || "warning"}
					className={classes.alerts}
					icon={false}
					action={
						state.canClose 
            			&& 
            			<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								dispatch({
									type: "Modal_Message",
									showMessageModal: false,
									modelType: "",
									modelMessage: "",
									modelTimer: 5000,
								});
							}}
						>
							<CloseIcon
								className={classes.close}
								fontSize="inherit"
							/>
						</IconButton>
					}
				>
					{state.modelMessage/*  || "Info" */}
          
					<span
						className={classes.links}
						onClick={() => {
							/* openNewWeb(); */
              				subsequentAction()
						}}
					>
						{state.modelUrlMessage}
					</span>
				</Alert>
			</Collapse>
		</div>
	);
}
