import './video.css'
import {useMediaQuery} from 'react-responsive'
import Avatar from "@material-ui/core/Avatar";
export default function Video({image, channelImage, title, channel, views, timestamp}) {
    const isPc = useMediaQuery({
        query : "(min-width:768px)"
    })
    const isMobile = useMediaQuery({
        query : "(max-width:767px)"
    })

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