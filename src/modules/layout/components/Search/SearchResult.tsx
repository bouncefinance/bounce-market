import { QueryLoadingCentered } from 'modules/common/components/QueryLoading/QueryLoading';
import {
  ISearchAccount,
  ISearchBrand,
  ISearchItem,
  ISearchResult,
} from './getByLikeStr';
import { Link as RouterLink } from 'react-router-dom';
import { BuyNFTRoutesConfig } from '../../../buyNFT/BuyNFTRoutes';
import { AuctionType } from '../../../overview/api/auctionType';
import {
  IFetchPoolDetailsData,
  isEnglishAuction,
} from '../../../overview/actions/fetchPoolDetails';
import { useSearchResultStyles } from './useSearchResultStyles';
import { t } from '../../../i18n/utils/intl';
import { Img } from '../../../uiKit/Img';
import { VideoPlayer } from '../../../common/components/VideoPlayer';
import React from 'react';
import { DefaultRandomAvatar } from '../../../common/components/DefaultRandomAvatar';
import { BrandRoutesConfig } from '../../../brand/BrandRoutes';
import { ProfileRoutesConfig } from '../../../profile/ProfileRoutes';

const SearchItems = ({
  data,
  pools,
}: {
  data: ISearchItem[];
  pools: IFetchPoolDetailsData[];
}) => {
  const classes = useSearchResultStyles();

  if (!data.length) {
    return null;
  }

  return (
    <div className={classes.group}>
      <div className={classes.title}>{t('header.search.items')}</div>
      {data.map((item: ISearchItem) => {
        const pool = pools.find(poolItem => poolItem.tokenId === item.id);

        if (!pool) {
          return null;
        }

        return (
          <RouterLink
            to={BuyNFTRoutesConfig.DetailsNFT.generatePath(
              pool.poolId,
              isEnglishAuction(pool)
                ? AuctionType.EnglishAuction
                : AuctionType.FixedSwap,
            )}
            className={classes.content}
            key={item.id}
          >
            <div className={classes.preview}>
              {item.category === 'image' ? (
                <Img
                  src={item.previewUrl}
                  alt={item.name}
                  ratio="1x1"
                  objectFit="cover"
                />
              ) : (
                <VideoPlayer
                  src={item.previewUrl}
                  objectFit="cover"
                  autoPlay
                  muted
                  controls={false}
                />
              )}
            </div>
            <div className={classes.item}>
              <div className={classes.name}>{item.name}</div>
              {item.price && (
                <div className={classes.price}>
                  {item.price} {item.priceType}
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
      <div className={classes.title}>{t('header.search.brands')}</div>
      {data.map((item: ISearchBrand) => (
        <RouterLink
          to={BrandRoutesConfig.Brand.generatePath(item.id)}
          className={classes.content}
          key={item.id}
        >
          <div className={classes.preview}>
            <Img
              src={item.previewUrl}
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
  pools,
  handleClose,
}: {
  loading?: boolean;
  data: ISearchResult;
  pools: IFetchPoolDetailsData[];
  handleClose: () => void;
}) => {
  const classes = useSearchResultStyles();

  return (
    <div className={classes.root} onClick={handleClose}>
      {loading ? (
        <QueryLoadingCentered />
      ) : (
        <SearchItems data={data.items} pools={pools} />
      )}
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
