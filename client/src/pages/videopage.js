import { Button } from '@material-ui/core';
import { BrowserRouter, Route, Switch, useHistory, Link} from 'react-router-dom';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Comments from '../component/comments'
import './videopage.css'


export default function VideoPage({videoInfo,accessToken,userInfo}){
  //  console.log(videoInfo)
  //  console.log(accessToken)

   const clickLikeBtn = () =>{
    axios
    .post(
      `${process.env.REACT_APP_SERVER}/like/video`,{
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
       if(res.data.message==='Likes are reflected'){
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
                    <div></div>
                </div>
                <div className='third_row'>
                    <div></div>
                </div>   
               
            </div>
               <Comments accessToken={accessToken} videoInfo={videoInfo} userInfo={userInfo}/>
            <div>

            </div>
           
        </div>
       
    )
}