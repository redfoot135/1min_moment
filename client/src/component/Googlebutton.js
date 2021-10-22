import React from 'react';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';

const clientId = "339484265555-bcmesg41g67o6ram7qsaq2o3ofu6avu3.apps.googleusercontent.com"

export default function GoogleButton(){
    const onSuccess = async(response) => {
    	console.log(response);
    
        // const { googleId, profileObj : { email, name } } = response;
        
        // await onSocial({
        //     socialId : googleId,
        //     socialType : 'google',
        //     email,
        //     nickname : name
        // });
    }

    const onFailure = (error) => {
        console.log(error);
    }


    
    return (
       <div className="google-login-box">
         <GoogleLogin
            clientId={clientId}
            buttonText="구글 계정으로 로그인"
            // responseType={"id_token"}
            onSuccess={onSuccess}
            onFailure={onFailure}
            style={{ border: 'none', background: 'none' }}
         />
       </div>
    );
}




