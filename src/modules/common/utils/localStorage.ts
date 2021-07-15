export const getJWTToken = () => {
  return localStorage.token;
};
export const setJWTToken = (token: string) => {
  localStorage.token = token;
};
