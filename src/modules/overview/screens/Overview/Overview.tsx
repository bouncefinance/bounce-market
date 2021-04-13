import { Container, Typography } from '@material-ui/core';
import { Section } from 'modules/uiKit/Section';
import { t } from '../../../i18n/utils/intl';

export const Overview = () => {
  return (
    <Section>
      <Container>
        <Typography>{t('foobar')}</Typography>
      </Container>
    </Section>
  );
};
