import React, {useState} from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./SignIn.css";

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

        if(email === "" || password === "") {
            setErrorMessage("이메일과 비밀번호를 입력하세요")
        } else {
            axios.post("https://localhost:4000/signin",
            {email, password},
            {"content-type":"application/json", withCredentials: true}
            )
            .then((res) => {
                handleAccessToken(res.data.data.accessToken);
                handleUserInfo(res.data.data.payload)
                // handleUserInfo(res.data.data.payload) // 이번에도 signin 요청의 응답에서 payload안에 userInfo가 담겨 오는지(?) 
                openModalFunc();
                history.push("/")
            }).catch((err) => {
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
                        <div className="kakao">
                            <img className="kakaoLogo" src="https://i.ibb.co/BVSp3jm/ai-3-removebg-preview-1.png" />
                            <div className="kakaoText">카카오 계정으로 신규가입</div>
                        </div>
                        <div className="google">
                            <img className="googleLogo" src="https://i.ibb.co/zQhDSnq/google-logo.png" />
                            <div className="googleText">구글 계정으로 신규가입</div>
                        </div>
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
