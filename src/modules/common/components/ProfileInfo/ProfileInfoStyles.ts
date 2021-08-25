import { makeStyles, Theme } from '@material-ui/core/styles';

export const useProfileInfoStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center',
    gap: theme.spacing(0, 1.5),
    gridTemplateAreas: `
      'avatars subTitle'
      'avatars title'
    `,
  },

  avatars: {
    gridArea: 'avatars',
    display: 'flex',
  },
  avatarTips: {
    backgroundColor: '#000',
  },
  avatarTipsText: {
    color: '#000',
  },

  avatarWrap: {
    position: 'relative',
    transition: 'transform 0.2s, opacity 0.2s',
    '$avatars:hover &': {
      opacity: 0.5,

      '&:hover': {
        opacity: 1,
      },
    },

    '&:hover': {
      zIndex: 3,
    },

    '& + &': {
      marginLeft: -6,
    },
  },

  cardAvatarWrap: {
    position: 'relative',
    transition: 'transform 0.2s, opacity 0.2s',
    '$avatars:hover &': {
      opacity: 0.5,
      transform: 'translate(0px, 0px)',
      '&:hover': {
        opacity: 1,
        transform: 'translate(0px, -5px)',
      },
    },

    '&:hover': {
      zIndex: 3,
    },

    '& + &': {
      marginLeft: -6,
    },
  },

  avatarSmall: {
    width: 32,
    height: 32,
  },

  avatarMedium: {
    width: 40,
    height: 40,
  },

  avatarBig: {
    width: 44,
    height: 44,
  },

  avatarCheck: {
    position: 'absolute',
    bottom: 0,
    right: -2,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 16,
    height: 16,
    borderRadius: '50%',
    background: 'linear-gradient(270deg, #2663FF -33.33%, #FF3828 91.67%)',

    '&:before': {
      content: `''`,
      display: 'block',
      width: 8,
      height: 4,
      marginTop: -2,
      border: 'solid #fff',
      borderWidth: '0 0 2px 2px',
      transform: 'rotate(-45deg)',
    },
  },

  subTitle: {
    gridArea: 'subTitle',
  },

  title: {
    gridArea: 'title',

    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  nftTitle: {
    marginTop: theme.spacing(2),
    fontSize: 16,
    height: 21,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
}));
