import React from 'react';
import { useInstructionStyles } from '../Instruction/useInstructionStyles';

import logo from '../../assets/verticalLogo.svg';
import downloadIcon from '../../assets/downloadIcon.svg';
import createIcon from '../../assets/createIcon.svg';
import scanIcon from '../../assets/scanIcon.svg';
import classNames from 'classnames';
import { useIsMDDown } from 'modules/themes/useTheme';
import { Button } from '@material-ui/core';

export const Instruction: React.FC = () => {
  const styles = useInstructionStyles();
  const isMDDown = useIsMDDown();

  return (
    <div className={styles.root}>
      <img
        className={isMDDown ? styles.mobileLogo : styles.desktopLogo}
        src={logo}
        alt="logo"
      />

      <div
        className={classNames(
          styles.stepBlock,
          isMDDown ? styles.mobileStepBlock : styles.desktopStepBlock,
        )}
      >
        <span
          className={classNames(
            styles.title,
            isMDDown ? styles.mobileTitle : styles.desktopTitle,
          )}
        >
          No wallet installed
        </span>

        <div className={styles.stepList}>
          <div className={styles.stepItem}>
            <img className={styles.icon} src={downloadIcon} alt="download" />

            <div className={styles.stepText}>
              <span
                className={classNames(
                  styles.stepTitle,
                  isMDDown ? styles.mobileStepTitle : styles.desktopStepTitle,
                )}
              >
                Step1:
              </span>
              <span className={styles.stepDescription}>
                Click "Download" to install metamask wallet
              </span>
            </div>
          </div>

          <div className={styles.stepItem}>
            <img className={styles.icon} src={createIcon} alt="create" />

            <div className={styles.stepText}>
              <span
                className={classNames(
                  styles.stepTitle,
                  isMDDown ? styles.mobileStepTitle : styles.desktopStepTitle,
                )}
              >
                Step2:
              </span>
              <span className={styles.stepDescription}>
                Create your account in the wallet
              </span>
            </div>
          </div>

          <div className={styles.stepItem}>
            <img className={styles.icon} src={scanIcon} alt="scan" />

            <div className={styles.stepText}>
              <span
                className={classNames(
                  styles.stepTitle,
                  isMDDown ? styles.mobileStepTitle : styles.desktopStepTitle,
                )}
              >
                Step3:
              </span>
              <span className={styles.stepDescription}>
                Use the scan function in the wallet to scan the QR code to
                receive NFT
              </span>
            </div>
          </div>
        </div>
      </div>

      <Button
        className={classNames(
          styles.downloadBtn,
          // isSMDown ? classes.mobileContinueBtn : classes.desktopContinueBtn,
        )}
        onClick={() => {
          setTimeout(() => {
            window.location.href = 'https://metamask.io/download';
          }, 1000);
        }}
      >
        Continue
      </Button>

      <span className={styles.notice}>
        Have a wallet account? Then go directly to the wallet to scan!
      </span>
    </div>
  );
};
