import { useEffect, useState } from 'react';

export const useCdnUrl = (
  src: string,
  width: number = 0,
  height: number = 0,
) => {
  const [imgSrc, setImgSrc] = useState<string>('');

  useEffect(() => {
    if (src) {
      preLoad(getCdnUrl(src, width, height), src);
    }
  }, [src]);

  const preLoad = (src: string, origin: string, reload?: boolean) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      if (!reload && src.slice(-5)?.includes('.gif')) {
        requestAnimationFrame(() => preLoad(origin, origin, true));
      }
    };
    img.onerror = () => setImgSrc('');
  };

  const getCdnUrl = (
    src: string,
    width: number = 0,
    height: number = 0,
  ): string => {
    const cdnUrl = 'https://ap1-cfs3-media-bounce.bounce.finance/';
    const suffixs = ['.jpg', '.png', '.gif', '.jp2', '.jpeg'];

    const hasThumbnail =
      src.slice(0, cdnUrl.length) === cdnUrl &&
      suffixs.find(format => src.slice(-5)?.includes(format));

    const getThumbnailUrl = (src: String): string => {
      return `${cdnUrl}${width > 0 ? width : 'auto'}x${
        height > 0 ? height : 'auto'
      }/${src?.replace(cdnUrl, '')}`;
    };

    return hasThumbnail ? getThumbnailUrl(src) : src;
  };

  return imgSrc;
};
