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
import UploadVideo from './pages/uploadVideo'
import Loading from './pages/Loading'
import SlidesContainer from './pages/slidesContainer'


axios.defaults.withCredentials = true;
function App() {
  
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [videoInfo, setVideoInfo] = useState({
    image:'',
    title:'',
    channel:'',
    views:'',
    timestamp:'',
    video:'',
    video_id:''
});
  
  
const getvideoInfo = (image,title, views, timestamp,video,video_id) => {
  
  console.log('hi!!!!!')
  setVideoInfo({
      image:image,
      title:title,
      views:views,
      timestamp:timestamp,
      video:video,
      video_id:video_id
  })
  console.log(videoInfo)
}

  const handleAccessToken = (tokenData) => { // 소셜로그인 후 함수
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


  const handleUserInfo = (userData) => { // 일반로그인 후 함수
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

  const handleSignOut = () => {
    axios.post("https://localhost:80/signout")
    .then((res) => {
      setIsLogin(false);
      setUserInfo(null);
      window.location.replace('/') 
      // alert("로그아웃을 완료했습니다")
    })
  }

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModalFunc = () => {
    setIsModalOpen(!isModalOpen)
    console.log(isModalOpen)
  }

  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  const openSideBarlFunc = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }

  useEffect(() => {    // refresh token 보내주는 함수
    //setIsLoading(true);
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

  const handleSecession = () => { // 회원탈퇴 후 실행되는 함수
    window.location.replace('/')  
    setIsLogin(false);
    setAccessToken(null);
    setUserInfo(null);
  }

  return (
    <BrowserRouter>
    <div className="App">
      <div>

      {isLogin ===false ? 

        <Nav2 openModalFunc={openModalFunc} /> :
         <Nav openSideBarlFunc={openSideBarlFunc} handleSignOut={handleSignOut} />}

      </div> 
        <div>
        {
        isModalOpen ===true ? null 
        : <SignIn handleAccessToken={handleAccessToken} handleUserInfo={handleUserInfo} openModalFunc={openModalFunc} /> 
        }
        {isSideBarOpen === false ? null
         : <MyPage openSideBarlFunc={openSideBarlFunc} userInfo={userInfo} accessToken={accessToken} handleSecession={handleSecession} />
         }
         {/* <MyLikeVideo /> */}
         
       <SlidesContainer getvideoInfo={getvideoInfo}/>
       
       {/* <Main/> */}
       <UploadVideo accessToken={accessToken}/>
       {/* <VideoPage/> */}
       
       <Switch>
           <Route path="/videos"><VideoPage videoInfo={videoInfo} accessToken={accessToken}/></Route>
           <Route path="/mylikevideo"><MyLikeVideo /></Route>
           <Route path="/myuploadvideo"><MyUploadVideo /></Route>
        </Switch>
       </div>
       {/* <BrowserRouter>
         <header className="App-header" onClick={openModalFunc}>
           로그인
         </header>
         {isModalOpen === false ? null 
         : <SignIn handleAccessToken={handleAccessToken} handleUserInfo={handleUserInfo} openModalFunc={openModalFunc} /> 
         }
         <div className-="mypage-txt" onClick={openSideBarlFunc}>마이페이지</div>
         {isSideBarOpen === false ? null
         : <MyPage openSideBarlFunc={openSideBarlFunc} />
         }
         <Switch>
           <Route path="/mylikevideo"><MyLikeVideo /></Route>
           <Route path="/myuploadvideo"><MyUploadVideo /></Route>
         </Switch>
      </BrowserRouter>  */}
    </div>
    </BrowserRouter>
  );
}

export default App;