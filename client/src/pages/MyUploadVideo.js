import React from 'react'
import { Link } from "react-router-dom";
import "./MyUploadVideo.css"
import UploadVideoCard from './UploadVideoCard';

const MyUploadVideo = ({ isUploadVideo, setClickMyVideoDataFunc }) => { 

    console.log(isUploadVideo)

    return (

      <>
      {isUploadVideo !== [] ?
      <div className="myvideos col-12 sm-px-0">
        <div className="col-md-10">
          <div className="title"><img className="myvideo-title" src="https://i.ibb.co/tq5VJyk/image.png"/></div>
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
      :
      <div>업로드 비디오 없음</div>
      }
    </>
    )
}

export default MyUploadVideo
