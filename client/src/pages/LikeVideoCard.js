import React from 'react'
import { Link } from "react-router-dom";
import "./LikeVideoCard.css"

function LikeVideoCard({likeVideoData, clickMyLikeVideoDataFunc}) {
    console.log(likeVideoData)
    return (
        
        <div className="like-videocard col-lg-4 col-md-6 col-sm-12 p-0 my-2">
           <Link to={"/myvideopage"}>
            <img className="like-videocard_thumbnail col-11" src={likeVideoData.thumbnail} alt="" onClick = {() => clickMyLikeVideoDataFunc(likeVideoData.id)} />
           </Link>
           <div className="like-videocard_info">
               <div className="like-video_text">
                   <h4>{likeVideoData.title}</h4>
                   {likeVideoData.mychoice === false ? 
                   <p>
                       {likeVideoData.views} · <img className="like-icon" src="https://i.ibb.co/C0ntKBK/2021-11-11-5-56-57-removebg-preview.png" alt="" /> {likeVideoData.likes}
                   </p>
                   : 
                   <p>
                       {likeVideoData.views} · <img className="like-icon" src="https://i.ibb.co/Y0jmDXG/2021-11-11-5-58-41-removebg-preview.png" alt="" /> {likeVideoData.likes}
                   </p>
                   }
               </div>
           </div>
        </div>
        
    )
}

export default LikeVideoCard


