import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import upload_img from '@assets/images/upload_img.svg'
import upload_video from '@assets/images/upload_video.svg'
import upload_avatar from '@assets/images/upload_avatar.svg'
import { myContext } from '@/redux/index.js'
const UploadStyled = styled.div`
    display: flex;
    margin-top: 22px;

    .left_img{
        margin-right: 40px;
        width: ${({ width }) => { return width }};
        height:${({ height }) => { return height }};
        box-sizing: border-box;
        position: relative;
        &.avatar{
            width: 160px;
            height: 160px;
        }

        img{
            width: 100%;
            height: 100%;
        }

        input{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            z-index: 1;
            cursor: pointer;
        }
        
    }
    

    .right_info{
        display: flex;
        flex-direction: column;
        justify-content: center;

        p{
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 12px;
            color: rgba(0,0,0,.7);
        }

        span{
            margin-top: 2px;
            color: rgba(0,0,0,.4);
            font-size: 13px;
            line-height: 15.51px;
        }
    }
`

export default function Upload ({
    type = 'image',
    infoTitle: defaltInfoTitle = 'upload Image',
    onFileChange,
    defaultValue,
    disabled,
    lockInput,
    width = '240px',
    height = '160px',
}) {
    const { dispatch } = useContext(myContext);
    const [coverSrc, setCoverSrc] = useState(upload_img)
    const [infoTitle, setInfoTitle] = useState(defaltInfoTitle)
    const [infoTip, setInfoTip] = useState([
        'Supports JPG, PNG, JPEG2000',
        'no more than 100MB, 262*262 Reccomended'
    ])
    const [fileLimit, setFileLimit] = useState('image/*')

    useEffect(() => {
        switch (type) {
            case 'image':
                setCoverSrc(defaultValue || upload_img)
                setInfoTitle(infoTitle || 'upload Image')
                setInfoTip([
                    'Supports JPG, PNG, JPEG2000',
                    'no more than 100MB, 262*262 Reccomended'
                ])
                setFileLimit('image/*')
                break;
            case 'video':
                setCoverSrc(defaultValue || upload_video)
                setInfoTitle(infoTitle || 'Upload File')
                setInfoTip([
                    'Supports MP4, AVI, WMV, MOV',
                    'no more than 100MB, 360*240 Reccomended'
                ])
                setFileLimit('video/*')
                break;
            case 'avatar':
                setCoverSrc(defaultValue || upload_avatar)
                setInfoTitle(infoTitle || 'Change Profile Photo')
                setInfoTip([
                    'Supports JPG, PNG, JPEG2000',
                    'no more than 100MB, 262*262 Reccomended'
                ])
                setFileLimit('image/*')
                break;
            default:
                return
        }
        // eslint-disable-next-line
    }, [])

    const handelFileChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        console.log(file.type)
        if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif') {
            let reader = new FileReader();  //调用FileReader
            reader.readAsDataURL(file); //将文件读取为 DataURL(base64)
            reader.onload = function (evt) {   //读取操作完成时触发。
                setCoverSrc(evt.target.result)  //将img标签的src绑定为DataURL
                setInfoTitle(file.name)
            }
            let formData = new FormData()
            formData.append('filename', file)
            onFileChange && onFileChange(formData, file)
            // setFormData(formData)
        } else {
            dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'error', modelMessage: "The file format you selected is incorrect" });
        }
    }

    // 'https://account.bounce.finance:16000/api/v1/fileupload'

    return (
        <UploadStyled width={width} height={height} >
            <div className={`left_img ${type}`}>
                <img src={coverSrc} alt="" />
                <input disabled={disabled || lockInput} type="file" accept={fileLimit} name="upload_file" onChange={handelFileChange} id="" />
            </div>

            <div className="right_info">
                <p>{infoTitle}</p>
                <span>{infoTip[0]}</span>
                <span>{infoTip[1]}</span>
            </div>
        </UploadStyled>
    )
}

export const UploadStyle = UploadStyled