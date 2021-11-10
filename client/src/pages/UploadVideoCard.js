import React, {useState} from 'react'
import { Link } from "react-router-dom";
import "./UploadVideoCard.css"

const UploadVideoCard = ({movieData, setClickMyVideoDataFunc}) => {

    // console.log(image) // 모든 이미지가 다 콘솔에 뜸 
    // onClick={setClickMyVideoDataFunc(title)}

    return (
        <div className="upload-videocard">
           <Link to={"/myvideopage"}>
           <img className="like-videocard-thumbnail" src={movieData.image} alt="" onClick = {() => setClickMyVideoDataFunc(movieData.id)} />
           </Link>
           <div className="upload-videocard_info">
               <div className="upload-video_text">
                   <h4>{movieData.title}</h4>
                   <p>
                       {movieData.views} · <img className="like-icon" src="https://cdn-icons-png.flaticon.com/512/686/686308.png" alt="" /> {movieData.likes}
                   </p>
               </div>
           </div>
        </div>
    )
}

export default UploadVideoCard
