import React, {useState} from 'react'
import { Link } from "react-router-dom";
import "./UploadVideoCard.css"

const UploadVideoCard = ({movieData, setClickMyVideoDataFunc}) => {

    // console.log(image) // 모든 이미지가 다 콘솔에 뜸 
    // onClick={setClickMyVideoDataFunc(title)}

    return (
        <div className="upload-videocard col-lg-4 col-md-6 col-sm-12 p-0 my-2">
           <Link to={"/myvideopage"}>
            <img className="upload-videocard_thumbnail col-11" src={movieData.thumbnail} alt="" onClick = {() => setClickMyVideoDataFunc(movieData.id)} />
           </Link>
           <div className="upload-videocard_info">
               <div className="upload-video_text">
                   <h4>{movieData.title}</h4>
                   <p>
                       {movieData.views} · <img className="like-icon" src="https://i.ibb.co/hgRgsrY/image.png" alt="" /> {movieData.likes}
                   </p>
               </div>
           </div>
        </div>
    )
}

export default UploadVideoCard
