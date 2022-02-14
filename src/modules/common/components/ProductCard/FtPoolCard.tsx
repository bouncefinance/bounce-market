import { Box, Card } from "@material-ui/core"
import BigNumber from "bignumber.js";
import classNames from "classnames"
import { useAccount } from "modules/account/hooks/useAccount";
import { ExternalIcon } from "modules/buyNFT/components/InfoTabsItem/assets/ExternalIcon";
import { useInfoTabsItemStyles } from "modules/buyNFT/components/InfoTabsItem/useInfoTabsItemStyles";
import { getBlockChainExplorerAddress } from "modules/common/conts";
import { truncateWalletAddr } from "modules/common/utils/truncateWalletAddr";
import { IApePoolData } from "modules/market/actions/ftMarketList";
import { Button } from "modules/uiKit/Button";
import { Img } from "modules/uiKit/Img";
import { useState } from "react";
import { BuyCoinDialog } from "../buyErc20/buyCoinDialog";
import { getFtItemInfo } from "./FtItemCard";
import { useErc20CardStyles } from "./useFtItemCard";
import { useErc20PoolCardStyles } from "./useFtPoolCardStyles";
import { useProductCardStyles } from "./useProductCardStyles";

export const FtPoolCard = ({
    item,
    isOther,
    isMarket,
    hasAction,
    reload
}: {
    item: IApePoolData;
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
    const itemInfo = getFtItemInfo(chainId, item.tokena)
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
    // console.log('----item----->', item)
    const decimals = new BigNumber(10).pow(itemInfo?.decimals ?? 18)
    return <>
        <Card className={classNames(cardClasses.root, itemClasses.root)} variant="outlined">
            <Box className={classes.progressOutBox} mt={3}>
                <span>{new BigNumber(item.total_amounta).dividedBy(decimals).dp(4).toString()} AFT</span>
                <span> / </span>
                <span className={classes.progressBalanceText}>{new BigNumber(item.swapped_amounta).dividedBy(decimals).dp(4).toString()} AFT</span>
                <Box mt={0.5} className={classes.progressBox}>
                    <div className={classes.progress} style={{ width: new BigNumber(item.swapped_amounta).dividedBy(item.total_amounta).multipliedBy(100).dp(2).toString() + '%' }}></div>
                </Box>
            </Box>
            <Box mt={2} display="flex" justifyContent="space-between">
                <div>
                    <div className={itemClasses.amount}>Total Price</div>
                    <div className={itemClasses.balanceFT}>{new BigNumber(item.total_amounta).dividedBy(decimals).multipliedBy(item.price).dp(4).toString()} APE</div>

                    <div className={itemClasses.amount}>Amount</div>
                    <div className={itemClasses.balanceFT}>{new BigNumber(item.total_amounta).dividedBy(decimals).dp(4).toString()} AFT</div>
                </div>
                <Img className={itemClasses.ft} src={itemInfo?.tokenImg} />
            </Box>
            <Box mt={4} display="flex" justifyContent="space-between">
                <span>Reference</span>
                <span>{item.price} APE per FT</span>
            </Box>
            {auctionsRender()}
            <Box mt={2.5}>
                <a
                    href={`${blockChainScan}/address/${item.tokena}`}
                    className={linkClasses.link}
                    target="_blank"
                    rel="noreferrer"
                >
                    {truncateWalletAddr(item.tokena)}
                    &nbsp;
                    <ExternalIcon className={itemClasses.linkIcon} />
                </a>
            </Box>
        </Card>
        <BuyCoinDialog isOpen={isBuyOpen} onClose={onBuyClose} />
    </>

}