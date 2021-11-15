import React, {useState} from 'react'
import { Link } from "react-router-dom";
import "./UploadVideoCard.css"

const UploadVideoCard = ({movieData, setClickMyVideoDataFunc}) => {

    console.log(movieData)

    return (
        <div className="upload-videocard col-lg-4 col-md-6 col-sm-12 p-0 my-2">
           <Link to={"/myvideopage"}>
            <img className="upload-videocard_thumbnail col-11" src={movieData.thumbnail} alt="" onClick = {() => setClickMyVideoDataFunc(movieData.id)} />
           </Link>
           <div className="upload-videocard_info">
               <div className="upload-video_text col-11">
                   <h4>{movieData.title}</h4>
                   <p>
                       조회수 {movieData.views} · <img className="upload-video-like-icon" src="https://i.ibb.co/hgRgsrY/image.png" alt="" /> {movieData.likes}
                   </p>
               </div>
           </div>
        </div>
    )
}

export default UploadVideoCard
