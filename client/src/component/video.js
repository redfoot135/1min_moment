import './video.css'
import {useMediaQuery} from 'react-responsive'
import Avatar from "@material-ui/core/Avatar";
import { useEffect,useCallback } from 'react';
import { BrowserRouter, Route, Switch, useHistory, Link} from 'react-router-dom';
export default function Video({setClickMyVideoDataFunc,movieData,image, channelImage, title, channel, views, timestamp,getvideoInfo,video,video_id}) {
    // console.log(movieData)
    console.log(movieData.likes)
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
       
        <div className="videocard col-lg-4 col-md-6 col-sm-12 p-0 my-2">
        <Link to={"/myvideopage"}>
         <img className="upload-videocard_thumbnail col-11" src={movieData.thumbnail} alt="" onClick={() => setClickMyVideoDataFunc(movieData.id)} />
        </Link>
        <div className="upload-videocard_info">
            <div className="upload-video_text col-11">
                <h4>{movieData.title}</h4>
                <p>
                    조회수 {movieData.views} · <img className="upload-video-like-icon" src="https://i.ibb.co/hgRgsrY/image.png" alt="" /> {movieData.likes}
                </p>
            </div>
        </div>
     </div>
        
    )

}