const WrongFormatError = new Error('Wrong format');

export function readImage(
  file: File,
): Promise<{ image: string; filename: string }> {
  if (
    file.type === 'image/png' ||
    file.type === 'image/jpg' ||
    file.type === 'image/jpeg' ||
    file.type === 'image/gif'
  ) {
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
