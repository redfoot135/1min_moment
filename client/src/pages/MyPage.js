import React, {useState} from 'react';
import { Link } from "react-router-dom";
import "./MyPage.css";
import MyInfo from "../component/MyInfo"

const MyPage = ({ userInfo, accessToken, handleSecession, handleUpload }) => {

    const [isMyInfoOpen, setIsMyInfoOpen] = useState(false)

    const openMyInfoModalFunc = () => {
        setIsMyInfoOpen(!isMyInfoOpen)
    }

    const myUploadVideoFunc = () => {
      handleUpload();
    }

    return (
    <div className="mypage-box">
      <div className="mypage-backImage-box row-fluid">
        <img className="mypage-backImage col-md-9 col-11" src="https://media.discordapp.net/attachments/894783138381836339/908383174336340018/7057cbcecaa171b.jpeg"/>
      </div>
      <div className="mypage-title"><img className="mypage-title-txt" src="https://i.ibb.co/sJ4KsyZ/001.png" /></div>
      <div className="mypage-content-box">
        <div className="mypage-myinfo-txt btnbox" onClick={ openMyInfoModalFunc }>
           <img className="mypage-myinfo-icon" src="https://cdn-icons-png.flaticon.com/512/64/64494.png" />
           내 정보 보기
        </div>
        {isMyInfoOpen === false ? null 
        : <MyInfo openMyInfoModalFunc={openMyInfoModalFunc} userInfo={userInfo} handleSecession={handleSecession} accessToken={accessToken} />
        }
        <Link to={"/myuploadvideo"} style={{ textDecoration: 'none', color: "black" }} >
        <div className="mypage-myupload-txt btnbox">
           <img className="mypage-myupload-icon" src="https://cdn-icons.flaticon.com/png/512/566/premium/566410.png?token=exp=1636712516~hmac=cf4b5f275d54ec7e93a1a4f22c0127e0" />
           내가 올린 꿀팁
        </div>
        </Link>
        <Link to={"/mylikevideo"} style={{ textDecoration: 'none', color: "black" }} >
        <div className="mypage-mylike-txt btnbox">
        <img className="mypage-mylike-icon" src="https://cdn-icons.flaticon.com/png/512/4278/premium/4278247.png?token=exp=1636712084~hmac=7dba5534ad64bf760e04bb4e35d43a5f" />
           내가 찜한 꿀팁
        </div>
        </Link>
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
                     <div className="like-video txt" >내가 찜한 영상</div>
                  </div>
               </Link>
               <Link to={"/myuploadvideo"} style={{ textDecoration: 'none', color: "white" }} >
                  <div className="upload-video-box">
                     <img class="upload-video-logo" src="https://i.ibb.co/1M79pDJ/video-camera.png" />
                     <div className="upload-video txt" onClick={ myUploadVideoFunc }>내가 올린 영상</div>
                  </div>
               </Link>
            </div>
        </div> */
    )
}

export default MyPage
