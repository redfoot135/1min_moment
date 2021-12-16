import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./MyPage.css";
import MyInfo from "../component/MyInfo"

const MyPage = ({ userInfo, accessToken, handleSecession, handleUpload }) => {

    const [isMyInfoOpen, setIsMyInfoOpen] = useState(false)

    const openMyInfoModalFunc = () => {
        setIsMyInfoOpen(!isMyInfoOpen)
    }

    return (
      <div className="mypage-box col-12">
      <div className="mypage-backImage-box row-fluid">
        <img className="mypage-backImage col-md-9 col-11" src="https://media.discordapp.net/attachments/894783138381836339/908383174336340018/7057cbcecaa171b.jpeg" alt='back-img'/>
      </div>
      <div className="mypage-title col-12">
        <img className="mypage-title-txt col-5" src="https://i.ibb.co/SrKT18c/image.png" alt='title'/>
       </div>
      <div className="mypage-content-box row-fluid">
        <div className="mypage-controller col-12">
          <div className="mypage-myinfo-txt btnbox" onClick={ openMyInfoModalFunc }>
            <img className="mypage-icon col-7" src="https://cdn-icons-png.flaticon.com/512/64/64494.png" alt='icon'/>
            <div className="mypage-button-text">내 정보</div>
          </div>
          {isMyInfoOpen === false ? null 
          : <MyInfo openMyInfoModalFunc={openMyInfoModalFunc} userInfo={userInfo} handleSecession={handleSecession} accessToken={accessToken} />
          }
          <Link to={"/myuploadvideo"} style={{ textDecoration: 'none', color: "black" }} >
            <div className="mypage-myupload-txt btnbox">
              <img className="mypage-icon col-7" src="https://i.ibb.co/1rQXYwN/honey.png" alt='icon'/>
              <div className="mypage-button-text">만든 꿀</div>
            </div>
          </Link>
          <Link to={"/mylikevideo"} style={{ textDecoration: 'none', color: "black" }} >
            <div className="mypage-mylike-txt btnbox">
              <img className="mypage-icon col-7" src="https://i.ibb.co/BsGjp7X/idea.png" alt='icon'/>
              <div className="mypage-button-text">얻은 꿀</div>
            </div>
          </Link>
        </div>
      </div>
   </div>

         /* <div className="mypage-sidebar">
            <div className="mypage-userbox">
                  <img class="user-logo" src="https://i.ibb.co/DGqH1Jr/user.png" />
                  <div className="userinfo-box">
                     <div className="username">{userInfo.name}</div>
                     {userInfo.email === null ? null : <div className="usermail">{userInfo.email}</div>}
                  </div>
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
                     <div className="like-video txt">내가 찜한 영상</div>
                  </div>
               </Link>
               <Link to={"/myuploadvideo"} style={{ textDecoration: 'none', color: "white" }} >
                  <div className="upload-video-box">
                     <img class="upload-video-logo" src="https://i.ibb.co/1M79pDJ/video-camera.png" />
                     <div className="upload-video txt">내가 올린 영상</div>
                  </div>
               </Link>
            </div>
        </div> */
    )
}

export default MyPage
