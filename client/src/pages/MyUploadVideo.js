import React from 'react'
import { Link } from "react-router-dom";
import "./MyUploadVideo.css"
import UploadVideoCard from './UploadVideoCard';

const MyUploadVideo = ({ isUploadVideo, setClickMyVideoDataFunc }) => { 

    console.log(isUploadVideo)

    return (
      <div className="myvideos col-12 sm-px-0">
        <div className="col-md-10">
        <div className="title">내가 올린 영상</div>
        <div className="myuploadvideo-box container-fluid">
          <div className="uploadvideocard-box row sm-p-5">
            {
              isUploadVideo && isUploadVideo.map((el) => {
                return <UploadVideoCard key={el.id} movieData={el} setClickMyVideoDataFunc={setClickMyVideoDataFunc}/> 
              })
            }
          </div>
        </div>

        </div>
      </div>
    )
}

export default MyUploadVideo
