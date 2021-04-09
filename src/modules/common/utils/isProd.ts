export function isProd() {
  return !process.env.DEBUG && process.env.NODE_ENV === 'production';
}

export function isDev() {
  return !isProd();
}
