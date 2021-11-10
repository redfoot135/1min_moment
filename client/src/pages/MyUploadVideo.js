import React from 'react'
import { Link } from "react-router-dom";
import "./MyUploadVideo.css"
import UploadVideoCard from './UploadVideoCard';

const MyUploadVideo = ({ isUploadVideo, setClickMyVideoDataFunc }) => { 

    // console.log(isUploadVideo)

    return (

    <div className="myuploadvideo-box">
        <div className="uploadvideocard-box">
        {
        isUploadVideo && isUploadVideo.map((el) => {
        return <UploadVideoCard key={el.id} movieData={el} setClickMyVideoDataFunc={setClickMyVideoDataFunc}/> 
        })
        }
        </div>
    </div>
    )
}

export default MyUploadVideo
