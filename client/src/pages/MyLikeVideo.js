import React, {useState, useEffect} from 'react';
import LikeVideoCard from './LikeVideoCard';
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
               <div className="title"><img className="mylikevideo-title" src="https://i.ibb.co/HTVBwgY/image.png"/></div>
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
        
        // <div className="mylikevideo-box">
        //     <div className="videocard-box">
        //         <LikeVideoCard 
        //         title="1분만에 얻는 생활 꿀팁!"
        //         views="10.5만 views"
        //         like="3만"
        //         image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
        //         />
        //         <LikeVideoCard 
        //         title="1분만에 얻는 부동산 꿀팁!"
        //         views="10.5만 views"
        //         like="3만"
        //         image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"/>
        //         <LikeVideoCard 
        //         title="나만 아는 부동산 꿀팁!"
        //         views="10.5만 views"
        //         like="3만"
        //         image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"/>
        //         <LikeVideoCard 
        //         title="이것만 알면 부동산 왕!"
        //         views="10.5만 views"
        //         like="3만"
        //         image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"/>
        //         <LikeVideoCard 
        //         title="1분만에 집 사는 법!"
        //         views="10.5만 views"
        //         like="3만"
        //         image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"/>
        //     </div>

        // </div>
    )
}

export default MyLikeVideo
