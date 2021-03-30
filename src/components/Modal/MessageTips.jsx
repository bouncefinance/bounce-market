import React from 'react'
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export default function MessageTips ({open, setopen}) {
  return <Snackbar open={open.open} autoHideDuration={2000} onClose={() => { setopen({ ...open, open: false }) }}>
    <Alert severity={open.severity || 'error'}>{open.message}</Alert>
  </Snackbar>
}

/**
 * USE
import MessageTips from '@/components/Modal/MessageTips';
const [openMessage, setopenMessage] = useState({ open: false, message: 'error', severity: 'error' })
setopenMessage({ open: true, message: 'success', severity: 'success' })
setopenMessage({ open: true, message: res.data?.msg || 'error', severity: 'error' })
 */