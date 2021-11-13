import React from 'react'
import { Link } from "react-router-dom";
import "./MyUploadVideo.css"
import UploadVideoCard from './UploadVideoCard';

const MyUploadVideo = ({ isUploadVideo, setClickMyVideoDataFunc }) => { 

    console.log(isUploadVideo)

    return (
      <div className="myvideos col-12 sm-px-0">
        <div className="title">내가 올린 영상</div>
        <div className="myuploadvideo-box col-12 col-md-9">
          <div className="uploadvideocard-box col-12 row-floud">
            {
              isUploadVideo && isUploadVideo.map((el) => {
                return <UploadVideoCard key={el.id} movieData={el} setClickMyVideoDataFunc={setClickMyVideoDataFunc}/> 
              })
            }
          </div>
        </div>
      </div>
    )
}

export default MyUploadVideo
