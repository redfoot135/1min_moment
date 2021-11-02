import './video.css'
import {useMediaQuery} from 'react-responsive'
import Avatar from "@material-ui/core/Avatar";
import { useEffect,useCallback } from 'react';
export default function Video({image, channelImage, title, channel, views, timestamp}) {
    const isPc = useMediaQuery({
        query : "(min-width:768px)"
    })
    const isMobile = useMediaQuery({
        query : "(max-width:767px)"
    })
    const handleScroll = useCallback((): void=>{
         const {innerHeight} = window;
         

    },[])
    useEffect(()=>{
        window.addEventListener('scroll',handleScroll, true)
        return() =>{
            window.removeEventListener('scroll',handleScroll, true)
        };
    },[handleScroll]);

    return(
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