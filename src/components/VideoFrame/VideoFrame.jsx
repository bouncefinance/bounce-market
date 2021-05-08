import React, {useRef, useEffect, useState, useCallback, useMemo} from "react";
import styled from 'styled-components'
import { Image, Popover, Spin  } from 'antd';
import debounce from './useDebounce';

const VideoDebugs = styled.div`
    width: 100%;
    height: 100%;
    display:flex;
    // justify-content:center;
    align-items:flex-start;
    flex-direction:column;
    .debugContainer {
        width: ${props => props.videoWidth || 600}px;
        height: ${props => props.videoHeight || 360}px;
        .player{
            width: 100%;
            height: ${props => props.videoHeight - 20}px;
            position: relative;
          }
          .frameControl {
              width: 100%;
              height: 20px;
              background: #ccc;
              cursor:pointer;
          }
    }
`;

function VideoFrame (props) {
    const { src, onImageChangeCalback } = props;
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const frameControlRef = useRef(null);
    const [rate, setRate] = useState(0);
    const format = props.format || 'png';
    const [node, setNode] = useState({});
    const nodeRef = useRef(null);
    
    const [images, setImages] = useState({});

    useEffect(() => {
        videoRef.current.addEventListener('canplay', (e) => {
            videoRef.current.play();
            // videoRef.current.addEventListener('seeked', seekDef)
            frameControlRef.current.addEventListener('click', debounce((e) => {
                const indexTabWidth = e.target.clientWidth;
                const indexTabOffsetX = e.offsetX;
                const frameRate = indexTabOffsetX / indexTabWidth;
                setRate(frameRate);
                generateFrame(frameRate.toFixed(3));
        }, 100));
        })
        // return videoRef.current.removeEventListener('canplay', () => {

        // });
        return frameControlRef.current.removeEventListener('click', () => {
            console.log('event mousemove has removed')
        })
    }, []);

    // useEffect(() => {
    //     frameControlRef.current.addEventListener('mousemove', debounce((e) => {
    //         const indexTabWidth = e.target.clientWidth;
    //         const indexTabOffsetX = e.offsetX;
    //         const frameRate = indexTabOffsetX / indexTabWidth;
    //         setRate(frameRate);
    //         generateFrame(frameRate.toFixed(3));
    // }, 100));
    //     return frameControlRef.current.removeEventListener('mousemove', () => {
    //         console.log('event mousemove has removed')
    //     })
    // }, [rate]);

    useEffect(() => {
        // generateFrame()
    }, [rate])

    const uniq = (arr) => {
        return Array.from(new Set(arr));
    }

    /** 视频寻址 */
    const seekDef = (e) => {
        videoRef.current.removeEventListener('seeked', () => {
            console.log('seeked event has removed');
        });
        const { image, width, height, currentTime } = generateCanvas(videoRef.current);
        videoRef.current.pause();
        const base64Path = window.URL.createObjectURL(new Blob([image]));
        // setImages((prev) => {
        //     if (!~prev.map(v => v.url).indexOf(base64Path)) {
        //         prev = [...prev, { url: base64Path, time: currentTime, width: width, height: height }]
        //     }
        //     return prev;
        // });        
        setImages({ url: base64Path, time: currentTime, width: width, height: height });
    }

    const generateFrame = (frameRate) => {
        const { image, width, height, currentTime } = generateCanvas(videoRef.current, videoRef.current.duration * frameRate);
        
        const base64Path = window.URL.createObjectURL(new Blob([image]));
        console.log('------------>>>base64Path', base64Path);
        setImages({ url: base64Path, time: currentTime, width: width, height: height });
        onImageChangeCalback && onImageChangeCalback({ url: base64Path, time: currentTime });
    }

    const generateCanvas = (video, frameTime) => {
        if (!nodeRef.current) {
            let cloneNode = video.cloneNode(true);
            nodeRef.current = cloneNode;
            setNode(cloneNode);
        }
        nodeRef.current.setAttribute('crossOrigin', 'anonymous')
        nodeRef.current.currentTime = frameTime;
        const canvas = document.createElement('canvas')
        const width = canvas.width = videoRef.current.videoWidth;
        const height = canvas.height = videoRef.current.videoHeight;
        canvas.getContext('2d').drawImage(nodeRef.current, 0, 0);
        const dataURI = canvas.toDataURL('image/' + format);
        const data = dataURI.split(',')[1];
        return {
            image: Buffer.from(data, 'base64'),
            currentTime: frameTime,
            width,
            height
        }
    }


    return (
        <VideoDebugs videoWidth={props.videoWidth} videoHeight={props.videoHeight}>
            <div className="debugContainer" ref={containerRef}>
                <video ref={videoRef} className="player" src={src} muted={true} controls/>
                <div className="frameControl" ref={frameControlRef}></div>
            </div>
        </VideoDebugs>
    )
}

export default VideoFrame;

