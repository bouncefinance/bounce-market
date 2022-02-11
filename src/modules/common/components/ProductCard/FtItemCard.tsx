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

// TODO Rinkeby
export const FT_CONFIG_LIST: IFtConfig[] = [
    {
        contract: process.env.REACT_APP_FT_CONTRACT_ADDRESS_RINKEBY ?? '',
        name: 'FT',
        tokenImg: 'https://pancakeswap.finance/images/tokens/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82.png',
        decimals: '18'
    }
]

export const getFtItemInfo = (id: string) => FT_CONFIG_LIST.find((e) => e.contract === id)

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
                <Button rounded fullWidth variant="outlined">Deposit</Button>
                <div style={{ width: 20 }}></div>
                <Link style={{ width: '100%', whiteSpace: 'nowrap' }} href={RoutesConfiguration.PublishErc20.generatePath(item.contract)}>
                    <Button rounded fullWidth variant="outlined">
                        Put on sale
                    </Button>
                </Link>
            </Box>
            <Box mt={2.5}>
                <a
                    href={`${blockChainScan}/address/0x4074A8deA884611F6553932CDF0B8390CDbA427E`}
                    className={linkClasses.link}
                    target="_blank"
                    rel="noreferrer"
                >
                    {truncateWalletAddr('0x4074A8deA884611F6553932CDF0B8390CDbA427E')}
                    &nbsp;
                    <ExternalIcon className={classes.linkIcon} />
                </a>
            </Box>
        </Card>
    </>

}