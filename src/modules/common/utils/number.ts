import BigNumber from 'bignumber.js';

const isInt = (n: number) => n === parseInt(n.toString(), 10);
const toFormat = (number: number, accuracy: number): string => {
  const numberValue = number.toFixed(accuracy + 1);
  return numberValue.substr(0, numberValue.length - 1);
};

const div = (a: number, b: number) =>
  new BigNumber(a.toString()).div(b).toNumber();

export const formatUnitNumber = (n: number, accuracy = 1) => {
  const toString = (n: number, unit: string): string => {
    const numberValue = toFormat(n, accuracy);

    return (
      (isInt(parseFloat(numberValue)) ? n.toFixed(0) : numberValue) +
      unit.toUpperCase()
    );
  };
  if (n >= 1e3 && n < 1e6) {
    return toString(div(n, 1e3), 'k');
  }
  if (n >= 1e6 && n < 1e9) {
    return toString(div(n, 1e6), 'm');
  }
  if (n >= 1e9 && n < 1e12) {
    return toString(div(n, 1e9), 'b');
  }
  if (n >= 1e12 && n < 1e15) {
    return toString(div(n, 1e12), 't');
  }
  return n;
};
