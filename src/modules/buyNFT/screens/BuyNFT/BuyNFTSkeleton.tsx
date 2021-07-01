import {Info} from 'modules/buyNFT/components/Info';
import {useBuyNFTStyles} from './useBuyNFTStyles';
import {InfoPricesSkeleton} from "../../components/InfoPrices";
import {InfoDescrSkeleton} from "../../components/InfoDescr";
import {MediaContainerSkeleton} from "../../components/MediaContainer";
import {InfoTabsSkeleton} from "../../components/InfoTabs";

export const BuyNFTSkeleton = () => {
  const classes = useBuyNFTStyles();

  return (
    <div className={classes.root}>
      <MediaContainerSkeleton className={classes.imgContainer}/>

      <Info className={classes.info}>
        <InfoDescrSkeleton/>
        <InfoPricesSkeleton/>
        <InfoTabsSkeleton />
      </Info>
    </div>
  );
};
