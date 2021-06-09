export const truncateWalletAddr = (address: string): string => {
  if (address.length <= 12) {
    return address;
  }
  const addrSymbols = address.split('');
  const firstPart = addrSymbols.slice(0, 5).join('');
  const lastPart = addrSymbols
    .slice(addrSymbols.length - 4, addrSymbols.length)
    .join('');
  return `${firstPart}...${lastPart}`;
};
