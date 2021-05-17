export const isValidWebsiteUrl = (url: string): boolean => {
  const urlStr = String(url).toLowerCase();
  const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
  return urlStr.length < 2083 && urlRegex.test(urlStr);
};
