import React from 'react';
import './slide.css'
import Avatar from "@material-ui/core/Avatar";
export default function Slide({image, channelImage, title, channel, views, timestamp}){
    return (
        <div className="videocard">
        <img className="videocard_thumbnail" src={image} alt=""/>
        <div className="videocard_info">
            <Avatar 
               className="videocard_avatar" 
               alt={channel} 
               src={channelImage} 
            />
            <div className="video_text">
                <h4>{title}</h4>
                <p>{channel}</p>
                <p>
                    {views} · {timestamp}
                </p>
            </div>
        </div>
     </div>
 )
    
}