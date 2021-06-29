import {
  Box,
  Container,
  Grid,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import { ShareIcon } from 'modules/common/components/Icons/ShareIcon';
import { SocialShare } from 'modules/common/components/SocialShare';
import { t } from 'modules/i18n/utils/intl';
import { GoBack } from 'modules/layout/components/GoBack';
import { StoriesContainer } from 'modules/stories/components/StoriesContainer';
import { StoriesOwner } from 'modules/stories/components/StoriesOwner';
import { darkTheme } from 'modules/themes/darkTheme';
import { Button } from 'modules/uiKit/Button';
import { Section } from 'modules/uiKit/Section';
import React from 'react';

export const DropDetails = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Section>
        <Container>
          <Box mb={{ xs: 8, md: 12 }}>
            <GoBack />
          </Box>
        </Container>

        <StoriesContainer>
          <Grid container spacing={5}>
            <Grid item md xl={6}>
              <Box mb={3.5}>
                <Typography variant="h1">Drop Details heading</Typography>
              </Box>

              <Grid container spacing={5}>
                <Grid item>
                  <StoriesOwner title="grossehalbuer" />
                </Grid>

                <Grid item>
                  <SocialShare
                    titleString="some title"
                    url="//google.com"
                    buttonContent={
                      <Button
                        variant="outlined"
                        rounded
                        startIcon={<ShareIcon />}
                      >
                        {t('social.share')}
                      </Button>
                    }
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item md xl={5}>
              <Typography>
                Primal Cypher is a conceptual digital artist, amongst many other
                things (designer, oil painter, NFT writer and consultant). He’s
                well-known for his bold artwork which usually often contain
                strong social commentaries, as well themes relating to
                psychology, philosophy and spirituality. Primal Cypher’s artwork
                has a strong affinity for blockchain, particularly Ethereum,
                Anonymous, The Occupy and Cypherpunk movement, which is often
                reflected in his work.
              </Typography>
            </Grid>
          </Grid>
        </StoriesContainer>
      </Section>
    </ThemeProvider>
  );
};
