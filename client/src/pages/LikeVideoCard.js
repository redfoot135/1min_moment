import React from 'react'
import "./LikeVideoCard.css"
import { Link } from "react-router-dom";

function LikeVideoCard({likeVideoData, clickMyLikeVideoDataFunc}) {
    return (
        
        <div className="like-videocard col-lg-4 col-md-6 col-sm-12 p-0 my-2">
           <Link to={"/myvideopage"}>
            <img className="like-videocard_thumbnail col-11" src={likeVideoData.thumbnail} alt="" onClick = {() => clickMyLikeVideoDataFunc(likeVideoData.id)} />
           </Link>
           <div className="like-videocard_info">
               <div className="like-video_text">
                   <h4>{likeVideoData.title}</h4>
                   <p>
                       {likeVideoData.views} · <img className="like-icon" src="https://i.ibb.co/hgRgsrY/image.png" alt="" /> {likeVideoData.likes}
                   </p>
               </div>
           </div>
        </div>
        
    )
}

export default LikeVideoCard
