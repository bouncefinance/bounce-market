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
        '& .MuiAlert-standardInfo':{
            backgroundColor:'#000000'
        },
        '& .MuiAlert-standardSuccess':{
            backgroundColor:'#2DAB50'
        },
        '& .MuiAlert-standardWarning':{
            backgroundColor:'rgb(255, 244, 229)'
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
    }
}));
// modelType:'info'/'success'/'error'/'warning'

export default function ModalMessage() {
  const classes = useStyles();
  const {state, dispatch} = useContext(myContext);
  let timer;
  if(timer){
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    dispatch({type: 'Modal_Message', showMessageModal: false,modelType:'',modelMessage:""});
  }, 4000);
  
  return (
    <div className={classes.root}>
      <Collapse in={state.showMessageModal}>
        <Alert
            severity={state.modelType||'warning'}
            className={classes.alerts}
            icon={false}
            action={
                <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                    dispatch({type: 'Modal_Message', showMessageModal: false,modelType:'',modelMessage:""});
                }}
                >
                <CloseIcon className={classes.close} fontSize="inherit"  />
            </IconButton>
          }
        >
          {state.modelMessage ||"Info"}
        </Alert>
      </Collapse>
    </div>
  );
}