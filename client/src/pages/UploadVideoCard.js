import React, {useState} from 'react'
import { Link } from "react-router-dom";
import "./UploadVideoCard.css"

const UploadVideoCard = ({movieData, setClickMyVideoDataFunc}) => {

    // console.log(image) // 모든 이미지가 다 콘솔에 뜸 

    return (
        <div className="upload-videocard col-lg-4 col-md-6 p-0 my-2">
           <Link to={"/myvideopage"}>
            <img className="like-videocard-thumbnail" src={movieData.image} alt="" onClick = {() => setClickMyVideoDataFunc(movieData.id)} />
           </Link>
           <div className="upload-videocard_info">
               <div className="upload-video_text">
                   <h4>{movieData.title}</h4>
                   <p>
                   view {movieData.views} · 찜 {movieData.likes}
                   </p>
               </div>
           </div>
        </div>
    )
}

export default UploadVideoCard
