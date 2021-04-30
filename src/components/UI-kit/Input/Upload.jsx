import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import upload_img from '@assets/images/upload_img.svg'
import upload_video from '@assets/images/upload_video.svg'
import upload_avatar from '@assets/images/upload_avatar.svg'
import { myContext } from '@/redux/index.js'
import useWrapperIntl from '@/locales/useWrapperIntl'
import { getFileType } from '@/utils/getFileType'

const UploadStyled = styled.div`
    display: flex;
    /* margin-top: 22px; */

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

/* 
    type: [
        'image',
        'video',
    ]
*/

export default function Upload({
    type = 'image',
    /* infoTitle: defaltInfoTitle = 'upload Image', */
    onFileChange,
    defaultValue,
    disabled,
    lockInput,
    width = '240px',
    height = '160px',
    onClick
}) {
    const { dispatch } = useContext(myContext);

    const { wrapperIntl } = useWrapperIntl()

    const [coverSrc, setCoverSrc] = useState(upload_img)
    /* const [infoTitle, setInfoTitle] = useState(defaltInfoTitle) */
    const [infoTitle, setInfoTitle] = useState(wrapperIntl("UIKit.Input.Upload.infoTip.uploadImage"))
    const [infoTip, setInfoTip] = useState([
        wrapperIntl("UIKit.Input.Upload.infoTip.requirement1"),
        wrapperIntl("UIKit.Input.Upload.infoTip.requirement2"),
    ])
    const [fileLimit, setFileLimit] = useState('image/*')

    useEffect(() => {
        console.log("type:", type)
    }, [type])


    useEffect(() => {
        // console.log(type)
        switch (type) {
            case 'image':
                setCoverSrc(defaultValue || upload_img)
                setInfoTitle(wrapperIntl("UIKit.Input.Upload.infoTip.uploadImage"))
                setInfoTip([
                    wrapperIntl("UIKit.Input.Upload.infoTip.image.requirement1"),
                    wrapperIntl("UIKit.Input.Upload.infoTip.image.requirement2"),
                ])
                setFileLimit('image/*')
                break;
            case 'video':
                setCoverSrc(defaultValue || upload_video)
                setInfoTitle(wrapperIntl("UIKit.Input.Upload.infoTip.uploadVideo"))
                setInfoTip([
                    wrapperIntl("UIKit.Input.Upload.infoTip.video.requirement1"),
                    wrapperIntl("UIKit.Input.Upload.infoTip.video.requirement2"),
                ])
                setFileLimit('video/*')
                break;
            case 'avatar':
                setCoverSrc(defaultValue || upload_avatar)
                setInfoTitle(infoTitle || wrapperIntl("UIKit.Input.Upload.infoTip.ChangeProfilePhoto"))
                setInfoTip([
                    wrapperIntl('UIKit.Input.Upload.infoTip.avatar.requirement1'),
                    wrapperIntl('UIKit.Input.Upload.infoTip.avatar.requirement2'),
                ])
                setFileLimit('image/*')
                break;
            default:
                return
        }
        // eslint-disable-next-line
    }, [type])

    const handelFileChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        let filetype
        try {
            filetype = await getFileType(file)
        } catch (error) {
            console.log(error)
        }
        if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/gif') {
            let reader = new FileReader();  //调用FileReader
            reader.readAsDataURL(file); //将文件读取为 DataURL(base64)
            reader.onload = function (evt) {   //读取操作完成时触发。
                setCoverSrc(evt.target.result)  //将img标签的src绑定为DataURL
                setInfoTitle(file.name)
            }
            let formData = new FormData()
            formData.append('filename', file)
            onFileChange && onFileChange(formData, file, filetype)
            // setFormData(formData)
        } else if (file.type.includes('video/')) {
            console.log(file)
            if (file.size > 100 * 1024 * 1024 || file.type !== "video/mp4") {
                dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'error', modelMessage: wrapperIntl("UIKit.Input.Upload.infoTip.videoError") });
                return;
            }
            let reader = new FileReader();  //调用FileReader
            reader.readAsDataURL(file); //将文件读取为 DataURL(base64)
            reader.onload = function (evt) {   //读取操作完成时触发。
                // setCoverSrc(evt.target.result)  //将img标签的src绑定为DataURL
                setInfoTitle(file.name)
            }
            let formData = new FormData()
            formData.append('filename', file)
            onFileChange && onFileChange(formData, file, filetype)
        } else {
            dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'error', modelMessage: wrapperIntl("UIKit.Input.Upload.infoTip.FormatIncorrect") });
        }
    }

    // 'https://account.bounce.finance:16000/api/v1/fileupload'
    const wrapperOmit = (str) => {
        if (String(str).length > 20) {
            const str1 = String(str).substr(0, 10)
            const str2 = String(str).substr(-10)
            return `${str1}...${str2}`
        }
        return str
    }

    return (
        <UploadStyled width={width} height={height} >
            <div className={`left_img ${type}`}>
                <img src={coverSrc} alt="" />
                <input disabled={disabled || lockInput} type="file" accept={fileLimit} name="upload_file" onChange={handelFileChange} id="" onClick={onClick} />
            </div>

            <div className="right_info">
                <p>{wrapperOmit(infoTitle)}</p>
                <span>{infoTip[0]}</span>
                <span>{infoTip[1]}</span>
            </div>
        </UploadStyled>
    )
}

export const UploadStyle = UploadStyled