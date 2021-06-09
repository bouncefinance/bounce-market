import styled from 'styled-components';
// import { t } from 'modules/i18n/utils/intl';
import { BscScanIcon } from './assets/BscScanIcon';

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
  return (
    <InfoTabsIsTokenInfoStyled>
      {title && <h5 className="title">{title}</h5>}
      {desc && <div className="desc">{desc}</div>}

      {isScan && (
        <div
          className="button"
          onClick={() => {
            const href = `https://bscscan.com/address/${contract}`;
            window.open(href);
          }}
        >
          <BscScanIcon />
          <span>View on BscScan</span>
        </div>
      )}
    </InfoTabsIsTokenInfoStyled>
  );
};

const InfoTabsIsTokenInfoStyled = styled.div`
  .title {
    font-size: 16px;
    font-weight: 500;
  }

  .desc {
    p {
      font-size: 14px;
      font-weight: 400;

      span {
        font-weight: 500;
      }
    }
  }

  div.button {
    width: 416px;
    height: 48px;
    border: 1px solid #000;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    cursor: pointer;
    user-select: none;
    margin-top: 10px;

    span {
      margin-left: 10.5px;
      font-family: 'Helvetica Neue';
      font-size: 14px;
      font-weight: 500;
    }
  }
`;
