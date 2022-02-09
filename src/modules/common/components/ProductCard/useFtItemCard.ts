import { fade, makeStyles, Theme } from '@material-ui/core/styles';

export const useErc20CardStyles = makeStyles<Theme>(theme => ({
    root: {
        padding: '20px',
    },
    ft: {
        width: 84,
        height: 84
    },
    amount: {
        color: fade(theme.palette.text.primary, 0.5)
    },
    balanceFT: {
        fontSize: 24
    },
    linkIcon: {
        fontSize: 14
    }

}))