const ONE_DAY = 1000 * 60 * 60 * 24;

export const getDaysLeft = (endDate: Date) => {
  const today = new Date();

  if (today.getMonth() === 11 && today.getDate() > 25) {
    endDate.setFullYear(endDate.getFullYear() + 1);
  }

  return Math.ceil((endDate.getTime() - today.getTime()) / ONE_DAY);
};

export function getTimeRemaining(endtime: Date) {
  const total =
    Date.parse(new Date(endtime).toString()) -
    Date.parse(new Date().toString());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}
