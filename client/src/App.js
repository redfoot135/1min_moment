import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from "axios"
import './App.css';
import SignIn from "./component/SignIn"
import MyPage from "./pages/MyPage"
import MyLikeVideo from "./pages/MyLikeVideo"
import MyUploadVideo from "./pages/MyUploadVideo"
import Nav from './component/nav'
import Nav2 from './component/nav2'
import Main from './component/main'
import VideoPage from './pages/videopage'
import VideoPage2 from './pages/videopage2'
import UploadVideo from './pages/uploadVideo'
import Introduce from './component/Introduce'

axios.defaults.withCredentials = true;

function App() {
  
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [category, setcategory] = useState(null);
  const [searchInfo, setSearchInfo] = useState('');


const getSearch= (search) =>{
  setSearchInfo(search)
  console.log("App.js getSearch : ", search)
 }

 const onReset = () => {
  setSearchInfo('');
}
  

  const handleAccessToken = (tokenData) => { // 소셜로그인 후 함수

    setAccessToken(tokenData) 

    axios.get(`${process.env.REACT_APP_SERVER}/userinfo`,
    {headers: {
      authorization: `Bearer ${tokenData}`,
      "Content-Type" : "application/json"   
    },
    withCredentials: true
    }).then((res) => {
      setUserInfo(res.data.data.userinfo) // id, email, name (+ social 정보 들어갈 예정)
      setIsLogin(true) // 로그인 상태 변경
    }).catch((err) => {
    })
  }

  // 일반로그인 후 실행되는 함수
  const handleUserInfo = (userData) => { 
    setAccessToken(userData.accessToken)
    axios.get(`${process.env.REACT_APP_SERVER}/userinfo`,
    {headers: {
      authorization: `Bearer ${userData.accessToken}`,
      "Content-Type" : "application/json"   
    },
    withCredentials: true
    }).then((res) => {
      setUserInfo(res.data.data.userinfo) // id, email, name (+ social 정보 들어갈 예정)
      setIsLogin(true) // 로그인 상태 변경
    }).catch((err) => {
    })

  }

  // 로그아웃 버튼 클릭 후 실행되는 함수 
  const handleSignOut = () => {
    axios.post(`${process.env.REACT_APP_SERVER}/signout`)
    .then((res) => {
      setIsLogin(false);
      setUserInfo(null);
      window.location.replace('/') 
    })
  }

  // 로그인 모달 오픈 상태
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 로그인 모달 오픈 상태 변경 함수
  const openModalFunc = () => {
    setIsModalOpen(!isModalOpen)
  }

  // refresh token 보내주면서 리다이렉션 함수
  useEffect(() => {    
    
    axios.get(`${process.env.REACT_APP_SERVER}/token`)
    .then((res) => {

      if(res.data.data.accessToken) {
        axios.get(`${process.env.REACT_APP_SERVER}/userinfo`,
        {headers: {
        authorization: `Bearer ${res.data.data.accessToken}`,
        "Content-Type" : "application/json"   
        },
        withCredentials: true
        })
        .then((res) => {
          setUserInfo(res.data.data.userinfo)
          setAccessToken(res.data.data.accessToken)
          setIsLogin(true) 
        })
      }
    })
  }, []);

 

  // 회원탈퇴 후 실행되는 함수
  const handleSecession = () => { 
    window.location.replace('/')  
    setIsLogin(false);
    setAccessToken(null);
    setUserInfo(null);
  }

  // 내가 업로드 한 영상 모음 객체 -> MyUploadVideo로 props 전달됨
  const [isUploadVideo, setIsUploadVideo] = useState(null)
  
  // 내가 업로드 한 영상 요청 함수 -> MyUploadVideo로 props 전달됨
  const handleUpload = () => {
    axios.get(`${process.env.REACT_APP_SERVER}/myvideo`,
    {headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type" : "application/json"   
    },
    withCredentials: true
    }).then((res) => {
      setIsUploadVideo(res.data.data.myvideos)
    }).catch((err) => {
    })
  }
  
  // 업로드 비디오 중 클릭한 영상 데이터 상태
  const [clickMyVideoData, setClickMyVideoData] = useState(null)
  //clickVideoData = id 정보임
  // 업로드 비디오 중 클릭한 영상 데이터 상태 변경 함수
  const setClickMyVideoDataFunc = (clickVideoData) => {
    setClickMyVideoData(clickVideoData)
  }

  const viewStateFunc = (id) => { // 조회수 요청 함수
      axios.post(`${process.env.REACT_APP_SERVER}/views`,{id: id},
        {
          headers: {
          authorization: `Bearer ${accessToken}`,
          "Content-Type" : "application/json"   
          },
          withCredentials: true
        }
        )
  }

  // 찜한 영상 데이터 상태
  const [isLikeVideo, setIsLikeVideo] = useState(null)

  // 찜한 영상 요청 함수
  const handleLikeVideo = () => { 
    axios.get(`${process.env.REACT_APP_SERVER}/like/video`,
    {headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type" : "application/json"   
    },
    withCredentials: true
    }).then((res) => {
      setIsLikeVideo(res.data.data.myvideos) 
    }).catch((err) => {
    })
  }


  return (
  <BrowserRouter>
    <div className="App container-fluid row-fluid p-0">
      <div className="nav-box row-fluid px-0">
        {isLogin ===false ? 
          <Nav2 openModalFunc={openModalFunc}  getSearch={getSearch} searchInfo={searchInfo} setSearchInfo={setSearchInfo} onReset={onReset}/> 
          :
          <Nav  handleSignOut={handleSignOut}  getSearch={getSearch} searchInfo={searchInfo} setSearchInfo={setSearchInfo} onReset={onReset}/>
          }
      </div>
      {
      isModalOpen === false ? null 
      : <SignIn handleAccessToken={handleAccessToken} handleUserInfo={handleUserInfo} openModalFunc={openModalFunc} /> 
      }
      <Switch>
        <Route exact path='/'>
          <div className="intro-box row-fluid px-0">
            <Introduce getSearch={getSearch} searchInfo={searchInfo} setSearchInfo={setSearchInfo}/>
          </div>
        </Route>
        <Route exact path='/main'>
          <Main category={category} setcategory={setcategory} accessToken={accessToken} searchInfo={searchInfo} setSearchInfo={setSearchInfo} setIsUploadVideo={setIsUploadVideo} setClickMyVideoDataFunc={setClickMyVideoDataFunc} />
        </Route>
        <Route exact path='/uploadvideo'>
          <UploadVideo accessToken={accessToken}/>
        </Route>
        <Route exact path='/videos'> 
          <VideoPage accessToken={accessToken} userInfo={userInfo}/>
        </Route>
        <Route exact path="/mylikevideo">
          <MyLikeVideo handleLikeVideo={handleLikeVideo} isLikeVideo={isLikeVideo} setClickMyVideoDataFunc={setClickMyVideoDataFunc}/>
        </Route>
        <Route exact path="/myuploadvideo">
        <MyUploadVideo accessToken={accessToken} isUploadVideo={isUploadVideo} setClickMyVideoDataFunc={setClickMyVideoDataFunc} handleUpload={handleUpload}/>
        </Route>
        <Route path="/myvideopage">
        <VideoPage2 clickMyVideoData={clickMyVideoData} userInfo={userInfo} accessToken={accessToken} viewStateFunc ={viewStateFunc} isLogin={isLogin}/>
        </Route>
        <Route path="/mypage">
          <MyPage userInfo={userInfo} accessToken={accessToken} handleSecession={handleSecession} handleUpload={handleUpload}/>
        </Route>
      </Switch>
        <div className="row-fluid col-12">
        </div>
    </div>     
  </BrowserRouter>
  );
}

export default App; 