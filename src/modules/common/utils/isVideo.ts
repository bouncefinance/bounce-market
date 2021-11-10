import { NFTCategoryType } from 'modules/overview/actions/fetchItemsByFilter';

export function isVideo(file: File) {
  return file.type.indexOf('video/') === 0;
}

export const whatType = (file: File): NFTCategoryType => {
  const fileName = file.name;
  const fileType = file.type;

  if (fileType.includes('video/')) {
    return NFTCategoryType.video;
  }

  if (fileType.includes('model') || fileName.includes('.glb')) {
    return NFTCategoryType.model;
  }

  return NFTCategoryType.image;
};
