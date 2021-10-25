import KaKaoLogin from 'react-kakao-login';
import React from 'react';

const tokenId = '3a37b127322442649a53b5d283352373'

export default function Kakaobutton () {

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

    const kakaoOnSuccess = (response) => {
    	console.log(response); // 우리 서비스 서버로 post 요청하여 엑세스토큰 받아오는 함수
    }

    const kakaoOnFailure = (error) => {
        console.log(error);
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