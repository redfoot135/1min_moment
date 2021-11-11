import React from 'react'
import "./LikeVideoCard.css"

function LikeVideoCard({image, title, views, like}) {
    return (
        <div className="like-videocard">
           <img className="like-videocard-thumbnail" src={image} alt=""/>
           <div className="like-videocard-info">
               <div className="like-video-text">
                   <h4 className="like-video-title">{title}</h4>
                   <p className="like-video-views">
                       {views} · <img className="like-video-icon" src="https://cdn-icons-png.flaticon.com/512/686/686308.png" alt=""/> {like}
                   </p>
               </div>
           </div>
        </div>
    )
}

export default LikeVideoCard
