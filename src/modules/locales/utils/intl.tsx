import intl from 'react-intl-universal';

export function t(key: string, variables?: any): string {
  return intl.get(key, variables) || key;
}

export function tHTML(key: string, variables?: any): string {
  return intl.getHTML(key, variables) || key;
}
