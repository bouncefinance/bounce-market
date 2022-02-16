import { makeStyles, Theme } from '@material-ui/core';

export const useBlindBoxStyles = makeStyles<Theme, { bgColor?: string }>(theme => ({
    root: {
        fontSize: 0,
        color: '#fff',
    },
    headTopImg: {
        width: '100%',
        '& img': {
            height: 'auto'
        }
    },
    inner: {
        maxWidth: 1200,
        margin: 'auto',
        padding: '0px 20px',
    },
    itemBox: {
        backgroundColor: '#232323',
        borderRadius: 18,
        overflow: 'hidden',
        padding:  '70px',
        [theme.breakpoints.down('sm')]: {
            padding:  '30px',
            borderRadius: 10,
        }
    },
    boxLeft: {
        width: 338,
        height: 338,
        borderRadius: 14,
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            // padding:  '30px',
            borderRadius: 10,
            width: 120,
            height: 120,
        }
    },
    rightBox: {
        flex: 1,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 25
        }
    },
    time: {
        display: 'inline-block',
        padding: '21px 25px',
        lineHeight: 0,
        fontSize: 18,
        borderRadius: 36,
        whiteSpace: 'nowrap',
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        [theme.breakpoints.down('sm')]: {
            fontSize: 14,
            padding: '16px 18px',
        }
    },
    desc: {
        color: '#fff',
        opacity: 0.7,
        fontSize: 16
    },
    soldNumber: {
        fontSize: 18,
    },
    price: {
        fontSize: 24,
        fontWeight: 600,
        [theme.breakpoints.down('sm')]: {
            fontSize: 16,
        }
    }
}))