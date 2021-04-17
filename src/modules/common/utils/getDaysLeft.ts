const ONE_DAY = 1000 * 60 * 60 * 24;

export const getDaysLeft = (endDate: Date) => {
  const today = new Date();

  if (today.getMonth() === 11 && today.getDate() > 25) {
    endDate.setFullYear(endDate.getFullYear() + 1);
  }

  const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / ONE_DAY);

  return daysLeft;
};
