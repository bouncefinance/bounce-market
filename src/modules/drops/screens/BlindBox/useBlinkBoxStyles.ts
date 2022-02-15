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
    boxLeft: {
        maxwidth: 338,
        maxHeight: 338,
        width: '20%',
    }
}))