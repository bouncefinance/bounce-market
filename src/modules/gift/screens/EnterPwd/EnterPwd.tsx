import React, { useState } from 'react';
import { Box, Button } from '@material-ui/core';
import { useEnterPwdStyles } from './useEnterPwdStyles';
import { Img } from 'modules/uiKit/Img';

import SVG_mail from '../../assets/mail.svg';

import testImg from '../../assets/square.png';
import { GiftTextInput } from 'modules/gift/components/GiftTextInput';
import { GiftHeader } from 'modules/gift/components/GiftHeader';
import { Link, useHistory } from 'react-router-dom';
import { GiftRoutesConfig } from 'modules/gift/Routes';
import { useDispatchRequest } from '@redux-requests/react';
import {
  getAirdropByCode,
  IGetAirdropByCodePayload,
} from 'modules/gift/actions/getAirdropByCode';
import { data } from 'modules/api/getTopArtistList/dummy';

const brandAvatar = testImg;
const brandName = 'Boxing Bullies';
const title = 'Please enter your unique password';
const description =
  'You’ll find this password on the interior of the attached envelope that came in your package.';

export const EnterPwd: React.FC = () => {
  const { airdropId } = GiftRoutesConfig.LandingPage.useParams();
  const dispatchRequest = useDispatchRequest();
  const history = useHistory();

  const styles = useEnterPwdStyles();

  const [inputValue, setInputValue] = useState<string>('');
  const [isInputLegal, setIsInputLegal] = useState<boolean>(true);
  // const [
  //   airdropData,
  //   setAirdropData,
  // ] = useState<IGetAirdropByCodePayload | null>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    dispatchRequest(getAirdropByCode({ verifycode: inputValue })).then(res => {
      console.log('res: ', res);
      if (res.data) {
        const location = {
          pathname: `/airdrop/${airdropId}/confirm`,
          state: { verifyCode: inputValue },
        };

        history.push(location);
      } else {
        setIsInputLegal(false);
      }
    });
  };

  return (
    <Box className={styles.root}>
      <GiftHeader
        airdropId={+airdropId}
        title={title}
        description={description}
      />

      <Img src={SVG_mail} className={styles.mailImg} />

      <GiftTextInput
        value={inputValue}
        isValueLegal={isInputLegal}
        onChange={handleInputChange}
        helpText="You entered an incorrect password, please try again"
      />

      <Button className={styles.enterBtn} onClick={handleClick}>
        Enter Password
      </Button>
    </Box>
  );
};
