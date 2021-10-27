import { BrowserRouter, Route, Switch, useHistory, Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from "axios"
import './App.css';
import SignIn from "./component/SignIn"
import MyPage from "./pages/MyPage"
import MyLikeVideo from "./pages/MyLikeVideo"
import MyUploadVideo from "./pages/MyUploadVideo"

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

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModalFunc = () => {
    setIsModalOpen(!isModalOpen)
  }

  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  const openSideBarlFunc = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }

  return (
    
    <div className="App">
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
