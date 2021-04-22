import TYPEMAP from './filetype.json'

const getHeaderValue = (value, n) => {
  const arr = (new Uint8Array(value))//.subarray(0, n)
  let header = ""
  for (let i = 0; i < arr.length; i++) {
    const v = arr[i].toString(16)
    header += v.length === 1 && v === '0' ? '0' + v : v
  }
  return header
}
/**
 * file header get type
 * @param {*} value16 
 * @param {*} change 
 */
const handleFileType = (value16, change) => {
  let header3 = value16.substring(0, 3 * 2)
  ,header4 = value16.substring(0, 4 * 2)
  ,header8 = value16.substring(0, 16 * 2)
  let type = TYPEMAP[header4] || TYPEMAP[header3] || ''
  if (type === '') {
    for (let key of Object.keys(TYPEMAP)) {
      let arr = key.split(/\{\d+,\d+\}/, 2)
      if (!arr[1]) {
        continue
      }
      if (header8.substring(0, arr[0].length) === arr[0]) {
        const siteArr = key.match(/\{(\d+,\d+)\}/)[1].split(',').map(e => e | 0)
        const startSite = arr[1].length + siteArr[0] + 2
        if (header8.substring(startSite, startSite + siteArr[1]) === arr[1]) {
          type = TYPEMAP[key]
          break
        }
      } else {
        continue
      }
    }
  }
  change && change(type)
}

/**
 *  get file type
 * @param {*} blob 
 * @param {(type: string) => void} change (type) => void
 * @returns Promise<(type) => void>
 */
export const getFileType = (blob, change) => {
  var fileReader = new FileReader()
  return new Promise((resolve, reject) => {
    fileReader.onloadend = function({ target }) {
      handleFileType(getHeaderValue(target.result), (type) => {
        resolve(type)
        change && change(type)
      })
    }
    try {
      fileReader.readAsArrayBuffer(blob)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}