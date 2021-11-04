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



axios.defaults.withCredentials = true;
function App() {

  const history = useHistory();

  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [accessToken, setAccessToken] = useState(null);


  const handleAccessToken = (tokenData) => {
    setAccessToken(tokenData)
  }

  const handleUserInfo = (userData) => {
    setIsLogin(true)
    setUserInfo(userData)
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

  return (
    <BrowserRouter>
    <div className="App">
      <div>
      {isLogin ===true ? 
        <Nav2 openModalFunc={openModalFunc} /> :
         <Nav openSideBarlFunc={openSideBarlFunc} handleSignOut={handleSignOut} />}
      </div> 
        <div>
        {
        isModalOpen === false ? null 
        : <SignIn handleAccessToken={handleAccessToken} handleUserInfo={handleUserInfo} openModalFunc={openModalFunc} /> 
        }
        {isSideBarOpen === false ? null
         : <MyPage openSideBarlFunc={openSideBarlFunc} />
         }
         {/* <MyLikeVideo /> */}
         {/* <UploadVideo /> */}
       <Slider/>
       <Main/>
       <UploadVideo />
       <VideoPage/>
       <Switch>
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
