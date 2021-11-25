import { ThemeProvider } from '@material-ui/styles';
import classNames from 'classnames';
import { useAccount } from 'modules/account/hooks/useAccount';
import { GiftRoutesConfig } from 'modules/gift/Routes';
import { useIsLGUp } from 'modules/themes/useTheme';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { getTheme } from '../../../common/utils/getTheme';
import { Themes } from '../../../themes/types';
import { IconHeader } from '../IconHeader';
import { useGiftLayoutStyles } from './GiftLayoutStyles';

export interface ILayoutProps {
  children?: React.ReactNode;
  headerTheme?: Themes;
}

export const GiftLayout = ({
  children,
  headerTheme = Themes.dark,
}: ILayoutProps) => {
  const classes = useGiftLayoutStyles();
  const history = useHistory();
  const isLGUp = useIsLGUp();
  const { isConnected } = useAccount();
  const { airdropId } = GiftRoutesConfig.LandingPage.useParams();

  useEffect(() => {
    if (!window.ethereum && isLGUp) {
      window.location.href = 'https://metamask.io/download';
    }
  }, [isLGUp]);

  useEffect(() => {
    if (!isConnected) {
      history.push(`/airdrop/${airdropId}/landing`);
    }
  }, [airdropId, history, isConnected]);

  return (
    <div className={classNames(classes.root, classes.darkBg)}>
      <ThemeProvider theme={getTheme(headerTheme)}>
        <IconHeader />
      </ThemeProvider>

      <main className={classNames(classes.main)}>{children}</main>
    </div>
  );
};
