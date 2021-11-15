import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from "axios"
import './App.css';
import SignIn from "./component/SignIn"
import MyPage from "./pages/MyPage"
import MyLikeVideo from "./pages/MyLikeVideo"
import MyUploadVideo from "./pages/MyUploadVideo"
import Nav from './component/nav'
import Nav2 from './component/nav2'
// import Slider from './component/slider'
import Main from './component/main'
import VideoPage from './pages/videopage'
import VideoPage2 from './pages/videopage2'
import UploadVideo from './pages/uploadVideo'
import Loading from './pages/Loading'
import Introduce from './component/Introduce'
 import SlidesContainer from './pages/slidesContainer'
import Footer from './component/Footer'

axios.defaults.withCredentials = true;
function App() {
  
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [category, setcategory] = useState(null);
  const [searchInfo, setSearchInfo] = useState('');
  const [videoInfo, setVideoInfo] = useState({
    image:'',
    title:'',
    channel:'',
    views:'',
    timestamp:'',
    video:'',
    video_id:'',
    category1:'',
    category2:'',
    category3:''
});

const getSearch= (search) =>{
  setSearchInfo(search)
  console.log(searchInfo)
  console.log('hi!!!!!')
  
 } 
 const getCategory= (category) =>{
  setcategory(category)
  console.log(category)
  console.log('hi!!!!!')
 } 
  
const getvideoInfo = (image,title, views, timestamp,video,video_id,category1,category2,category3) => {
  
  console.log('hi!!!!!')
  setVideoInfo({
      image:image,
      title:title,
      views:views,
      timestamp:timestamp,
      video:video,
      video_id:video_id,
      category1:category1,
      category2:category2,
      category3:category3
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
 
  // 내가 업로드 한 영상 요청 함수 -> MyUploadVideo로 props 전달됨
  const handleUpload = () => {
    axios.get("https://localhost:80/myvideo",
    {headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type" : "application/json"   
    },
    withCredentials: true
    }).then((res) => {
      console.log(res)
      setIsUploadVideo(res.data.data.myvideos)
    }).catch((err) => {
      console.log(err)
    })
  }
  
  // 업로드 비디오 중 클릭한 영상 데이터 상태
  const [clickMyVideoData, setClickMyVideoData] = useState(null)
  console.log(clickMyVideoData)
  // 업로드 비디오 중 클릭한 영상 데이터 상태 변경 함수
  const setClickMyVideoDataFunc = (clickVideoData) => {
    setClickMyVideoData(isUploadVideo.filter((el) => el.id === clickVideoData)[0])
  }

  const viewStateFunc = (id) => { // 조회수 요청 함수
      axios.post("https://localhost:80/views",{id: id},
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
  console.log(isLikeVideo)

  // 찜한 영상 요청 함수
  const handleLikeVideo = () => { 
    axios.get("https://localhost:80/like/video",
    {headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type" : "application/json"   
    },
    withCredentials: true
    }).then((res) => {
      console.log(res.data) // res 영상 데이터 형식이 아리까리(?)
      setIsLikeVideo(res.data.data.likeVideos) 
    }).catch((err) => {
      console.log(err)
    })
  }

  // 찜한 비디오 중 클릭한 영상 데이터 상태
  const [clickMyLikeVideoData, setClickMyLikeVideoData] = useState(null)

  // 찜한 비디오 중 클릭한 영상 데이터 상태 변경 함수
  const clickMyLikeVideoDataFunc = (clickLikeVideoData) => {
    setClickMyLikeVideoData(isLikeVideo.filter((el) => el.id === clickLikeVideoData)[0])
  }

  return (
    <BrowserRouter>
    <div className="App container-fluid row-fluid p-0">
      <div className="nav-box row-fluid px-0">
        {isLogin ===false ? 

          <Nav2 openModalFunc={openModalFunc}  getSearch={getSearch} searchInfo={searchInfo}/> :
          <Nav  handleSignOut={handleSignOut}  getSearch={getSearch} searchInfo={searchInfo}/>}

      </div>
      {
      isModalOpen ===false ? null 
      : <SignIn handleAccessToken={handleAccessToken} handleUserInfo={handleUserInfo} openModalFunc={openModalFunc} /> 
      }
      <Switch>
        <Route exact path='/'>
          <div className="intro-box row-fluid px-0">
            <Introduce />
            
          </div>
          {/* <div className="row-fluid px-0">
          <SlidesContainer getvideoInfo={getvideoInfo} getCategory={getCategory}/>
          </div> */}
        </Route>
        <Route exact path='/main'>
          <Main category={category} searchInfo={searchInfo}  getvideoInfo={getvideoInfo} setSearchInfo={setSearchInfo} setIsUploadVideo={setIsUploadVideo} setClickMyVideoDataFunc={setClickMyVideoDataFunc} />
        </Route>
        <Route exact path='/uploadvideo'>
          <UploadVideo accessToken={accessToken}/>
        </Route>
        <Route exact path='/videos'> 
          <VideoPage videoInfo={videoInfo} accessToken={accessToken} userInfo={userInfo}/>
        </Route>
        <Route exact path="/mylikevideo">
          <MyLikeVideo handleLikeVideo={handleLikeVideo} isLikeVideo={isLikeVideo} clickMyLikeVideoDataFunc={clickMyLikeVideoDataFunc}/>
        </Route>
        <Route exact path="/myuploadvideo">
        <MyUploadVideo accessToken={accessToken} isUploadVideo={isUploadVideo} setClickMyVideoDataFunc={setClickMyVideoDataFunc}/>
        </Route>
        <Route path="/myvideopage">
        <VideoPage2 clickMyVideoData={clickMyVideoData} userInfo={userInfo} accessToken={accessToken} viewStateFunc ={viewStateFunc} isLogin={isLogin} videoInfo={videoInfo}/>
        </Route>
        <Route path="/mypage">
          <MyPage userInfo={userInfo} accessToken={accessToken} handleSecession={handleSecession} handleUpload={handleUpload}/>
        </Route>
      </Switch>
        <div className="row-fluid col-12">
          {/* <Footer /> */}
        </div>

   
    {/* <Main/> */}
    {/* <UploadVideo accessToken={accessToken}/> */}
    {/* <VideoPage/> */}
    
    {/* <Switch>
    
        <Route path="/mylikevideo"><MyLikeVideo /></Route>
        <Route path="/myuploadvideo"><MyUploadVideo /></Route>
    </Switch> */}

      </div> 
      <div>

         

       
       
       {/* <Main/> */}
       {/* <UploadVideo accessToken={accessToken}/> */}
       {/* <VideoPage/> */}
       
       {/* <Switch>
           <Route path="/videos"><VideoPage videoInfo={videoInfo} accessToken={accessToken}/></Route>
           <Route path="/mylikevideo"><MyLikeVideo /></Route>
           <Route path="/myuploadvideo"><MyUploadVideo accessToken={accessToken} isUploadVideo={isUploadVideo} setClickMyVideoDataFunc={setClickMyVideoDataFunc}/></Route>
        </Switch> */}
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
    {/* </div> */}

    </BrowserRouter>
  );
}

export default App; 