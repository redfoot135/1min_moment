import React, {useState} from 'react';
import './slide.css'
import Avatar from "@material-ui/core/Avatar";
import { BrowserRouter, Route, Switch, useHistory, Link} from 'react-router-dom';
export default function Slide({image, channelImage, title, channel, views, timestamp,video, getvideoInfo,video_id}){
   // console.log(getvideoInfo)
    //getvideoInfo(image, channelImage, title, channel, views, timestamp,video)
    const onClickVideo = ()=>{
        getvideoInfo(image,title, views, timestamp,video,video_id)
        
    }
        
    return (
        <Link className="videocard" to='/videos'>
    <div onClick={onClickVideo}>
        <img className="videocard_thumbnail" src={image} alt=""/>
        <div className="videocard_info">
            <Avatar 
               className="videocard_avatar" 
               alt={channel} 
               
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
     </Link>
 )
    
}