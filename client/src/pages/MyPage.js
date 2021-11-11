import React, {useState} from 'react';
import { Link } from "react-router-dom";
import "./MyPage.css";
import MyInfo from "../component/MyInfo"

const MyPage = ({ openSideBarlFunc, userInfo, accessToken, handleSecession, handleUpload }) => {

    const [isMyInfoOpen, setIsMyInfoOpen] = useState(false)

    const openMyInfoModalFunc = () => {
        setIsMyInfoOpen(!isMyInfoOpen)
    }

    const myUploadVideoFunc = () => {
      openSideBarlFunc();
      handleUpload();
    }

    return (
    
        <div className="mypage-sidebar">
            <div className="mypage-userbox">
                  <img class="user-logo" src="https://i.ibb.co/DGqH1Jr/user.png" />
                  <div className="userinfo-box">
                     <div className="username">{userInfo.name}</div>
                     {userInfo.email === null ? null : <div className="usermail">{userInfo.email}</div>}
                  </div>
                  <span className="mypage-close" onClick={openSideBarlFunc}>
                    &times;
                </span>
            </div>
            <div className="mypage-bodybox">
                <div className="my-info-box">
                   <img class="my-info-logo" src="https://i.ibb.co/c3FgzDy/info.png" />
                   <div className="my-info txt" onClick={ openMyInfoModalFunc }>내 정보 보기　</div>
                </div>
               {isMyInfoOpen === false ? null 
               : <MyInfo openMyInfoModalFunc={openMyInfoModalFunc} userInfo={userInfo} handleSecession={handleSecession} accessToken={accessToken} />
               }
               <Link to={"/mylikevideo"} style={{ textDecoration: 'none', color: "white" }} >
                  <div className="like-video-box">
                     <img class="like-video-logo" src="https://i.ibb.co/J3mnNfH/like.png" />
                     <div className="like-video txt" onClick={ openSideBarlFunc }>내가 찜한 영상</div>
                  </div>
               </Link>
               <Link to={"/myuploadvideo"} style={{ textDecoration: 'none', color: "white" }} >
                  <div className="upload-video-box">
                     <img class="upload-video-logo" src="https://i.ibb.co/1M79pDJ/video-camera.png" />
                     <div className="upload-video txt" onClick={ myUploadVideoFunc }>내가 올린 영상</div>
                  </div>
               </Link>
            </div>
        </div>
    
    )
}

export default MyPage
