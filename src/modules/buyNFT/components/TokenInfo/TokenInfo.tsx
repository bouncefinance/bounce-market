// import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { NftType } from 'modules/createNFT/actions/createNft';
import { t } from 'modules/i18n/utils/intl';
import { useIsSMUp } from 'modules/themes/useTheme';
import { useTokenInfoStyles } from './useTokenInfoStyles';

interface ITokenInfoProps {
  name: string;
  itemSymbol: 'BOUNCE';
  standard: NftType;
  contractAddress: string;
  supply: number;
  tokenId: number;
}

export const TokenInfo = ({
  name,
  itemSymbol,
  standard,
  contractAddress,
  supply,
  tokenId,
}: ITokenInfoProps) => {
  const classes = useTokenInfoStyles();
  const isSMUp = useIsSMUp();

  return (
    <>
      {contractAddress && (
        <Typography className={classes.paragraph}>
          <b>{t('details-nft.token-info.contract')}</b>
          {` `}
          {isSMUp ? contractAddress : truncateWalletAddr(contractAddress)}
        </Typography>
      )}

      {tokenId && (
        <Typography className={classes.paragraph}>
          <b>{t('details-nft.token-info.token-id')}</b>
          {tokenId}
        </Typography>
      )}

      {name && (
        <Typography className={classes.paragraph}>
          <b>{t('details-nft.token-info.name-tags')}</b>
          {`${name} ${itemSymbol && `(${itemSymbol})`}`}
        </Typography>
      )}

      <Typography className={classes.paragraph}>
        <b>{t('details-nft.token-info.standard')}</b>
        {standard === NftType.ERC1155 ? 'ERC-1155' : 'ERC-721'}
      </Typography>

      {(supply || supply === 0) && (
        <Typography className={classes.paragraph}>
          <b>{t('details-nft.token-info.total-supply')}</b>
          {supply}
        </Typography>
      )}
    </>
  );
};
