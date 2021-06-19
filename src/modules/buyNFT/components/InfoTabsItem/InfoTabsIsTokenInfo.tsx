// import styled from 'styled-components';
import { t } from 'modules/i18n/utils/intl';
import { BscScanIcon } from './assets/BscScanIcon';
import { useInfoTabsIsTokenInfoStyled } from './useInfoTabsItemStyles';

interface InfoTabsIsTokenInfoprops {
  title?: string;
  desc?: string | JSX.Element;
  isScan?: boolean;
  contract?: string;
  className?: string;
}

export const InfoTabsIsTokenInfo = ({
  title,
  desc,
  isScan,
  contract,
}: InfoTabsIsTokenInfoprops) => {
  const classes = useInfoTabsIsTokenInfoStyled();

  return (
    <div>
      {title && <h5 className={classes.title}>{title}</h5>}
      {desc && <div className={classes.desc}>{desc}</div>}

      {isScan && (
        <div className={classes.button}>
          <BscScanIcon
            target="_blank"
            href={`https://bscscan.com/address/${contract}`}
          />
          <span className={classes.btnSpan}>
            {t('details-nft.info.view-scan')}
          </span>
        </div>
      )}
    </div>
  );
};
