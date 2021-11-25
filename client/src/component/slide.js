import React, {useState} from 'react';
import './slide.css'
import Avatar from "@material-ui/core/Avatar";
import { BrowserRouter, Route, Switch, useHistory, Link} from 'react-router-dom';
export default function Slide({image, title, channel, views, timestamp,video, getvideoInfo,video_id,category1,category2,category3}){
    //getvideoInfo(image, channelImage, title, channel, views, timestamp,video)
    const onClickVideo = ()=>{

        getvideoInfo(image,title, views, timestamp,video,video_id,category1,category2,category3)
        
    }
    var sectionStyle = {
        width: "25.3vw",
        height: "25.3vw",
        margin: '0 4vw',
        backgroundImage: `url(${image})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
      };
        
    return (
        <Link className='slide_link' style={{ textDecoration: 'none', color: "black"}} to='/videos'>
    <section className="slide_videocard" onClick={onClickVideo} style={ sectionStyle }>
        <div className='slide_info'>
        
        <div className="videocard_info2">
            {/* <Avatar 
               className="videocard_avatar" 
               alt={channel}  
            />*/}
            <div className="video_text2">
                <h4>{title}</h4>
                
                <p>
                    {views} · {timestamp}
                </p>
                
            </div>
            </div>
        </div>
    </section>
     </Link>
 )
    
}