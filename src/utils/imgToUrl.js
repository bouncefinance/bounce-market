
/**
 * @param {*} sign_Axios react hooks
 * @param {*} fileData File
 * @param {*} onProgress optional 
 * @returns 
 */
export function ImgToUrl (sign_Axios, fileData, onProgress) {
    const onUploadProgress = (progressEvent) => {
        if (onProgress) {
            let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
            onProgress(complete)
        }
    }
  return sign_Axios
  .post('/api/v2/main/auth/fileupload', fileData, { appendAccount: false, config: {onUploadProgress} })
  .then(function (response) {
      if (response.data.code === 200) {
          return response.data.result.path
      } else {
          throw new Error('File upload failed,' + response.data.msg)
      }
  })
}