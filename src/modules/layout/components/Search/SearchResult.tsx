import { useAccount } from 'modules/account/hooks/useAccount';
import { auctionTypeMap } from 'modules/api/common/poolType';
import { QueryLoadingCentered } from 'modules/common/components/QueryLoading/QueryLoading';
import { getNativeTokenSymbol } from 'modules/common/conts';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { BuyNFTRoutesConfig } from '../../../buyNFT/BuyNFTRoutes';
import { DefaultRandomAvatar } from '../../../common/components/DefaultRandomAvatar';
import { VideoPlayer } from '../../../common/components/VideoPlayer';
import { t } from '../../../i18n/utils/intl';
import { ProfileRoutesConfig } from '../../../profile/ProfileRoutes';
import { Img } from '../../../uiKit/Img';
import {
  ISearchAccount,
  ISearchBrand,
  ISearchItem,
  ISearchResult,
} from './getByLikeStr';
import { useSearchResultStyles } from './useSearchResultStyles';

const SearchItems = ({ data }: { data: ISearchItem[] }) => {
  const classes = useSearchResultStyles();
  const { chainId, isChainSupported } = useAccount();

  if (!data.length) {
    return null;
  }

  return (
    <div className={classes.group}>
      <div className={classes.title}>{t('header.search.items')}</div>
      {data.map((item: ISearchItem) => {
        return (
          <RouterLink
            to={BuyNFTRoutesConfig.DetailsNFT.generatePath(
              item.poolid,
              auctionTypeMap[item.pooltype],
            )}
            className={classes.content}
            key={item.id}
          >
            <div className={classes.preview}>
              {item.category === 'video' ? (
                <VideoPlayer
                  src={item.previewUrl}
                  objectFit="cover"
                  autoPlay
                  muted
                  controls={false}
                />
              ) : (
                <Img
                  src={item.previewUrl}
                  size="small"
                  alt={item.name}
                  ratio="1x1"
                  objectFit="cover"
                />
              )}
            </div>
            <div className={classes.item}>
              <div className={classes.name}>{item.name}</div>
              {item.price && (
                <div className={classes.price}>
                  {item.price}{' '}
                  {isChainSupported ? getNativeTokenSymbol(chainId) : 'BNB'}
                </div>
              )}
            </div>
          </RouterLink>
        );
      })}
    </div>
  );
};

const SearchBrand = ({ data }: { data: ISearchBrand[] }) => {
  const classes = useSearchResultStyles();

  if (!data.length) {
    return null;
  }

  return (
    <div className={classes.group}>
      <div className={classes.title}>{t('header.search.collections')}</div>
      {data.map((item: ISearchBrand) => (
        <RouterLink
          to={ProfileRoutesConfig.Collection.generatePath(item.contractAddress)}
          className={classes.content}
          key={item.contractAddress}
        >
          <div className={classes.preview}>
            <Img
              src={item.previewUrl}
              size="small"
              alt={item.name}
              ratio="1x1"
              objectFit="cover"
            />
          </div>
          <div className={classes.item}>
            <div className={classes.name}>{item.name}</div>
          </div>
        </RouterLink>
      ))}
    </div>
  );
};

const SearchAccount = ({ data }: { data: ISearchAccount[] }) => {
  const classes = useSearchResultStyles();

  if (!data.length) {
    return null;
  }

  return (
    <div className={classes.group}>
      <div className={classes.title}>{t('header.search.users')}</div>
      {data.map((item: ISearchAccount) => (
        <RouterLink
          to={ProfileRoutesConfig.OtherProfile.generatePath(
            item.accountAddress,
          )}
          className={classes.content}
          key={item.id}
        >
          <DefaultRandomAvatar
            className={classes.avatar}
            src={item.previewUrl}
          />
          <div className={classes.item}>
            <div className={classes.name}>{item.name}</div>
          </div>
        </RouterLink>
      ))}
    </div>
  );
};

const SearchResult = ({
  loading,
  data,
  handleClose,
}: {
  loading?: boolean;
  data: ISearchResult;
  handleClose: () => void;
}) => {
  const classes = useSearchResultStyles();
  console.log('data', data);
  return (
    <div className={classes.root} onClick={handleClose}>
      {loading ? <QueryLoadingCentered /> : <SearchItems data={data.items} />}
      {loading ? <QueryLoadingCentered /> : <SearchBrand data={data.brands} />}
      {loading ? (
        <QueryLoadingCentered />
      ) : (
        <SearchAccount data={data.accounts} />
      )}
      {!loading &&
        !data.items.length &&
        !data.brands.length &&
        !data.accounts.length && (
          <div className={classes.empty}>{t('header.search.empty')}</div>
        )}
    </div>
  );
};

export { SearchResult };
