import { useCollectionFieldStyles } from './CollectionFieldStyleds';
import { t } from 'modules/i18n/utils/intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { memo } from 'react';
import { ReactComponent as AddIcon } from './assets/add.svg';
import { ReactComponent as ImgIcon } from './assets/img.svg';
import { ReactComponent as SelectedIcon } from './assets/selected.svg';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { NftType } from 'modules/api/common/NftType';
import { Img } from 'modules/uiKit/Img';

export interface ICollectionItem {
  id: number;
  collectionName: string;
  imgSrc: string;
  contractAddress: string;
  nftType: NftType;
  symbol: string;
  ownername: string;
  owneraddress: string;
}

export const CollectionField = memo(
  ({
    title,
    subTitle,
    handleChangeCollection,
    items,
    currentAddr,
  }: {
    title: string;
    subTitle?: string;
    handleChangeCollection: (collection: ICollectionItem) => void;
    items: ICollectionItem[];
    currentAddr?: string;
  }) => {
    const classes = useCollectionFieldStyles();
    const history = useHistory();
    const sliderProps: Swiper = {
      watchSlidesVisibility: true,
      slidesPerView: 'auto',
      spaceBetween: 25,
      lazy: true,
    };

    const modifyItem = (item: ICollectionItem) => {
      return (
        <SwiperSlide
          className={classNames(
            classes.collectionCard,
            currentAddr === item.contractAddress && classes.sel,
          )}
          key={item.contractAddress}
          onClick={() => {
            handleChangeCollection(item);
          }}
        >
          {item.imgSrc ? (
            <Img src={item.imgSrc} className={classes.img} />
          ) : (
            <ImgIcon />
          )}

          {currentAddr === item.contractAddress && (
            <SelectedIcon className={classes.selIcon} />
          )}

          <h3> {item.collectionName}</h3>
        </SwiperSlide>
      );
    };

    return (
      <>
        <h3>{title}</h3>
        <p>{subTitle}</p>
        <Swiper {...sliderProps} className={classes.collectionBox}>
          <SwiperSlide
            className={classes.collectionCard}
            onClick={() => {
              history.push('/brand/create');
            }}
          >
            <AddIcon />
            <h3>{t('create-collection-nft.submit')}</h3>
          </SwiperSlide>

          {items.map(modifyItem)}
        </Swiper>
      </>
    );
  },
);
