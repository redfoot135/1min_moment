import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios"
import './videopage2.css'

axios.defaults.withCredentials = true;

export default function VideoPage2({clickMyVideoData, userInfo, accessToken}){

    const history = useHistory();

    // 업로드 영상 삭제하기
    const deleteMyVideoFunc = () => {
        console.log(accessToken)
        console.log(clickMyVideoData)
        axios.delete(`https://localhost:80/myvideo?id=${clickMyVideoData.id}`,{
            headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type" : "application/json"   
            },
            withCredentials: true
          }
          )
          .then((res) => {
              console.log(res)
              if(res.data.message === "deletion is complete") {
                window.location.replace('/') 
              }
          })
          .catch((err) => {
              alert("인증에 실패하셨습니다. 재로그인 후 진행해주세요")
          })
    }

    // 동영상 좋아요 post 요청
    const likeVideoFunc = (e) => {
        axios.post("https://localhost:80/like_video",{video_id: clickMyVideoData.id},
        {
          headers: {
          authorization: `Bearer ${accessToken}`,
          "Content-Type" : "application/json"   
          },
          withCredentials: true
        })
        .then((res) => {
            if(res.data.message === "Likes are reflected") {
              console.log(res)
            } else if(res.data.message === "You can't like twice") {
              console.log(res)
            }
        })
        .catch((err) => {
            alert("인증에 실패하셨습니다. 재로그인 후 진행해주세요")
        })
    }
    
    return(
        <div className='videopage2-container'>
            <video src={clickMyVideoData.video} width='80%' controls />
            <div className='video2-info-container'>
                <div className='video2-first-row'> 
                    <div className='video2-first-row-title'>{clickMyVideoData.title}</div>
                    <div className='video2-first-row-title'>{clickMyVideoData.createdAt}</div>
                    <span>카테고리 {clickMyVideoData.category1}</span>
                </div> 
                <div className='video2-second-row'>
                    <div>작성자 {userInfo.name}</div>
                    <div>view {clickMyVideoData.views}</div>
                    <div onClick={likeVideoFunc}>찜 <img className="like-icon" src="https://cdn-icons-png.flaticon.com/512/686/686308.png" alt="" /> {clickMyVideoData.likes}</div>
                    <div onClick={deleteMyVideoFunc}>삭제하기</div>
                </div>
            </div>
        </div>
    )
}