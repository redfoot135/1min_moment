import React, {useState} from 'react'
import { Link } from "react-router-dom";
import "./UploadVideoCard.css"

const UploadVideoCard = ({movieData, setClickMyVideoDataFunc}) => {


    return (
        <div className="upload-videocard col-lg-4 col-md-6 col-sm-12 p-0 my-2">
           <Link to={"/myvideopage"}>
            <img className="upload-videocard_thumbnail col-11" src={movieData.thumbnail} alt="" onClick = {() => setClickMyVideoDataFunc(movieData.id)} />
           </Link>
           <div className="upload-videocard_info">
               <div className="upload-video_text col-11">
                   <h4>{movieData.title}</h4>
                   {movieData.mychoice === false ? 
                   <p>
                       조회수 {movieData.views} · <img className="upload-video-like-icon" src="https://i.ibb.co/C0ntKBK/2021-11-11-5-56-57-removebg-preview.png" alt="" /> {movieData.likes}
                   </p>
                   : 
                   <p>
                       조회수 {movieData.views} · <img className="upload-video-like-icon" src="https://i.ibb.co/Y0jmDXG/2021-11-11-5-58-41-removebg-preview.png" alt="" /> {movieData.likes}
                   </p>
                   }
               </div>
           </div>
        </div>
    )
}

export default UploadVideoCard
