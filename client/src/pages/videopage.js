import { Button } from '@material-ui/core';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import './videopage.css'


export default function VideoPage({videoInfo,accessToken}){
   console.log(videoInfo)
   console.log(accessToken)
   const clickLikeBtn = () =>{
    axios
    .post(
      'https://localhost:80/like/video',{
        video_id:videoInfo.video_id
      },{
        headers: {
          authorization: `Bearer ${accessToken}`,
        "Content-Type" : "application/json"   
      },
      withCredentials: true
    }
      ).then((res)=>{
           console.log(res)
       if(res.data.message==='Video registration is complete'){
        alert("성공")
       // window.location.replace('/')
       }
       else{
        alert("실패")
       }
      
       }) 
   }
    return(
        <div className='video_page_container'>
            <video src={videoInfo.video} width='80%' controls />
            <div className='video_info_container'>
                <div className='first_row'> 
                    <div>{videoInfo.title}</div>
                    <Button onClick={clickLikeBtn}>찜버튼</Button>
                </div> 
                <div className='second_row'>
                    <div>{videoInfo.timestamp}</div> 
                    <div>{videoInfo.views}</div>
                    <div>삭제하기</div>
                </div>
                <div className='third_row'>
                    <div>카테고리</div>
                </div>   
               
            </div>
            <textarea
               className='comment'
               placeholder='댓글달기...'
               onkeypress
               >
                </textarea>
                <Button onClick>올리기</Button>
            <div>

            </div>
        </div>
    )
}