import loadable, { LoadableComponent } from '@loadable/component';
import { WhiteQueryLoadingAbsolute } from 'modules/common/components/QueryLoading/QueryLoading';
import { RouteConfiguration } from 'modules/common/types/RouteConfiguration';
import { generatePath, Route } from 'react-router-dom';
import { useParams } from 'react-router';

const PATH_LANDING_PAGE = '/airdrop/:airdropId/landing';
const PATH_ENTER_PWD = '/airdrop/:airdropId/enterpwd';
const PATH_CONFIRM_PROFILE = '/airdrop/:airdropId/confirm';
const PATH_CLAIM_NFT = '/airdrop/:airdropId/claim';
const PATH_INSTRUCTION = '/airdrop/instruction';

export const GiftRoutesConfig: { [key: string]: RouteConfiguration } = {
  LandingPage: {
    path: PATH_LANDING_PAGE,
    generatePath: (airdropId: string) =>
      generatePath(PATH_LANDING_PAGE, { airdropId }),
    useParams: () => {
      const { airdropId } = useParams<{ airdropId: string }>();

      return {
        airdropId,
      };
    },
  },

  EnterPwd: {
    path: PATH_ENTER_PWD,
    generatePath: (airdropId: string) =>
      generatePath(PATH_ENTER_PWD, { airdropId }),
    useParams: () => {
      const { airdropId } = useParams<{ airdropId: string }>();

      return {
        airdropId,
      };
    },
  },

  ConfirmProfile: {
    path: PATH_CONFIRM_PROFILE,
    generatePath: (airdropId: string) =>
      generatePath(PATH_CONFIRM_PROFILE, { airdropId }),
    useParams: () => {
      const { airdropId } = useParams<{ airdropId: string }>();

      return {
        airdropId,
      };
    },
  },

  ClaimNft: {
    path: PATH_CLAIM_NFT,
    generatePath: (airdropId: string) =>
      generatePath(PATH_CLAIM_NFT, { airdropId }),
    useParams: () => {
      const { airdropId } = useParams<{ airdropId: string }>();

      return {
        airdropId,
      };
    },
  },

  Instruction: {
    path: PATH_INSTRUCTION,
    generatePath: () => generatePath(PATH_INSTRUCTION),
  },
};

const LoadableLandingPageContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/LandingPage').then(module => module.LandingPage),
  {
    fallback: <WhiteQueryLoadingAbsolute />,
  },
);

const LoadableEnterPwdContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/EnterPwd').then(module => module.EnterPwd),
  {
    fallback: <WhiteQueryLoadingAbsolute />,
  },
);

const LoadableConfirmProfileContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/ConfirmProfile').then(module => module.ConfirmProfile),
  {
    fallback: <WhiteQueryLoadingAbsolute />,
  },
);

const LoadableClaimNftContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/ClaimNft').then(module => module.ClaimNft),
  {
    fallback: <WhiteQueryLoadingAbsolute />,
  },
);

const LoadableInstructionContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/Instruction').then(module => module.Instruction),
  {
    fallback: <WhiteQueryLoadingAbsolute />,
  },
);

export function GiftRoutes() {
  return (
    <>
      <Route
        path={GiftRoutesConfig.LandingPage.path}
        exact={true}
        component={LoadableLandingPageContainer}
      />
      <Route
        path={GiftRoutesConfig.EnterPwd.path}
        exact={true}
        component={LoadableEnterPwdContainer}
      />
      <Route
        path={GiftRoutesConfig.ConfirmProfile.path}
        exact={true}
        component={LoadableConfirmProfileContainer}
      />
      <Route
        path={GiftRoutesConfig.ClaimNft.path}
        exact={true}
        component={LoadableClaimNftContainer}
      />
      <Route
        path={GiftRoutesConfig.Instruction.path}
        exact={true}
        component={LoadableInstructionContainer}
      />
    </>
  );
}
