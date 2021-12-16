import React, { useEffect} from 'react';
import "./MyLikeVideo.css"
import UploadVideoCard from './UploadVideoCard';


const MyLikeVideo = ({handleLikeVideo, isLikeVideo, setClickMyVideoDataFunc}) => {


    useEffect(() => {
        handleLikeVideo(); // 찜한 영상요청 함수 실행
     },[])


    return (

        <>
           {isLikeVideo !== {} ?
           <div className="mylikevideo col-12 sm-px-0">
             <div className="col-md-9">
               <div className="title"><img className="mylikevideo-title" src="https://i.ibb.co/HTVBwgY/image.png" alt='title'/></div>
               <div className="mylikevideo-box container-fluid">
               <div className="likevideocard-box row sm-p-5">
                 {
                   isLikeVideo && isLikeVideo.map((el) => {
                     return <UploadVideoCard key={el.id} movieData={el} setClickMyVideoDataFunc={setClickMyVideoDataFunc}/> 
                   })
                 }
               </div>
               </div>
             </div>
           </div>
           :
           <div>찜한 비디오 없음</div>
           }
        </>
    )
}

export default MyLikeVideo
