import { Box, Dialog, IconButton, Typography } from '@material-ui/core';
import { CloseIcon } from 'modules/common/components/Icons/CloseIcon';
import { InputField } from 'modules/form/components/InputField';
import { FormErrors } from 'modules/form/utils/FormErrors';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import { useCallback } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { useCollectionStyles } from '../useCollectionStyles';
import { useAccount } from 'modules/account/hooks/useAccount';
import { useDispatchRequest } from '@redux-requests/react';
import { useState } from 'react';
import { editDescription } from 'modules/profile/actions/editDescription';

const DESC_CHARACTER_LIMIT = 500;

export interface IDescFormValues {
  description: string;
}

interface IDescTokenDialogProps {
  isOpen: boolean;
  onClose: () => void;
  collection: string;
  description: string;
}

export const CollectionDescDialog = ({
  isOpen,
  onClose,
  collection,
  description,
}: IDescTokenDialogProps) => {
  const classes = useCollectionStyles();
  const { address } = useAccount();
  const dispatch = useDispatchRequest();
  const [submitLoading, setSubmitLoading] = useState(false);

  const onSubmit = ({ description }: { description: string }) => {
    if (!description || !address) return;
    setSubmitLoading(true);
    dispatch(
      editDescription({
        accountAddress: address,
        contractAddress: collection,
        desc: description,
      }),
    ).then(() => {
      setSubmitLoading(false);
      setTimeout(() => {
        onClose();
      }, 1000);
    });
  };

  const validateForm = useCallback(({ description }: IDescFormValues) => {
    const errors: FormErrors<IDescFormValues> = {};

    if (!description) {
      errors.description = t('validation.required');
    }

    return errors;
  }, []);

  const renderForm = useCallback(
    ({ handleSubmit, values, form }: FormRenderProps<IDescFormValues>) => {
      return (
        <Box mb={5} className={classes.royaltyRate}>
          <div>
            <Box mb={5} className={classes.descBox}>
              <Field
                component={InputField}
                name="description"
                type="text"
                color="primary"
                fullWidth
                rows={2.5}
                rowsMax={10}
                multiline
                showLimitCounter={true}
                inputProps={{
                  maxLength: DESC_CHARACTER_LIMIT,
                }}
              />
            </Box>
          </div>
          <Button
            size="large"
            fullWidth
            loading={submitLoading}
            onClick={handleSubmit}
            variant="outlined"
          >
            {'Save changes'}
          </Button>
        </Box>
      );
    },
    [classes, submitLoading],
  );
  return (
    <Dialog open={isOpen} maxWidth={'sm'}>
      <Typography variant="h2" align="center" className={classes.title}>
        {'Edit description'}
      </Typography>
      <Form
        validate={validateForm}
        onSubmit={onSubmit}
        render={renderForm}
        initialValues={{
          description: description,
        }}
      />

      <IconButton onClick={onClose} className={classes.close}>
        <CloseIcon fontSize="large" />
      </IconButton>
    </Dialog>
  );
};
