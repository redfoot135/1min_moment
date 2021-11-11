import { BrowserRouter, Route, Switch, useHistory, Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from "axios"
import './App.css';
import SignIn from "./component/SignIn"
import MyPage from "./pages/MyPage"
import MyLikeVideo from "./pages/MyLikeVideo"
import MyUploadVideo from "./pages/MyUploadVideo"
import AWS from "aws-sdk";
import { v4 } from 'uuid';

axios.defaults.withCredentials = true;

function App() {

  const history = useHistory();

  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);


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

  const uploadFile = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file)
    console.log(process.env)
  }

  const uploadVideo = async () => {
    const S3 = new AWS.S3({
      endpoint: new AWS.Endpoint(process.env.REACT_APP_ENDPOINT),
      region: 'kr-standard',
      credentials: {
        accessKeyId: process.env.REACT_APP_ACCESSKEY,
        secretAccessKey: process.env.REACT_APP_SECRETKEY,
      },
    });

    const videoName = v4();
      await S3.putObject({
        Bucket: process.env.REACT_APP_BUCKET,
        Key: `${videoName}.mp4`,
        ACL: 'public-read',
        Body: selectedFile,
        ContentType: 'video/mp4',
      }).promise();

      const link =`${process.env.REACT_APP_ENDPOINT}/${process.env.REACT_APP_BUCKET}/${videoName}.mp4`
      console.log(link)
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
           <input type="file" onChange={uploadFile}></input>
           <button onClick={uploadVideo}>영상 업로드</button>
      </BrowserRouter>
    </div>
  );
}

export default App;
