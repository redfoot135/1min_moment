import React from 'react';
import GoogleLogin from 'react-google-login';

const clientId = "339484265555-bcmesg41g67o6ram7qsaq2o3ofu6avu3.apps.googleusercontent.com"

export default function GoogleButton(){

    const googleOnSuccess = (response) => {
    	console.log(response);
         
        // 우리 서비스 서버로 post 요청하여 엑세스토큰 받아오는 함수
    }

    const googleOnFailure = (error) => {
        console.log(error);
    }


    
    return (
       <div className="google-login-box">
         <GoogleLogin
            clientId={clientId}
            buttonText="구글 계정으로 로그인"
            // responseType={"id_token"}
            onSuccess={googleOnSuccess}
            onFailure={googleOnFailure}
         />
       </div>
    );
}




