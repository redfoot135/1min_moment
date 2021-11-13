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
    var sectionStyle = {
        width: "300px",
        height: "300px",
        backgroundImage: `url(${image})`
      };
        
    return (
        <Link className='slide_link' to='/videos'>
    <section className="slide_videocard" onClick={onClickVideo} style={ sectionStyle }>
        
        <div className="videocard_info2">
            {/* <Avatar 
               className="videocard_avatar" 
               alt={channel}  
            />*/}
            <div className="video_text2">
                <h4>{title}</h4>
                <p>{channel}</p>
                <p>
                    {views} · {timestamp}
                </p>
            </div>
        </div>
    </section>
     </Link>
 )
    
}