export const truncateWalletAddr = (address: string): string => {
  if (address.length <= 12) {
    return address;
  }
  if (typeof address !== 'string') {
    address = '';
  }
  const addrSymbols = address.split('');
  const firstPart = addrSymbols.slice(0, 5).join('');
  const lastPart = addrSymbols
    .slice(addrSymbols.length - 4, addrSymbols.length)
    .join('');
  return `${firstPart}...${lastPart}`;
};

export const truncateLongName = (name: string, length?: number): string => {
  const LENGTH = length || 15;
  if (name.length <= LENGTH) {
    return name;
  }
  const firstPart = name.slice(0, LENGTH - 2);
  return `${firstPart}...`;
};
