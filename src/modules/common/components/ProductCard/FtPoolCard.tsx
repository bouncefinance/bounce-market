import { Box, Card } from "@material-ui/core"
import classNames from "classnames"
import { useAccount } from "modules/account/hooks/useAccount";
import { ExternalIcon } from "modules/buyNFT/components/InfoTabsItem/assets/ExternalIcon";
import { useInfoTabsItemStyles } from "modules/buyNFT/components/InfoTabsItem/useInfoTabsItemStyles";
import { getBlockChainExplorerAddress } from "modules/common/conts";
import { truncateWalletAddr } from "modules/common/utils/truncateWalletAddr";
import { Button } from "modules/uiKit/Button";
import { Img } from "modules/uiKit/Img";
import { useState } from "react";
import { BuyCoinDialog } from "../buyErc20/buyCoinDialog";
import { useErc20CardStyles } from "./useFtItemCard";
import { useErc20PoolCardStyles } from "./useFtPoolCardStyles";
import { useProductCardStyles } from "./useProductCardStyles";

export const FtPoolCard = ({
    isOther,
    isMarket,
    hasAction,
    reload
}: {
    isOther?: boolean;
    isMarket?: boolean;
    hasAction?: boolean;
    reload?: () => void;
}) => {
    const { chainId } = useAccount();
    const cardClasses = useProductCardStyles();
    const itemClasses = useErc20CardStyles()
    const classes = useErc20PoolCardStyles()
    const linkClasses = useInfoTabsItemStyles();
    const blockChainScan = getBlockChainExplorerAddress(chainId);
    const [isBuyOpen, setIsBuyOpen] = useState(false)
    const onBuyClose = () => {
        setIsBuyOpen(false)
    }
    const onBuy = () => {
        setIsBuyOpen(true)
    }
    const auctionsRender = () => {
        return <>
            {isMarket ? <>
                <Box className={itemClasses.actions} mt={2} display="flex">
                <Button fullWidth onClick={onBuy}>
                    Buy
                </Button>
            </Box>
            </> : <>
                <Box className={itemClasses.actions} mt={2} display="flex">
                <Button fullWidth variant="outlined">
                    Cancel
                </Button>
            </Box>
            </>}
        </>
    }
    return <>
        <Card className={classNames(cardClasses.root, itemClasses.root)} variant="outlined">
            <Box className={classes.progressOutBox} mt={3}>
                <span>100 AFT</span>
                <span> / </span>
                <span className={classes.progressBalanceText}>30 AFT</span>
                <Box mt={0.5} className={classes.progressBox}>
                    <div className={classes.progress} style={{ width: '30%' }}></div>
                </Box>
            </Box>
            <Box mt={2} display="flex" justifyContent="space-between">
                <div>
                    <div className={itemClasses.amount}>Price</div>
                    <div className={itemClasses.balanceFT}>xx APE</div>

                    <div className={itemClasses.amount}>Amount</div>
                    <div className={itemClasses.balanceFT}>xx AFT</div>
                </div>
                <Img className={itemClasses.ft} src="" />
            </Box>
            <Box mt={4} display="flex" justifyContent="space-between">
                <span>Reference</span>
                <span>0.0405 APE per FT</span>
            </Box>
            {auctionsRender()}
            <Box mt={2.5}>
                <a
                    href={`${blockChainScan}/address/0x4074A8deA884611F6553932CDF0B8390CDbA427E`}
                    className={linkClasses.link}
                    target="_blank"
                    rel="noreferrer"
                >
                    {truncateWalletAddr('0x4074A8deA884611F6553932CDF0B8390CDbA427E')}
                    &nbsp;
                    <ExternalIcon className={itemClasses.linkIcon} />
                </a>
            </Box>
        </Card>
        <BuyCoinDialog isOpen={isBuyOpen} onClose={onBuyClose} />
    </>

}