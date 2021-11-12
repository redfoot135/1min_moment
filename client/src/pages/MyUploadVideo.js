import React from 'react'
import { Link } from "react-router-dom";
import "./MyUploadVideo.css"
import UploadVideoCard from './UploadVideoCard';

const MyUploadVideo = ({ isUploadVideo, setClickMyVideoDataFunc }) => { 

    console.log(isUploadVideo)

    return (
      <div className="myvideos row sm-px-0">
        <div className="col-10 col-md-9">
        <h1 className="title">내가 올린 영상</h1>
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
