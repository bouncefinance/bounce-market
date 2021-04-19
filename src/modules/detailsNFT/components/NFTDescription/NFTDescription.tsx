import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { LayersIcon } from 'modules/common/components/Icons/LayersIcon';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import { getTimeRemaining } from 'modules/common/utils/getTimeRemaining';
import { useCallback, useState } from 'react';
import Truncate from 'react-truncate';
import { Timer } from '../Timer';
import { useNFTDescriptionStyles } from './useNFTDescriptionStyles';

const DESCR_LINES = 3;

interface INFTDescriptionProps {
  className?: string;
  name: string;
  description: string;
}

export const NFTDescription = ({
  className,
  name,
  description,
}: INFTDescriptionProps) => {
  const classes = useNFTDescriptionStyles();
  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);

  const timeRemaining = getTimeRemaining(new Date(2021, 3, 30));

  const toggleExpanded = useCallback(
    (isExpanded: boolean) => () => setExpanded(isExpanded),
    [],
  );

  const onTruncate = useCallback(
    (isTruncated: boolean) => {
      if (truncated !== isTruncated) {
        setTruncated(isTruncated);
      }
    },
    [truncated],
  );

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.sections}>
        <Container className={classes.section}>
          <Box mb={3}>
            <Typography variant="h2" className={classes.title}>
              {name}
            </Typography>
          </Box>

          <Grid container spacing={3} alignItems="center">
            <Grid item xs>
              <ProfileInfo
                subTitle="Creator"
                title="VanHuiFirst"
                users={[
                  {
                    name: 'VanHuiFirst',
                    avatar: 'https://picsum.photos/32?random=1',
                    verified: true,
                  },
                ]}
              />
            </Grid>

            <Grid item xs>
              <ProfileInfo
                subTitle="Owner"
                title="Bombist"
                users={[
                  {
                    name: 'Bombist',
                    avatar: 'https://picsum.photos/32?random=2',
                  },
                ]}
              />
            </Grid>

            <Grid item xs="auto">
              <div className={classes.copies}>
                <LayersIcon className={classes.copiesIcon} />
                2/10
              </div>
            </Grid>
          </Grid>

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
                    Full description ⬇
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
                  Collapse ⬆
                </Button>
              </Box>
            )}
          </Box>
        </Container>

        <Container className={classes.section}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm>
              <div className={classes.bid}>
                Top Bid
                <i className={classes.bidDevider} />
                <Timer endDate={new Date(2021, 3, 30)} />
              </div>

              <Typography
                variant="h2"
                component="h4"
                className={classes.cryptoPrice}
              >
                1000.50 BNB
              </Typography>

              <Typography className={classes.price} color="textSecondary">
                $1,909.98
              </Typography>
            </Grid>

            <Grid item xs={12} sm={5}>
              <Box mb={2}>
                <Button fullWidth>Place a bid</Button>
              </Box>

              <Button variant="outlined" fullWidth>
                Buy now
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};
