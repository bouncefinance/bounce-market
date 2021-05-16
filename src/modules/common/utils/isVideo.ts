export function isVideo(file: File) {
  return file.type.indexOf('video/') === 0;
}
