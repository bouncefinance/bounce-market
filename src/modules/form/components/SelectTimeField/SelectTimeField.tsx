import { useEffect, useState } from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';
import { FieldRenderProps } from 'react-final-form';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import { useSelectTimeFieldStyles } from './SelectTimeFieldStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ModalCloseBtn } from 'modules/uiKit/ModalCloseBtn';
import Typography from '@material-ui/core/Typography';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import { DatePicker } from 'modules/common/components/DatePicker';
import { Select } from 'modules/uiKit/Select';
import { memo } from 'react';

interface DialogTitleProps {
  className?: string;
  children?: React.ReactNode;
  onClose: () => void;
}
const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle {...other}>
      {children}
      {onClose ? <ModalCloseBtn onClick={onClose} /> : null}
    </DialogTitle>
  );
};

export const SelectTimeField: React.FC<FieldRenderProps<string>> = memo(
  ({ label, input, ...rest }) => {
    const classes = useSelectTimeFieldStyles();
    const [time, setTime] = useState<Date>();
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const timeValue = `${t('details-nft.info.date', {
      value: time,
    })} ${t('details-nft.info.time', {
      value: time,
    })}`;

    const onSwitchChange = () => {
      setOpen(!open);
      if (!open) {
        setDialogOpen(true);
      }
    };
    const handleDialogOpen = () => {
      setDialogOpen(true);
    };
    const handleDialogClose = () => {
      setDialogOpen(false);
    };

    useEffect(() => {
      if (time && input) {
        input.onChange({ open, time: +time });
      }
      // eslint-disable-next-line
    }, [open, time]);

    const handleSubmit = () => {
      if (!time) {
        return;
      }
      handleDialogClose();
    };

    const defaultTime = {
      defaultYear: time?.getFullYear(),
      defaultMonth: time ? time.getMonth() + 1 : undefined,
      defaultDay: time?.getDate(),
      defaultHours: time?.getHours(),
      defaultMinutes: time?.getMinutes(),
    };
    return (
      <>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <FormLabel className={classes.label}>{label}</FormLabel>
          <Switch checked={open} onChange={onSwitchChange} />
        </Box>
        {open && (
          <div onClick={handleDialogOpen} className={classes.selectTimeBox}>
            <Select
              options={[{ value: timeValue, label: timeValue }]}
              value={timeValue}
              name={timeValue}
              className={classes.selectTime}
            />
          </div>
        )}
        <Dialog
          onClose={handleDialogClose}
          open={dialogOpen}
          disableEscapeKeyDown
        >
          <BootstrapDialogTitle onClose={handleDialogClose}>
            <Typography variant="h2" className={classes.title}>
              {t('create-nft.label.Set-up-date')}
            </Typography>
          </BootstrapDialogTitle>
          <DatePicker {...defaultTime} onChange={d => setTime(d)} />
          <Button fullWidth size="large" onClick={handleSubmit}>
            {t('create-nft.next')}
          </Button>
        </Dialog>
      </>
    );
  },
);
