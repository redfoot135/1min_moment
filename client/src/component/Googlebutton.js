import React from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import GoogleLogin from 'react-google-login';


const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export default function GoogleButton({ errorMessage, openModalFunc, handleAccessToken }){

    const history = useHistory();

      const googleOnSuccess = (res) => {

        const token = res.accessToken
        const id = res.googleId
        const username = res.profileObj.name
        console.log(token)
        console.log(id)
        console.log(username)
         
        axios.post(`${process.env.REACT_APP_SERVER}/socialSignin`,
        {token, id, username},
        {"content-type":"application/json", withCredentials: true}
        ).then((res) => {
           if(res.data.data.accessToken) {
               handleAccessToken(res.data.data.accessToken) 
               openModalFunc();
               history.push("/")
             }
        })
      }

    const googleOnFailure = (error) => {
        errorMessage("구글로부터 인증에 실패하셨습니다")
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




