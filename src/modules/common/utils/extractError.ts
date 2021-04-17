import { t } from '../../i18n/utils/intl';

export function extractMessage(error: any) {
  if (!error) {
    return t('error.unexpected');
  }

  if (error instanceof Error) {
    return error.toString();
  }

  return t('error.unexpected');
}
