import './video.css'
import {useMediaQuery} from 'react-responsive'
import Avatar from "@material-ui/core/Avatar";
import { useEffect,useCallback } from 'react';
import { BrowserRouter, Route, Switch, useHistory, Link} from 'react-router-dom';
export default function Video({image, channelImage, title, channel, views, timestamp,getvideoInfo,video,video_id}) {
    const isPc = useMediaQuery({
        query : "(min-width:768px)"
    })
    const isMobile = useMediaQuery({
        query : "(max-width:767px)"
    })
    // const handleScroll = useCallback((): void=>{
    //      const {innerHeight} = window;
         

    // },[])
    // useEffect(()=>{
    //     window.addEventListener('scroll',handleScroll, true)
    //     return() =>{
    //         window.removeEventListener('scroll',handleScroll, true)
    //     };
    // },[handleScroll]);
    const onClickVideo = ()=>{
        getvideoInfo(image,title, views, timestamp,video,video_id)
        
    }
    return(
       
        <div className="videocard col-md-4">
            <div onClick={onClickVideo}>
             <Link to='/videos'>
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
           </Link>
           </div>
        </div>
        
    )

}