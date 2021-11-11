import React from 'react'
import "./UploadVideoCard.css"

const UploadVideoCard = ({image, title, views, like}) => {
    return (
        <div className="upload-videocard col-lg-4 col-md-6 p-0 my-2">
           <img className="upload-videocard_thumbnail" src={image} alt=""/>
           <div className="upload-videocard_info">
               <div className="upload-video_text">
                   <h4>{title}</h4>
                   <p>
                       {views} · <img className="like-icon" src="https://cdn-icons-png.flaticon.com/512/686/686308.png" alt=""/> {like}
                   </p>
               </div>
           </div>
        </div>
    )
}

export default UploadVideoCard
