import { BrowserRouter, Route, Switch, useHistory, Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from "axios"
import './App.css';
import SignIn from "./component/SignIn"
import MyPage from "./pages/MyPage"
import MyLikeVideo from "./pages/MyLikeVideo"
import MyUploadVideo from "./pages/MyUploadVideo"
import Nav from './component/nav'
import Nav2 from './component/nav2'
import Slider from './component/slider'
import Main from './component/main'
import VideoPage from './pages/videopage'
import VideoPage2 from './pages/videopage2'
import UploadVideo from './pages/uploadVideo'
import Loading from './pages/Loading'



axios.defaults.withCredentials = true;
function App() {

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  // 소셜로그인 후 실행되는 함수
  const handleAccessToken = (tokenData) => { 
    setAccessToken(tokenData) 

    axios.get("https://localhost:80/userinfo",
    {headers: {
      authorization: `Bearer ${tokenData}`,
      "Content-Type" : "application/json"   
    },
    withCredentials: true
    }).then((res) => {
      setUserInfo(res.data.data.userinfo) // id, email, name (+ social 정보 들어갈 예정)
      setIsLogin(true) // 로그인 상태 변경
    }).catch((err) => {
      console.log(err)
    })
  }

  // 일반로그인 후 실행되는 함수
  const handleUserInfo = (userData) => { 
    setAccessToken(userData.accessToken)
    axios.get("https://localhost:80/userinfo",
    {headers: {
      authorization: `Bearer ${userData.accessToken}`,
      "Content-Type" : "application/json"   
    },
    withCredentials: true
    }).then((res) => {
      setUserInfo(res.data.data.userinfo) // id, email, name (+ social 정보 들어갈 예정)
      setIsLogin(true) // 로그인 상태 변경
    }).catch((err) => {
      console.log(err)
    })

  }

  // 로그아웃 버튼 클릭 후 실행되는 함수 
  const handleSignOut = () => {
    axios.post("https://localhost:80/signout")
    .then((res) => {
      setIsLogin(false);
      setUserInfo(null);
      window.location.replace('/') 
      // alert("로그아웃을 완료했습니다")
    })
  }

  // 로그인 모달 오픈 상태
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 로그인 모달 오픈 상태 변경 함수
  const openModalFunc = () => {
    setIsModalOpen(!isModalOpen)
    console.log(isModalOpen)
  }

  // 사이드바 모달 오픈 상태
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  // 사이드바 모달 오픈 상태 변경 함수
  const openSideBarlFunc = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }

  // refresh token 보내주면서 리다이렉션 함수
  useEffect(() => {    
    
    axios.get("https://localhost:80/token")
    .then((res) => {

      if(res.data.data.accessToken) {
        axios.get("https://localhost:80/userinfo",
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
  console.log(isUploadVideo)
 
  // 내가 업로드 한 영상 요청 함수 -> MyUploadVideo로 props 전달됨
  const handleUpload = () => {
    axios.get("https://localhost:80/myvideo",
    {headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type" : "application/json"   
    },
    withCredentials: true
    }).then((res) => {
      setIsUploadVideo(res.data.data.myvideos)
    }).catch((err) => {
      console.log(err)
    })
  }
  
  // 업로드 비디오 중 클릭한 영상 데이터 상태
  const [clickMyVideoData, setClickMyVideoData] = useState(null)

  // 업로드 비디오 중 클릭한 영상 데이터 상태 변경 함수
  const setClickMyVideoDataFunc = (clickVideoData) => {
    setClickMyVideoData(isUploadVideo.filter((el) => el.id === clickVideoData)[0])
  }


  return (
    <BrowserRouter>
    <div className="App">
      <div>
       {isLogin ===false ? 
         <Nav2 openModalFunc={openModalFunc} /> :
         <Nav openSideBarlFunc={openSideBarlFunc} handleSignOut={handleSignOut} />
       }
      </div> 
      <div>
        {
        isModalOpen ===true ? null 
        : <SignIn handleAccessToken={handleAccessToken} handleUserInfo={handleUserInfo} openModalFunc={openModalFunc} /> 
        }
        {isSideBarOpen === false ? null
         : <MyPage openSideBarlFunc={openSideBarlFunc} userInfo={userInfo} accessToken={accessToken} handleSecession={handleSecession} handleUpload={handleUpload} />
         }
         
       {/* <Slider/>
       <Main/>
       <UploadVideo accessToken={accessToken}/>
       <VideoPage/> */}
       
        <Switch>
           <Route path="/myvideopage"><VideoPage2 clickMyVideoData={clickMyVideoData} userInfo={userInfo} accessToken={accessToken} /></Route>
           <Route path="/mylikevideo"><MyLikeVideo /></Route>
           <Route path="/myuploadvideo"><MyUploadVideo accessToken={accessToken} isUploadVideo={isUploadVideo} setClickMyVideoDataFunc={setClickMyVideoDataFunc}/></Route>
        </Switch>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;