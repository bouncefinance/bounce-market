import { Box } from '@material-ui/core';
import { IDropDetails } from 'modules/api/getOneDropsDetail/mappers';
import { ShareIcon } from 'modules/common/components/Icons/ShareIcon';
import { Social } from 'modules/common/components/Social';
import { SocialShare } from 'modules/common/components/SocialShare';
import { DropsOwner } from 'modules/drops/components/DropsOwner';
import { NothingFound } from 'modules/drops/components/NothingFound';
import { t } from 'modules/i18n/utils/intl';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import { Button } from 'modules/uiKit/Button';
import { Timer } from '../Timer';
import { DescriptionComponent } from './DescriptionComponent';
import { DescriptionSkeleton } from './DescriptionSkeleton';
import { useDescriptionStyles } from './useDescriptionStyles';

interface IDescriptionProps {
  loading: boolean;
  pristine: boolean;
  data: IDropDetails | null;
}

export const Description = ({ data, loading, pristine }: IDescriptionProps) => {
  const classes = useDescriptionStyles();

  return (
    <Box mb={{ xs: 8, md: 12 }}>
      {loading && <DescriptionSkeleton />}

      {!loading && !pristine && !data && <NothingFound />}

      {!loading && data && (
        <DescriptionComponent
          timer={<Timer endDate={data.dropDate} dropType={data.dropType} />}
          title={data.title}
          text={data.description}
          creator={
            <DropsOwner
              title={data.creator}
              avatar={data.avatar}
              href={ProfileRoutesConfig.OtherProfile.generatePath(
                data.accountAddress,
              )}
            />
          }
          share={
            <SocialShare
              // TODO: make the relevant description for sharing
              titleString={`Fangible Drop: ${data.title}`}
              buttonContent={
                <Button
                  className={classes.shareBtn}
                  variant="outlined"
                  rounded
                  startIcon={<ShareIcon />}
                >
                  {t('social.share')}
                </Button>
              }
            />
          }
          social={
            (data.twitter || data.instagram || data.website) && (
              <Social
                twitter={data.twitter}
                instagram={data.instagram}
                website={data.website}
              />
            )
          }
        />
      )}
    </Box>
  );
};
