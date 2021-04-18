import { FieldMetaState } from 'react-final-form';
import { hasError } from './hasError';

export function getErrorText(meta: FieldMetaState<any>) {
  return hasError(meta) ? meta.error || meta.submitError : undefined;
}
