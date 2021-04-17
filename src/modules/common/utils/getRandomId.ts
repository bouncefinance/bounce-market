export const getRandomId = (prefix: string = 'id') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 10)}`;
};
