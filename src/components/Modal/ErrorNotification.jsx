import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { myContext } from '@/redux/index.js';

const useStyles = makeStyles((theme) => ({
    root: {
        position:'relative',
        width: '100%',
        zIndex:9999,
        '& > * + *': {
        marginTop: theme.spacing(2),
        },
        '& .MuiAlert-standardError':{
            backgroundColor:'#E43F29'
        }  
    },
    alerts: {
        height:'60px',
        borderRadius:'0',
        color:'#fff',
        '& .MuiAlert-message':{
            width:'100%',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            fontSize:'14px'
        },
        '& .MuiAlert-action':{
            marginRight:'0'
        }
    },
    close: {
        color:'#fff'
    },
    links:{
        textDecoration:'underline',
        padding:'0 6px',
        cursor:'pointer'
    }
}));
export default function ErrorNotification() {
  const classes = useStyles();
  const {state, dispatch} = useContext(myContext);
  return (
    <div className={classes.root}>
      <Collapse in={state.showErrorNotificationModal}>
        <Alert
            severity={'error'}
            className={classes.alerts}
            icon={false}
            action={
                <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                    dispatch({type: 'Error_Notification', showErrorNotificationModal: false});
                }}
                >
                <CloseIcon className={classes.close} fontSize="inherit"  />
            </IconButton>
          }
        >
            Oops! Something went wrong. <span className={classes.links}> Try again </span> or <span className={classes.links}> check Bounce Docs</span>
        </Alert>
      </Collapse>
    </div>
  );
}