import Modal from '@components/Modal/Modal'
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useState, useEffect } from 'react'
import upload_img from '@assets/images/upload_img.svg'
import styled from 'styled-components'
import { Button } from '@components/UI-kit'
import Cropper from 'react-cropper'
import "cropperjs/dist/cropper.css"
import { base64ToBlob } from '@/utils/base64ToBlob'
import { ImgToUrl } from '@/utils/imgToUrl'
import useAxios from '@/utils/useAxios'
import { UploadStyle } from '@/components/UI-kit/Input/Upload'
import { useParams } from 'react-router'

const UpdateTopBarImgStyle = styled.div`
width: 1100px;
box-sizing: border-box;
padding: 32px 83px;
box-sizing: border-box;
.button_group{
    margin-top: 36px;
    display:flex;
    button{
        margin-right: 16px;
    }
}
.wrap{
    position:relative
}
.buttonProgress{
    position: absolute;
    top:50%;
    left:50%;
    width:28px !important;
    height:28px !important;
    margin-top:-14px;
    margin-left:-22px;
}
.step_title{
  font-weight: bold;
  margin-bottom: 10px;
}
`
const defaultSrc =
  "";

export default function UpdateTopBarImg (props) {
  const { brandId } = useParams()
  const ratio = [1440, 180]
  const [btnLock, setBtnLock] = useState(false)
  const [inputDisable, setInputDisable] = useState(false)
  const defaultBthText = 'Save And application'
  const [btnText, setBtnText] = useState(defaultBthText)
  const [preview, setPreview] = useState(false)
  const { sign_Axios } = useAxios()


  // ----cropper----
  const [image, setImage] = useState(defaultSrc)
  const [cropData, setCropData] = useState("#")
  const [cropper, setCropper] = useState()
  const infoTip = [
    'Supports JPG, PNG, JPEG2000',
    `no more than 100MB, ${ratio[0]}*${ratio[1]} Reccomended`
  ]
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    // console.log(files)
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };


  const handelSubmit = async () => {
    setBtnLock(true)
    setInputDisable(true)
    setBtnText('Uploading File ...')
    const unlock = () => {
      setBtnLock(false)
      setInputDisable(false)
      setBtnText(defaultBthText)
    }
    try {
      const blob = base64ToBlob(cropData)
      // Object.defineProperty(blob, "type", { writable: false, value: "image/png" })
      const formData = new FormData()
      formData.append('filename', new File([blob], 'blob.png', { type: 'image/png' }))
      const bandimgurl = await ImgToUrl(sign_Axios, formData)
      const { data } = await sign_Axios.post('/api/v2/main/auth/updatebandimg', {
        bandimgurl,
        id: brandId | 0
      })
      if (data.code === 200 || data.code === 1) {
        // TODO tips success
        props.setOpen(false)
        unlock()
        // update data of page
        props.run()
      } else {
        throw new Error('')
      }
      // close popup
    } catch (error) {
      setInputDisable(false)
      setBtnText('Upload Error!')
      setTimeout(unlock, 2000)
    }
  }

  useEffect(() => { }, [])
  return <Modal open={props.open} setOpen={props.setOpen} header={{ title: 'Change Theme Photo', isClose: true }}>
    <UpdateTopBarImgStyle>
      <div className="change_thene_box">

        {!preview && <>
          {image ? <div>
            <div className="step_title">Cropper</div>
            <Cropper
              style={{ height: 200, width: "100%" }}
              viewMode={1}
              aspectRatio={1440 / 180}
              src={image}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
            <div className="button_group">
              <Button height='48px' width='302px' onClick={() => {
                setImage('')
              }}>Reselect</Button>
              <div className="wrap">
                <Button height='48px' width='302px' primary onClick={() => {
                  setPreview(true)
                  getCropData()
                  // console.log('cropData:', cropData)
                }}>preview</Button>
              </div>
            </div>
          </div> : <div>
            {/* 1440*180 */}
            <UploadStyle width={1440} height={180} >
              <div className={`left_img image`}>
                <img src={upload_img} alt="" />
                <input type="file" accept={'image/*'} name="upload_file" onChange={onChange} />
              </div>

              <div className="right_info">
                <p>{'upload Image'}</p>
                <span>{infoTip[0]}</span>
                <span>{infoTip[1]}</span>
              </div>
            </UploadStyle>
          </div>}
        </>}
      </div>

      {preview && <div>
        <div className="step_title">Preview</div>
        <img width="100%" src={cropData} alt="preview" />
        <div className="button_group">
          <Button height='48px' width='302px' onClick={() => {
            // setOpen(false)
            setPreview(false)
          }}>again cropper</Button>
          <div className="wrap">
            <Button disabled={btnLock} height='48px' width='302px' primary onClick={handelSubmit}>{btnText}</Button>
            {inputDisable && <CircularProgress className="buttonProgress" />}
          </div>
        </div>
      </div>}
    </UpdateTopBarImgStyle>
  </Modal>
}