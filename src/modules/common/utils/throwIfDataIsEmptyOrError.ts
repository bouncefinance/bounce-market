import { t } from '../../i18n/utils/intl';

interface Return<QueryStateData> {
  data: QueryStateData;
  isAborted?: true;
  action: any;
}

export function throwIfDataIsEmptyOrError<QueryStateData = any>(response: {
  data?: QueryStateData;
  error?: any;
  isAborted?: true;
  action: any;
}): Return<QueryStateData> {
  if (!response.data) {
    throw new Error(t('error.data-is-not-available'));
  }

  if (response.error) {
    throw response.error;
  }

  return response as Return<QueryStateData>;
}
