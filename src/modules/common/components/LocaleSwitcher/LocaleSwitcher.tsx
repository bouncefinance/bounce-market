import React, { ChangeEvent, useCallback } from 'react';
import { Locale } from 'modules/i18n/types/locale';
import { setLocale } from 'modules/i18n/i18nSlice';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { useLocale } from 'modules/i18n/utils/useLocale';
import { useLocaleSwitcher } from './LocaleSwitcherStyles';
import { Select } from 'modules/uiKit/Select';
import { t } from 'modules/i18n/utils/intl';

import { useAppDispatch } from 'store/useAppDispatch';

export const LocaleSwitcher = () => {
  const classes = useLocaleSwitcher();
  const dispatch = useAppDispatch();

  const localeOptions = useLocaleMemo(
    () => [
      {
        value: Locale.en,
        label: t('language.en-US'),
      },
      {
        value: Locale.zh,
        label: t('language.zh-CN'),
      },
      {
        value: Locale.ru,
        label: t('language.ru-RU'),
      },
    ],
    [],
  );

  const { locale } = useLocale();

  const onChange = useCallback(
    (event: ChangeEvent<{ value: unknown }>) => {
      dispatch(setLocale(event.target.value as Locale));
    },
    [dispatch],
  );

  return (
    <Select
      className={classes.root}
      value={locale}
      onChange={onChange}
      options={localeOptions}
      fullWidth={false}
    />
  );
};
