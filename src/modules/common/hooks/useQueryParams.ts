import { useLocation } from 'react-router';

export function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}
