import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import icon_close from '@assets/images/icon/close.svg'
import styled from 'styled-components'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // width: width,
    // height: height
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    maxHeight:'100%',
    overflowY: 'auto',
  },
}));


const HeaderStyled = styled.div`
      height: 96px;
      border-bottom: 2px solid #000;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 83px;
      padding-right: 32px;

      h3{
          font-size: 34px;
      }

      img{
          user-select: none;
          cursor: pointer;
      }
`

export default function ModalBox({
  open,
  setOpen,
  children,
  isWrapperClose = false,
  header = {
    // title: '',
    // isClose: false
  },
  // width,
  // height
}) {
  const classes = useStyles();
  // const { dispatch } = useContext(myContext)

  // eslint-disable-next-line
  const handleClose = () => {
    if (!isWrapperClose) return
    setOpen && setOpen(false);
  };

  return (
    <div>
      <Modal
        // width={width}
        // height={height}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {header !== {} && <HeaderStyled>
              <h3>{header.title}</h3>
              {header.isClose && <img src={icon_close} alt="" onClick={() => { setOpen && setOpen(false) }} />}
            </HeaderStyled>}

            {children}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
