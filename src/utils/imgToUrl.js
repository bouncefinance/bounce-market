export function ImgToUrl (sign_Axios, fileData) {
  return sign_Axios
  .post('/api/v2/main/auth/fileupload', fileData, { appendAccount: false })
  .then(function (response) {
      if (response.data.code === 200) {
          return response.data.result.path
      } else {
          throw new Error('File upload failed,' + response.data.msg)
      }
  })
}