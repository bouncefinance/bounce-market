import { NFTContent } from 'modules/detailsNFT/components/NFTContent';
import { NFTDescription } from 'modules/detailsNFT/components/NFTDescription';
import { useDetailsNFTStyles } from './useDetailsNFTStyles';

export const DetailsNFT = () => {
  const classes = useDetailsNFTStyles();

  return (
    <div className={classes.root}>
      <NFTContent className={classes.content} />
      <NFTDescription className={classes.descr} />
    </div>
  );
};
