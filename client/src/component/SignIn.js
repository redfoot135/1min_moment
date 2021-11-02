import React, {useState} from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./SignIn.css";

import Googlebutton from "./Googlebutton"
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

    const handleLogin = () => {
        const {email, password} = loginInfo
        console.log(loginInfo)

        if(email === "" || password === "") {
            setErrorMessage("이메일과 비밀번호를 입력하세요")
        } else {
            axios.post("https://localhost:80/signin",
            {email, password},
            {"content-type":"application/json", withCredentials: true}
            )
            .then((res) => {
                console.log("=====================res: ", res)
                // 여기서 이메일 인증 된 사람과 안된사람 분기해서 해야함.
                // res.data.message
                handleAccessToken(res.data.data.accessToken);
                handleUserInfo(res.data.data.payload)
                openModalFunc();
                history.push("/")
            }).catch((err) => {
                console.log(err)
                alert("잘못된 아이디거나, 비밀번호 입니다")
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
                        <Kakaobutton />
                        <Googlebutton />
                    </div>
                    <div className="loginEnd">
                        <div className="signUpLine">
                            <Link to="/signup">회원이 아니신가요?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
