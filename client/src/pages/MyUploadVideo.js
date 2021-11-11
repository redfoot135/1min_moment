import React from 'react'
import { Link } from "react-router-dom";
import "./MyUploadVideo.css"
import UploadVideoCard from './UploadVideoCard';

const MyUploadVideo = ({ isUploadVideo, setClickMyVideoDataFunc }) => { 

    // console.log(isUploadVideo)

    return (
      <div className="px-5">
        <h1 className="title">내가 올린 영상</h1>
        <div className="myuploadvideo-box container-fluid">
          <div className="uploadvideocard-box row p-0">
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
