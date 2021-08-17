import { useEffect, useState } from 'react';

// 传入原始图片链接、目标宽高，处理得到缩略图链接，返回该链接并进行预加载。
const useCdnUrl = (src: string, width?: number, height?: number) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const cdnUrl = process.env.REACT_APP_IMG_CDN_URL;
  console.log('src: ', src);

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
    const suffixs = ['.jpg', '.png', '.gif', '.jp2', '.jpeg'];

    const hasThumbnail =
      src.slice(0, cdnUrl?.length) === cdnUrl &&
      suffixs.find(format => src.slice(-5)?.includes(format));

    const getThumbnailUrl = (src: String): string => {
      if (cdnUrl) {
        return `${src?.slice(0, src?.lastIndexOf('/'))}/${
          width > 0 ? width : 'auto'
        }x${height > 0 ? height : 'auto'}${src?.slice(src?.lastIndexOf('/'))}`;
      }
      return '';
    };

    return hasThumbnail ? getThumbnailUrl(src) : src;
  };

  useEffect(() => {
    if (src) {
      preLoad(getCdnUrl(src, width, height), src);
    }
  }, [src, width, height]);

  return { imgSrc, setImgSrc };
};

export default useCdnUrl;
