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
import { useIsSMDown } from 'modules/themes/useTheme';
import { DefaultRandomAvatar } from 'modules/common/components/DefaultRandomAvatar';
import { GiftTextInput } from 'modules/gift/components/GiftTextInput';

import { useHistory, useLocation } from 'react-router-dom';
import { getAirdropByCode } from 'modules/gift/actions/getAirdropByCode';
import { uploadFile } from 'modules/common/actions/uploadFile';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { updateUserInfo } from 'modules/gift/actions/updateUserInfo';
import { GiftRoutesConfig } from 'modules/gift/Routes';
import { GiftHeader } from 'modules/gift/components/GiftHeader';
import { useAccount } from 'modules/account/hooks/useAccount';
import classNames from 'classnames';
import { IProfileInfo } from 'modules/profile/api/profileInfo';
import { fetchProfileInfo } from 'modules/profile/actions/fetchProfileInfo';

export const ConfirmProfile: React.FC = () => {
  const styles = useConfirmProfileStyles();
  const { airdropId } = GiftRoutesConfig.LandingPage.useParams();
  let location = useLocation<{
    verifyCode: string;
  }>();
  const dispatchRequest = useDispatchRequest();
  const history = useHistory();
  const isSMDown = useIsSMDown();
  const { isConnected, address } = useAccount();
  const { data: profileInfo } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
  });

  useEffect(() => {
    if (!isConnected || !location.state.verifyCode) {
      history.push(`/airdrop/${airdropId}/landing`);
    }
  }, [airdropId, history, isConnected, location.state.verifyCode]);

  const [inputValue, setInputValue] = useState<string>();
  const [avatarSrc, setAvatarSrc] = useState<any>();
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // if (profileInfo) {
    //   setAvatarSrc(profileInfo.imgUrl);
    //   setAvatarUrl(profileInfo.imgUrl);
    //   setInputValue(profileInfo.username);

    //   return;
    // }

    dispatchRequest(
      getAirdropByCode({ verifycode: location.state.verifyCode }),
    ).then(res => {
      setAvatarSrc(res.data?.avatar);
      setAvatarUrl(res.data?.avatar);
      setInputValue(res.data?.username);
    });
  }, [dispatchRequest, location.state.verifyCode, profileInfo]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFileInputChange = async (e: any) => {
    setLoading(true);

    try {
      await dispatchRequest(uploadFile({ file: e.target.files[0] })).then(
        res => {
          setAvatarUrl(res?.data?.result.path);

          setTimeout(() => {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(e.target.files[0]);
            fileReader.onload = () => {
              setAvatarSrc(fileReader.result);
            };

            setLoading(false);
          }, 500);
        },
      );
    } catch (error) {
      // console.log('file upload err: ', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const handleContinueBtnClick = async () => {
    setLoading(true);

    try {
      if (!address) {
        history.push(`/airdrop/${airdropId}/landing`);
      } else {
        dispatchRequest(
          updateUserInfo({
            accountaddress: address,
            verifycode: location.state.verifyCode,
            useravatar: avatarUrl || '',
            username: inputValue || '',
          }),
        ).then(res => {
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
      // console.log('enter pwd err: ', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
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
          onChange={e => {
            handleFileInputChange(e);
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
              useCdn={false}
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

      <Box
        className={isSMDown ? styles.mobileTextField : styles.mobileTextField}
      >
        <InputLabel className={styles.inputLabel}>name</InputLabel>
        <GiftTextInput
          className={isSMDown ? styles.mobileInput : styles.desktopInput}
          value={inputValue || ''}
          onChange={handleInputChange}
        />
      </Box>

      <Button
        className={classNames(
          styles.continueBtn,
          isSMDown ? styles.mobileContinueBtn : styles.desktopContinueBtn,
        )}
        loading={loading}
        onClick={handleContinueBtnClick}
      >
        Continue
      </Button>
    </Box>
  );
};
