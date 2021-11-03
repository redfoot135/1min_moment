import React, {useState} from 'react';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import "./SignUp.css"
import SignUpCompletion from "./SignUpCompletion"

axios.defaults.withCredentials = true;

const SignUp = ({ openSignUpModalFunc }) => {

    const history = useHistory();

    const [ errorMessage, setErrorMessage ] = useState('') 
    const [ signUpInfo, setSignUpInfo ] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleInputValue = (key) => (e) => {
        setSignUpInfo({ ...signUpInfo, [key]: e.target.value })
    }

    const [passwordConfirm, setPasswordConfirm] = useState('')

    const passwordInputValue = (e) => {
        setPasswordConfirm(e.target.value)
    }

    const [ signUpComplete, setSignUpComplete ] = useState(false) // 회원가입 성공 모달창 띄우기 위한 상태!

    const signUpCompleteModalFunc = () => { // 회원가입 성공 모달창 띄우기 위한 상태 변경 함수!
        setSignUpComplete(!signUpComplete)
    }


    const handleLogout = () => {
        const {username, email, password} = signUpInfo

        if(username === "" || email === "" || password === "") {
            setErrorMessage("유저네임과 이메일, 비밀번호를 모두 입력하세요")
        } else if(password !== passwordConfirm) {
            setErrorMessage("비밀번호가 서로 다릅니다")
        }else {
            axios.post("https://localhost:80/signup",
            {username, email, password},
            {"content-type":"application/json", withCredentials: true}
            )
            .then((res) => {
                
                // 토큰 저장

                // 회원가입 모달창 닫음
                openSignUpModalFunc();

                //회원가입 성공 모달창 띄우기
                signUpCompleteModalFunc();
                
            }).catch((err) => {
                console.log(err)
                alert("잘못된 아이디거나, 비밀번호 입니다")
            })
        }
    }

    return (
        <div className="signup-modal-box">
            <div className="signup-modal">
                <span className="signup-modal-close" onClick={openSignUpModalFunc}>
                    &times;
                </span>
                <div className="signup-modal-contents">
                    <img className="onemin_logo" src="https://i.ibb.co/7tYjgkr/1.png" />
                    <input className="signup-username" name="email" type="username" placeholder="유저네임" onChange={handleInputValue("username")} ></input>
                    <input className="signup-email" name="email" type="email" placeholder="이메일" onChange={handleInputValue("email")} ></input>
                    <input className="signup-password" name="password" type="password" placeholder="비밀번호" onChange={handleInputValue("password")} ></input>
                    <input className="signup-password confirm" name="password" type="password" placeholder="비밀번호 확인" onChange={passwordInputValue} ></input>
                    <button className="signup-button" onClick={handleLogout}>회원가입</button>
                    {errorMessage === "" ? null 
                    : 
                    <div className="errorMessege">{errorMessage}</div>
                    }
                    {signUpComplete === true ?  null 
                    : 
                    <SignUpCompletion signUpCompleteModalFunc={signUpCompleteModalFunc} signUpInfo={signUpInfo} />
                    }
                </div>
            </div>
        </div>
    )
}

export default SignUp
