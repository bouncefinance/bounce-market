// import styled from 'styled-components';
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
        <div
          className={classes.button}
          onClick={() => {
            const href = `https://bscscan.com/address/${contract}`;
            window.open(href);
          }}
        >
          <BscScanIcon />
          <span className={classes.btnSpan}>View on BscScan</span>
        </div>
      )}
    </div>
  );
};
