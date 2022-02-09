import { fade, makeStyles, Theme } from '@material-ui/core/styles';

export const useErc20PoolCardStyles = makeStyles<Theme>(theme => ({
    progressOutBox: {
        fontSize: 13,
        color: fade(theme.palette.text.primary, 0.4)
    },
    progressBalanceText: {
        color: theme.palette.text.primary,
    },
    progressBox:{
        position: 'relative',
        background: 'rgba(45,171,80, 0.1)',
        height: 2,
    },
    progress: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: 2,
        background: '#2DAB50'
    }
}))