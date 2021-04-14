/**
 * Percentage calculation with rounding
 */
export const getPercentage = (num1: number, num2: number) => {
  const calculated = Math.round((num1 / num2) * 100 * 1000) / 1000;
  return `${calculated}%`;
};

/**
 * Unit conversion to 'em' with rounding
 */
export const getEm = (num1: number, num2: number) => {
  const calculated = Math.round((num1 / num2) * 1000) / 1000;
  return `${calculated}em`;
};

/**
 * Unit conversion to 'rem' with rounding
 */
export const getRem = (num1: number, num2: number) => {
  const calculated = Math.round((num1 / num2) * 1000) / 1000;
  return `${calculated}rem`;
};

/**
 * Unit conversion to 'vw' with rounding
 */
export const getVw = (width: number, viewportWidth: number) => {
  const calculated =
    Math.round((width / (width / viewportWidth)) * 1000) / 1000;
  return `${calculated}vw`;
};
