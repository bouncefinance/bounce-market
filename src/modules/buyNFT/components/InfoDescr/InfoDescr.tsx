import { Box, Button, Grid, Tooltip, Typography } from '@material-ui/core';
import { LayersIcon } from 'modules/common/components/Icons/LayersIcon';
import { featuresConfig } from 'modules/common/conts';
import { t } from 'modules/i18n/utils/intl';
import Truncate from 'react-truncate';
import { useInfoDescrStyles } from './useInfoDescrStyles';
import { useInfoDescrToggle } from './useInfoDescrToggle';

const DESCR_LINES = 3;

interface IInfoDescrProps {
  title: string;
  description?: string;
  creator?: JSX.Element;
  owner?: JSX.Element;
  copiesCurrent?: string | number;
  copiesTotal?: string | number;
  LikeBtn: JSX.Element;
}

export const InfoDescr = ({
  title,
  description,
  creator,
  owner,
  copiesCurrent = 0,
  copiesTotal = 0,
  LikeBtn,
}: IInfoDescrProps) => {
  const classes = useInfoDescrStyles();
  const {
    toggleExpanded,
    onTruncate,
    expanded,
    truncated,
  } = useInfoDescrToggle();

  return (
    <>
      <Box mb={3}>
        <Typography variant="h2" className={classes.title}>
          {title}
        </Typography>
      </Box>

      <Grid container spacing={2} alignItems="center">
        <div className={classes.spaceBetween}>
          {creator && featuresConfig.nftDetailsCreator && (
            <Grid item xs>
              {creator}
            </Grid>
          )}

          {owner && (
            <Grid item xs>
              {owner}
            </Grid>
          )}

          {featuresConfig.nftLikes && LikeBtn}
        </div>

        <div className={classes.poolAmount}>
          <Tooltip title={t('details-nft.pool-amount-tip')}>
            <Grid item xs="auto">
              <div className={classes.copies}>
                <LayersIcon className={classes.copiesIcon} />
                {copiesCurrent ? `${copiesCurrent} / ` : ''}
                {copiesTotal}
              </div>
            </Grid>
          </Tooltip>
        </div>
      </Grid>

      {description && (
        <>
          <Box component="hr" className={classes.hr} my={3.5} />

          <Box className={classes.description}>
            <Truncate
              lines={!expanded && DESCR_LINES}
              onTruncate={onTruncate}
              ellipsis={
                <>
                  ...
                  <br />
                  <Button
                    className={classes.textToggle}
                    variant="text"
                    onClick={toggleExpanded(true)}
                  >
                    {t('details-nft.descr-full')} ⬇
                  </Button>
                </>
              }
            >
              {description}
            </Truncate>

            {!truncated && expanded && (
              <Box>
                <Button
                  className={classes.textToggle}
                  variant="text"
                  onClick={toggleExpanded(false)}
                >
                  {t('details-nft.descr-short')} ⬆
                </Button>
              </Box>
            )}
          </Box>
        </>
      )}
    </>
  );
};
