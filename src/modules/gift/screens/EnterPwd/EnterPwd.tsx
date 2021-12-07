import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { useEnterPwdStyles } from './useEnterPwdStyles';

import { GiftTextInput } from 'modules/gift/components/GiftTextInput';
import { GiftHeader } from 'modules/gift/components/GiftHeader';
import { useHistory } from 'react-router-dom';
import { GiftRoutesConfig } from 'modules/gift/Routes';
import { useDispatchRequest } from '@redux-requests/react';
import { getAirdropByCode } from 'modules/gift/actions/getAirdropByCode';

import SVG_mail from '../../assets/mail.svg';
import { Button } from 'modules/uiKit/Button';
import classNames from 'classnames';
import { useIsSMDown } from 'modules/themes/useTheme';

export const EnterPwd: React.FC = () => {
  const { airdropId } = GiftRoutesConfig.LandingPage.useParams();
  const dispatchRequest = useDispatchRequest();
  const history = useHistory();
  const isSMDown = useIsSMDown();

  const styles = useEnterPwdStyles();

  const [inputValue, setInputValue] = useState<string>('');
  const [isInputLegal, setIsInputLegal] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClick = async () => {
    setIsInputLegal(true);
    setLoading(true);

    try {
      await dispatchRequest(getAirdropByCode({ verifycode: inputValue })).then(
        res => {
          if (res.data) {
            const location = {
              pathname: `/airdrop/${airdropId}/confirm`,
              state: { verifyCode: inputValue },
            };

            history.push(location);
          } else {
            setTimeout(() => {
              setLoading(false);
              setIsInputLegal(false);
            }, 500);
          }
        },
      );
    } catch (error) {
      // console.log('error: ', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  return (
    <Box className={styles.root}>
      <GiftHeader
        airdropId={+airdropId}
        title={'Please enter your unique password'}
        description={
          'Please claim your NFT by Saturday, December 18 @ 9pm ET/6pm PT - password will expire then and all unclaimed NFTs will be available for event guests to claim.'
        }
      />

      <img
        src={SVG_mail}
        alt="icon"
        className={isSMDown ? styles.mobileMailImg : styles.desktopMailImg}
      />

      <GiftTextInput
        value={inputValue}
        isValueLegal={isInputLegal}
        onChange={handleInputChange}
        helpText="You entered an incorrect password, please try again"
      />

      <Button
        className={classNames(
          styles.enterBtn,
          isSMDown ? styles.mobileEnterBtn : styles.desktopEnterBtn,
        )}
        loading={loading}
        onClick={handleClick}
      >
        Enter Password
      </Button>
    </Box>
  );
};
