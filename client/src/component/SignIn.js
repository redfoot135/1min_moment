import React, {useState} from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./SignIn.css";
import SignUp from "./SignUp";
import Googlebutton from "./Googlebutton";
import Kakaobutton from './Kakaobutton';

axios.defaults.withCredentials = true;

export default function SignIn ({ handleAccessToken, handleUserInfo, openModalFunc}) {

    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState('')
    const [ loginInfo, setLoginInfo ] = useState({
        email: "",
        password: ""
    })

    const handleInputValue = (key) => (e) => {
        setLoginInfo({ ...loginInfo, [key]: e.target.value })
    }
    
    const [openSignUpModal, setOpenSignUpModal] = useState(false)

    const openSignUpModalFunc = () => {
        setOpenSignUpModal(!openSignUpModal)
      }

    const handleLogin = () => {
        const {email, password} = loginInfo

        if(email === "" || password === "") {
            setErrorMessage("이메일과 비밀번호를 입력하세요")
        } else {
            axios.post("https://localhost:80/signin",
            {email, password},
            {"content-type":"application/json", withCredentials: true}
            )
            .then((res) => {
                console.log(res)
                if(res.data.message === "Information passed") { // 이메일 인증된 사람
                    console.log(res.cookies)
                    handleUserInfo(res.data.data)
                    openModalFunc();
                    history.push("/")
                } else if(res.data.message === "이메일 인증 해주세요"){ // 이메일 인증 안된 사람
                    setErrorMessage("이메일 인증 후 이용해주시기 바랍니다")
                }
            }).catch((err) => {
                console.log(err)
                if(err.response.data.message === "Please proceed with the verification process") {
                    setErrorMessage("이메일 인증 후 이용해주시기 바랍니다")
                } else {
                    setErrorMessage("이메일 또는 비밀번호를 잘못 입력되었습니다")
                }
            })
        }
    }


    return (
        
        <div className="modal">
            <div className="loginModal">
                <span className="close" onClick={openModalFunc}>
                    &times;
                </span>
                <div className="modalContents">
                    <img className="onemin_logo" src="https://i.ibb.co/7tYjgkr/1.png" />
                    <input className="loginEmail" name="email" type="email" placeholder="이메일" onChange={handleInputValue("email")} ></input>
                    <input className="loginPassword" name="password" type="password" placeholder="비밀번호" onChange={handleInputValue("password")} ></input>
                    <button className="loginBtn" onClick={handleLogin}>로그인</button>
                    {errorMessage === "" ? null 
                    : 
                    <div className="errorMessege">{errorMessage}</div>
                    }
                    <div className="socialBox">
                        <Kakaobutton errorMessage={errorMessage} openModalFunc={openModalFunc} handleAccessToken={handleAccessToken} />
                        <Googlebutton errorMessage={errorMessage} openModalFunc={openModalFunc} handleAccessToken={handleAccessToken} />
                    </div>
                    <div className="loginEnd">
                        <div className="loginLine" onClick={openSignUpModalFunc}>
                            회원이 아니신가요?
                        </div>
                        {
                         openSignUpModal === false ? null 
                         : <SignUp openSignUpModalFunc={openSignUpModalFunc}/> 
                        }
                    </div>
                </div>
            </div>
        </div>
        
    )
}