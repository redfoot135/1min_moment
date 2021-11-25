import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios"
import './videopage2.css'
import Comments from '../component/comments'

axios.defaults.withCredentials = true;

export default function VideoPage2({clickMyVideoData, userInfo, accessToken, viewStateFunc, isLogin, videoInfo}){
  
    useEffect(() => {
        viewStateFunc(clickMyVideoData.id);
        console.log(clickMyVideoData)
      }, []) 

      
      
    const history = useHistory();


    // 업로드 영상 삭제하기
    const deleteMyVideoFunc = () => {
        axios.delete(`${process.env.REACT_APP_SERVER}/myvideo?id=${clickMyVideoData.id}`,{
            headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type" : "application/json"   
            },
            withCredentials: true
          }
          )
          .then((res) => {
              if(res.data.message === "deletion is complete") {
                window.location.replace('/main') 
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
        if(likeVideo === false && clickMyVideoData.mychoice === false) {
            axios.post(`${process.env.REACT_APP_SERVER}/like/video`,{video_id: clickMyVideoData.id},
            {
              headers: {
              authorization: `Bearer ${accessToken}`,
              "Content-Type" : "application/json"   
              },
              withCredentials: true
            })
            .then((res) => {
                likeStateFunc(); // 불이 켜지고
                likeCountPlusFunc(); // 좋아요 카운트 +1
            })
        } else if(likeVideo === false && clickMyVideoData.mychoice === true) {
            axios.delete(`${process.env.REACT_APP_SERVER}/like/video?video_id=${clickMyVideoData.id}`,
            {
              headers: {
              authorization: `Bearer ${accessToken}`,
              "Content-Type" : "application/json"   
              },
              withCredentials: true
            })
            .then((res) => {
                likeStateFunc(); // 불이 꺼지고
                likeCountMinusFunc(); // 좋아요 카운트 -1
            })
        }
        else if(likeVideo === true && clickMyVideoData.mychoice === true) {
            axios.post(`${process.env.REACT_APP_SERVER}/like/video`,{video_id: clickMyVideoData.id},
            {
              headers: {
              authorization: `Bearer ${accessToken}`,
              "Content-Type" : "application/json"   
              },
              withCredentials: true
            })
            .then((res) => {
                likeStateFunc(); // 불이 켜지고
                likeCountPlusFunc(); // 좋아요 카운트 +1
            })
        }
    }

    
    return(
        <div className='videopage2-container col-md-7 col-11'>
            <div className="videopage2-videobox row-fluid ">
            <video className="videopage2-video col-12" src={clickMyVideoData.video} controls />
            </div>
            <div className='video2-info-container col-12'>
                <div className='video2-first-row col-12'> 
                  <div>
                    <span className="video2-first-row-category">#{clickMyVideoData.category1}</span> 
                    {clickMyVideoData.category2 ? <span className="video2-first-row-category">#{clickMyVideoData.category2}</span> : null}
                    {clickMyVideoData.category3 ? <span className="video2-first-row-category">#{clickMyVideoData.category3}</span> : null}
                  </div>
                    <div className='video2-first-row-title'>{clickMyVideoData.title}</div>
                    <div className='video2-first-row-view-createdAt'>조회수 {clickMyVideoData.views} · {clickMyVideoData.createdAt.slice(0, 10)}</div>
                </div> 
                <div className='video2-second-row col-12'>
                    <div className='video2-second-row-creator'><img className="user-icon" src="https://i.ibb.co/ZV9MknX/profile-user.png"/> {clickMyVideoData.writer}</div>
                    <div className="video2-second-row-like-delete">
                      <div className="like-myvideo btn2" onClick={likeVideoFunc}>
                      {clickMyVideoData.mychoice === true && likeVideo === false ? 
                      <img className="like-icon" src="https://i.ibb.co/Y0jmDXG/2021-11-11-5-58-41-removebg-preview.png" alt="" /> :
                      <img className="like-icon" src="https://i.ibb.co/C0ntKBK/2021-11-11-5-56-57-removebg-preview.png" alt="" />
                      }
                      {likeVideoCount}
                      </div>
                      {isLogin === false ? null : 
                      <div className="delete-myvideo btn2" onClick={deleteMyVideoFunc}>
                      <img className="delete-icon" src="https://i.ibb.co/YkB7fMG/delete.png" /></div>
                      }
                    </div>
                </div>
            </div>
            <Comments accessToken={accessToken} clickMyVideoData={clickMyVideoData} userInfo={userInfo}/>
        </div>
    )
}