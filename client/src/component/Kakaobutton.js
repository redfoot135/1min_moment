import KaKaoLogin from 'react-kakao-login';
import React from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

 
const tokenId = process.env.REACT_APP_KAKAO_CLIENT_ID;

export default function Kakaobutton ({ errorMessage, openModalFunc, handleAccessToken }) {

    const history = useHistory();

    const buttonBlock = {
        background: '#fae101',
        border: 'none',
        borderRadius: '3px',
        width: '400px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      };

    const kakaoOnSuccess = (res) => {

      // 우리 서비스 서버로 post 요청하여 엑세스토큰 받아오는 함수
    	console.log(res); 

      const kakaoAccessToken = res.response.access_token
      const kakaoId = res.profile.id
         
      axios.post("https://localhost:80/socialSignin",
      {kakaoAccessToken, kakaoId},
      {"content-type":"application/json", withCredentials: true}
      ).then((data) => {
        
        handleAccessToken(data.data.accessToken)
        openModalFunc();
        history.push("/")
      })
    }

    const kakaoOnFailure = (error) => {
        console.log(error);
        errorMessage("카카오로부터 인증에 실패하셨습니다")
    }

    return (
      <div className="kakao-login-box">
      <KaKaoLogin
        token={tokenId}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
        style={buttonBlock}
      >
        <img className="kakaoLogo" src="https://i.ibb.co/BVSp3jm/ai-3-removebg-preview-1.png" />
        <span>카카오 계정으로 로그인</span>
      </KaKaoLogin>
      </div>
    );
  
}