import { Box, Container, ThemeProvider } from '@material-ui/core';
import { resetRequests } from '@redux-requests/core';
import { featuresConfig } from 'modules/common/conts';
import { getDropDetails } from 'modules/drops/actions/getDropDetails';
import { DropsContainer } from 'modules/drops/components/DropsContainer';
import { DropsRoutesConfig } from 'modules/drops/Routes';
import { GoBack } from 'modules/layout/components/GoBack';
import { darkTheme } from 'modules/themes/darkTheme';
import { Section } from 'modules/uiKit/Section';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Description } from './components/Description';
import { LiveCards } from './components/LiveCards';
import { SoldCards } from './components/SoldCards';
import { Video } from './components/Video';

export const DropDetails = () => {
  const dispatch = useDispatch();
  const { dropId } = DropsRoutesConfig.DropDetails.useParams();

  useEffect(() => {
    dispatch(getDropDetails({ id: +dropId }));

    return function reset() {
      dispatch(resetRequests([getDropDetails.toString()]));
    };
  }, [dispatch, dropId]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Section>
        <Container maxWidth={false}>
          <Box mb={{ xs: 8, md: 12 }}>
            <GoBack />
          </Box>
        </Container>

        <DropsContainer>
          <Description />
          {featuresConfig.dropDetailsVideo && <Video />}
          <LiveCards />
          <SoldCards />
        </DropsContainer>
      </Section>
    </ThemeProvider>
  );
};
