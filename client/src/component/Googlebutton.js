
// import dotenv from "dotenv";
// dotenv.config(); 
// import React from 'react';
// import { useHistory } from "react-router-dom";
// import axios from 'axios';
// import GoogleLogin from 'react-google-login';


// const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

// export default function GoogleButton({ errorMessage, openModalFunc, handleAccessToken }){

//     const history = useHistory();

//     const googleOnSuccess = (res) => {

//         // 우리 서비스 서버로 post 요청하여 엑세스토큰 받아오는 함수
//     	console.log(res);

//         const googleAccessToken = res.accessToken
//         const googleId = res.googleId
         
//         axios.post("https://localhost:80/socialSignin",
//         {googleAccessToken, googleId},
//         {"content-type":"application/json", withCredentials: true}
//         ).then((data) => {

//           handleAccessToken(data.data.accessToken) 
//           openModalFunc();
//           history.push("/")
//         })
//     }

//     const googleOnFailure = (error) => {
//         console.log(error);
//         errorMessage("구글로부터 인증에 실패하셨습니다")
//     }


    
//     return (
//        <div className="google-login-box">
//          <GoogleLogin
//             clientId={clientId}
//             buttonText="구글 계정으로 로그인"
//             // responseType={"id_token"}
//             onSuccess={googleOnSuccess}
//             onFailure={googleOnFailure}
//          />
//        </div>
//     );
// }




