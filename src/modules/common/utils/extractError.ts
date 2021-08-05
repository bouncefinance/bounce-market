import { t } from '../../i18n/utils/intl';

export function extractMessage(error: any) {
  if (error?.code === 4001) {
    return t('error.contract-rejected');
  }

  if (error instanceof Error) {
    return error.toString();
  }

  if (!error) {
    return t('error.unexpected');
  }

  return t('error.unexpected');
}
