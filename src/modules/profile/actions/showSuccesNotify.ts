import { t } from 'modules/i18n/utils/intl';
import { NotificationActions } from 'modules/notification/store/NotificationActions';

export const showSuccesNotify = () =>
  NotificationActions.showNotification({
    message: t('profile.edit.success-message'),
    severity: 'success',
  });