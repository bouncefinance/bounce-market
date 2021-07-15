// @ts-ignore
import ColorThief from 'colorthief';
import { useCallback } from 'react';

export default function useBgColor() {
  const getBackgroudColor: (
    bgImg: string | undefined,
    defaultColor: string | undefined,
    setColor: React.Dispatch<React.SetStateAction<string | undefined>>,
  ) => Promise<any> = useCallback(async (bgImg, defaultColor, setColor) => {
    if (!bgImg) return defaultColor;
    const colorThief = new ColorThief();
    const img = new Image();
    img.src = bgImg;
    img.setAttribute('crossOrigin', '*');

    img.addEventListener('load', async () => {
      const colors: number[] = await colorThief.getColor(img);
      setColor(`rgb(${colors.join(',')})`);
    });
  }, []);

  return { getBackgroudColor };
}
