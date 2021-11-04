import React from 'react'
import "./LikeVideoCard.css"

function LikeVideoCard({image, title, views, like}) {
    return (
        <div className="videocard">
           <img className="videocard_thumbnail" src={image} alt=""/>
           <div className="videocard_info">
               <div className="video_text">
                   <h4>{title}</h4>
                   <p>
                       {views} · <img className="like-icon" src="https://cdn-icons-png.flaticon.com/512/686/686308.png" alt=""/> {like}
                   </p>
               </div>
           </div>
        </div>
    )
}

export default LikeVideoCard
