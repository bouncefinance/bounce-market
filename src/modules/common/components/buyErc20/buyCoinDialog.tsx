import { Box, Button, Dialog, Typography } from "@material-ui/core"
import { truncateWalletAddr } from "modules/common/utils/truncateWalletAddr"
import { InputField } from "modules/form/components/InputField"
import { FormErrors } from "modules/form/utils/FormErrors"
import { t } from "modules/i18n/utils/intl"
import { Img } from "modules/uiKit/Img"
import { ModalCloseBtn } from "modules/uiKit/ModalCloseBtn"
import { useState } from "react"
import { Field, Form, FormRenderProps } from "react-final-form"
import { useBuyCoinDialogStyles } from "./useBuyCoinDialogStyles"

interface IBuyCoinFormData {
    quantity: string
}
export const BuyCoinDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const classes = useBuyCoinDialogStyles()
    const handleSubmit = (payload: IBuyCoinFormData) => {
        console.log('handleSubmit', payload);
    }
    const validate = (payload: IBuyCoinFormData) => {
        const errors: FormErrors<IBuyCoinFormData> = {};
        if (!payload.quantity) {
            errors.quantity = t('validation.required');
        }
        if (Number(payload.quantity) <= 0) {
            errors.quantity = t('validation.required');
        }
        return errors;
    };
    const [initialValues] = useState<IBuyCoinFormData>({
        quantity: '0',
    });
    const renderForm = ({
        handleSubmit,
        form,
    }: FormRenderProps<IBuyCoinFormData>) => {
        return (
            <Box mt={4} component="form" onSubmit={handleSubmit} className={classes.form}>
                <Box mb={2}>
                    <Field
                        component={InputField}
                        name="quantity"
                        type="quantity"
                        label={'Quantity'}
                        placeholder="Only integers can be entered"
                        fullWidth={true}
                    />
                </Box>
            </Box>
        )
    }
    return <>
        <Dialog
            fullWidth
            open={isOpen}
            onClose={onClose}
            classes={{
                paper: classes.root,
            }}
            PaperProps={{
                elevation: 0,
            }}
            maxWidth="md"
        >

            <Box mb={5} mt={5} className={classes.dialogHead}>
                <Typography variant="h2" className={classes.title}>
                    Checkout
                </Typography>
            </Box>
            <Box display="flex" alignItems="center">
                <Box mr={2}>
                    <Img className={classes.leftImg} src="" />
                </Box>
                <Box flex={1}>
                    <p>{truncateWalletAddr('0x35500253DEB46fa8c2b271628c65DcF159206882')}</p>
                    <p>{truncateWalletAddr('0x35500253DEB46fa8c2b271628c65DcF159206882')}</p>
                </Box>
            </Box>
            <Form
                onSubmit={handleSubmit}
                render={renderForm}
                validate={validate}
                initialValues={initialValues}
            />
            <Box display="flex" justifyContent="space-between">
                <Typography>Total</Typography>
                <Typography>10 APE</Typography>
            </Box>
            <Box mb={4} display="flex" justifyContent="space-between">
                <Typography>Reference</Typography>
                <Typography>0.0405 APE per FT</Typography>
            </Box>
            <Button fullWidth >
                Proceed to pay
            </Button>
            <ModalCloseBtn onClick={onClose} />
        </Dialog>
    </>
}