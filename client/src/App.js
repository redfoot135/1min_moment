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
import Introduce from './component/Introduce'


axios.defaults.withCredentials = true;
function App() {

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  
  

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
    <div className="App container-fluid p-0">
    <div className="row-fluid px-0">
      {isLogin ===false ? 
        <Nav2 openModalFunc={openModalFunc} /> :
         <Nav openSideBarlFunc={openSideBarlFunc} handleSignOut={handleSignOut} />}
    </div>
    {
    isModalOpen ===true ? null 
    : <SignIn handleAccessToken={handleAccessToken} handleUserInfo={handleUserInfo} openModalFunc={openModalFunc} /> 
    }
    {isSideBarOpen === false ? null
      : <MyPage openSideBarlFunc={openSideBarlFunc} userInfo={userInfo} accessToken={accessToken} handleSecession={handleSecession} />
      }
      {/* <MyLikeVideo /> */}

      
      <Switch>
        <Route exact path='/'>
          <div className="row-fluid px-0">
            <Introduce />
          </div>
          <div className="row-fluid px-0">
            <Slider/>
          </div>
          <Slider/>
        </Route>
        <Route exact path='/main'>
          <Main/>
        </Route>
        <Route exact path='/uploadvideo'>
          <UploadVideo accessToken={accessToken}/>
        </Route>
        <Route exact path='/videopage'> 
          <VideoPage/>
        </Route>
        <Route exact path="/mylikevideo">
          <MyLikeVideo />
        </Route>
        <Route exact path="/myuploadvideo">
          <MyUploadVideo />
        </Route>
      </Switch>
    



    {/* <Main/> */}
    {/* <UploadVideo accessToken={accessToken}/> */}
    {/* <VideoPage/> */}
    
    {/* <Switch>
    
        <Route path="/mylikevideo"><MyLikeVideo /></Route>
        <Route path="/myuploadvideo"><MyUploadVideo /></Route>
    </Switch> */}

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