import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios"
import './videopage2.css'

axios.defaults.withCredentials = true;

export default function VideoPage2({clickMyVideoData, userInfo, accessToken, viewStateFunc}){

    useEffect(() => {
        viewStateFunc(clickMyVideoData.id);
      }, []) 
      
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

    const [likeVideo, setLikeVideo] = useState(false)
    const [likeVideoCount, setLikeVideoCount] = useState(clickMyVideoData.likes)

   // 좋아요 이모티콘  상태변경 함수
    const likeStateFunc = () => {
        setLikeVideo(!likeVideo);
    }
    // 좋아요 카운트 플러스 함수
    const likeCountPlusFunc = () => {
        setLikeVideoCount(likeVideoCount+1)
    }
    // 좋아요 카운트 마이너스 함수
    const likeCountMinusFunc = () => {
        setLikeVideoCount(likeVideoCount-1)
    }

    // likeVideo가 false일 때 동영상 좋아요 post 요청
    const likeVideoFunc = () => {
        console.log(likeVideo)
        if(likeVideo === false) {
            axios.post("https://localhost:80/like/video",{video_id: clickMyVideoData.id},
            {
              headers: {
              authorization: `Bearer ${accessToken}`,
              "Content-Type" : "application/json"   
              },
              withCredentials: true
            })
            .then((res) => {
                console.log(res)
                likeStateFunc(); // 불이 켜지고
                likeCountPlusFunc(); // 좋아요 카운트 +1
            })
        } else if(likeVideo === true) {
            axios.delete(`https://localhost:80/like/video?video_id=${clickMyVideoData.id}`,
            {
              headers: {
              authorization: `Bearer ${accessToken}`,
              "Content-Type" : "application/json"   
              },
              withCredentials: true
            })
            .then((res) => {
                console.log(res)
                likeStateFunc(); // 불이 꺼지고
                likeCountMinusFunc(); // 좋아요 카운트 -1
            })
        }
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
                    <div onClick={likeVideoFunc}>찜
                    {likeVideo === false ? 
                    <img className="like-icon" src="https://i.ibb.co/C0ntKBK/2021-11-11-5-56-57-removebg-preview.png" alt="" /> :
                    <img className="like-icon" src="https://i.ibb.co/Y0jmDXG/2021-11-11-5-58-41-removebg-preview.png" alt="" />
                    } 
                    {likeVideoCount}
                    </div>
                    <div onClick={deleteMyVideoFunc}>삭제하기</div>
                </div>
            </div>
        </div>
    )
}