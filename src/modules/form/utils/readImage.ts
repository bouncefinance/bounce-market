import { IMAGE_FILES_MIMES } from '../../common/utils/mimeTypes';

const WrongFormatError = new Error('Wrong format');

export function readImage(
  file: File,
): Promise<{ image: string; filename: string }> {
  if (IMAGE_FILES_MIMES.includes(file.type)) {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve({ image: reader.result as string, filename: file.name });
      };

      reader.onerror = error => {
        reject(reader.error);
      };
    });
  } else {
    throw WrongFormatError;
  }
}
