import React, { useEffect, useState } from 'react';
import {
  Box,
  // Button,
  Typography,
  InputLabel,
  Avatar,
  IconButton,
} from '@material-ui/core';
import { Button } from 'modules/uiKit/Button';
import { useConfirmProfileStyles } from './useConfirmProfileStyles';
import { useIsXSDown } from 'modules/themes/useTheme';
import { DefaultRandomAvatar } from 'modules/common/components/DefaultRandomAvatar';
import { GiftTextInput } from 'modules/gift/components/GiftTextInput';

import testImg from '../../assets/square.png';
import { useHistory, useLocation } from 'react-router-dom';
import {
  getAirdropByCode,
  IGetAirdropByCodePayload,
} from 'modules/gift/actions/getAirdropByCode';
import { uploadFile } from 'modules/common/actions/uploadFile';
import { useDispatchRequest } from '@redux-requests/react';
import { updateUserInfo } from 'modules/gift/actions/updateUserInfo';
import { GiftRoutesConfig } from 'modules/gift/Routes';
import { GiftHeader } from 'modules/gift/components/GiftHeader';

export const ConfirmProfile: React.FC = () => {
  const styles = useConfirmProfileStyles();
  const { airdropId } = GiftRoutesConfig.LandingPage.useParams();
  let location = useLocation<{
    verifyCode: string;
  }>();
  const dispatchRequest = useDispatchRequest();
  const history = useHistory();

  console.log('location: ', location);

  const isXSDown = useIsXSDown();

  const [inputValue, setInputValue] = useState<string>();
  const [avatarSrc, setAvatarSrc] = useState<string>();

  useEffect(() => {
    dispatchRequest(
      getAirdropByCode({ verifycode: location.state.verifyCode }),
    ).then(res => {
      console.log('res: ', res);

      setAvatarSrc(res.data?.avatar);
      setInputValue(res.data?.username);
    });
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFileInputChange = (e: any) => {
    // TODO: 修改头像和名称
    // console.log('e.target.files[0]: ', e.target.files[0]);
    dispatchRequest(uploadFile({ file: e.target.files[0] })).then(res => {
      // console.log('res: ', res);
      setAvatarSrc(res.data?.result.path);
    });
    // mint
  };

  const handleContinueBtnClick = () => {
    if (
      avatarSrc &&
      inputValue &&
      avatarSrc.length > 0 &&
      inputValue.length > 0
    )
      dispatchRequest(
        updateUserInfo({
          verifycode: location.state.verifyCode,
          useravatar: avatarSrc,
          username: inputValue,
        }),
      ).then(res => {
        console.log('updateUserInfo res: ', res);

        if (res.data.msg === 'success') {
          const claimLocation = {
            pathname: `/airdrop/${airdropId}/claim`,
            state: location.state,
          };

          history.push(claimLocation);
        }
      });
  };

  return (
    <Box className={styles.root}>
      <GiftHeader airdropId={+airdropId} title={'Confirm your profile'} />

      <Box className={styles.addPhotoField}>
        <input
          accept="image/*"
          className={styles.fileInput}
          id="icon-button-file"
          type="file"
          onChange={handleFileInputChange}
        />
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <DefaultRandomAvatar
              className={styles.avatar}
              verified
              verifiedIconClasses={styles.verifiedIcon}
              src={avatarSrc}
            />
          </IconButton>
        </label>

        <Typography variant="body2" className={styles.addStr}>
          Add profile photo
        </Typography>
      </Box>

      <Box className={styles.textField}>
        <InputLabel className={styles.inputLabel}>name</InputLabel>
        <GiftTextInput
          className={isXSDown ? styles.mobileInput : styles.desktopInput}
          value={inputValue || ''}
          onChange={handleInputChange}
        />
      </Box>

      <Button className={styles.continueBtn} onClick={handleContinueBtnClick}>
        Continue
      </Button>
    </Box>
  );
};
