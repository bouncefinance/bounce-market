import { Box, Card, Link } from "@material-ui/core"
import classNames from "classnames"
import { useAccount } from "modules/account/hooks/useAccount";
import { ExternalIcon } from "modules/buyNFT/components/InfoTabsItem/assets/ExternalIcon";
import { useInfoTabsItemStyles } from "modules/buyNFT/components/InfoTabsItem/useInfoTabsItemStyles";
import { getBlockChainExplorerAddress } from "modules/common/conts";
import { truncateWalletAddr } from "modules/common/utils/truncateWalletAddr";
import { RoutesConfiguration } from "modules/createNFT/Routes";
import { Button } from "modules/uiKit/Button";
import { Img } from "modules/uiKit/Img";
import { useErc20CardStyles } from "./useFtItemCard";
import { useProductCardStyles } from "./useProductCardStyles";

export interface IFtConfig {
    contract: string;
    name: string;
    tokenImg: string;
    decimals: string;
}

const rinkebyConfig = [
    {
        contract: process.env.REACT_APP_FT_CONTRACT_ADDRESS_RINKEBY ?? '',
        name: 'FT',
        tokenImg: 'https://ap1-cfs3-media-bounce.bounce.finance/160xauto/4818b35c8eff5ba68ea807a64d06c498-1644662588.png',
        decimals: '18'
    }
]
export const FT_CONFIG_LIST: (chainId: number) => IFtConfig[] = (chainId) => {
    switch(chainId){
        case 4: return rinkebyConfig
        // TODO more chain
    }
    return rinkebyConfig
}

export const getFtItemInfo = (chainId: number,id: string) => FT_CONFIG_LIST(chainId).find((e) => e.contract === id)

export const FtItemCard = ({
    isOther,
    hasAction,
    item,
    reload
}: {
    isOther?: boolean;
    hasAction?: boolean;
    item: IFtConfig;
    reload?: () => void;
}) => {
    const { chainId } = useAccount();
    const cardClasses = useProductCardStyles();
    const classes = useErc20CardStyles()
    const linkClasses = useInfoTabsItemStyles();
    const blockChainScan = getBlockChainExplorerAddress(chainId);
    return <>
        <Card className={classNames(cardClasses.root, classes.root)} variant="outlined">
            <Box mt={4} display="flex" justifyContent="space-between">
                <div>
                    <div className={classes.amount}>Amount</div>
                    {/* TODO */}
                    <div className={classes.balanceFT}>xx FT</div>
                </div>
                <Img className={classes.ft} src={item.tokenImg} />
            </Box>
            <Box className={classes.actions} mt={8} display="flex">
                <Link href={RoutesConfiguration.DepositToken.generatePath() + `?id=${item.contract}`}>
                    <Button rounded fullWidth variant="outlined">Deposit</Button>
                </Link>
                <div style={{ width: 20 }}></div>
                <Link style={{ width: '100%', whiteSpace: 'nowrap' }} href={RoutesConfiguration.PublishErc20.generatePath(item.contract)}>
                    <Button rounded fullWidth variant="outlined">
                        Put on sale
                    </Button>
                </Link>
            </Box>
            <Box mt={2.5}>
                <a
                    href={`${blockChainScan}/address/${item.contract}`}
                    className={linkClasses.link}
                    target="_blank"
                    rel="noreferrer"
                >
                    {truncateWalletAddr(item.contract)}
                    &nbsp;
                    <ExternalIcon className={classes.linkIcon} />
                </a>
            </Box>
        </Card>
    </>

}