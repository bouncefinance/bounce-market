import React, { useEffect, useState } from 'react';
import {
  Box,
  // Button,
  Typography,
  InputLabel,
  IconButton,
} from '@material-ui/core';
import { Button } from 'modules/uiKit/Button';
import { useConfirmProfileStyles } from './useConfirmProfileStyles';
import { useIsXSDown } from 'modules/themes/useTheme';
import { DefaultRandomAvatar } from 'modules/common/components/DefaultRandomAvatar';
import { GiftTextInput } from 'modules/gift/components/GiftTextInput';

import { useHistory, useLocation } from 'react-router-dom';
import { getAirdropByCode } from 'modules/gift/actions/getAirdropByCode';
import { uploadFile } from 'modules/common/actions/uploadFile';
import { useDispatchRequest } from '@redux-requests/react';
import { updateUserInfo } from 'modules/gift/actions/updateUserInfo';
import { GiftRoutesConfig } from 'modules/gift/Routes';
import { GiftHeader } from 'modules/gift/components/GiftHeader';
import { useAccount } from 'modules/account/hooks/useAccount';

export const ConfirmProfile: React.FC = () => {
  const styles = useConfirmProfileStyles();
  const { airdropId } = GiftRoutesConfig.LandingPage.useParams();
  let location = useLocation<{
    verifyCode: string;
  }>();
  const dispatchRequest = useDispatchRequest();
  const history = useHistory();
  const isXSDown = useIsXSDown();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      history.push(`/airdrop/${airdropId}/landing`);
    }
  }, [airdropId, history, isConnected]);

  const [inputValue, setInputValue] = useState<string>();
  const [avatarSrc, setAvatarSrc] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log('loading: ', loading);
  }, [loading]);

  useEffect(() => {
    dispatchRequest(
      getAirdropByCode({ verifycode: location.state.verifyCode }),
    ).then(res => {
      setAvatarSrc(res.data?.avatar);
      setInputValue(res.data?.username);
    });
  }, [dispatchRequest, location.state.verifyCode]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFileInputChange = async (e: any) => {
    try {
      const res = await dispatchRequest(
        uploadFile({ file: e.target.files[0] }),
      );

      return res;

      // dispatchRequest(uploadFile({ file: e.target.files[0] })).then(res => {
      //   setAvatarSrc(res?.data?.result.path);
      // });
    } catch (error) {
      console.log('file upload err: ', error);
    }
  };

  const handleContinueBtnClick = () => {
    try {
      if (avatarSrc && inputValue) {
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
      }
    } catch (error) {
      console.log('enter pwd err: ', error);
    }
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
          onChange={async e => {
            setLoading(true);
            const res = await handleFileInputChange(e);

            setAvatarSrc(res?.data?.result.path);
            setLoading(false);
          }}
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

      <Button
        className={styles.continueBtn}
        loading={loading}
        onClick={handleContinueBtnClick}
      >
        Continue
      </Button>
    </Box>
  );
};
