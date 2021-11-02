import React, {useState} from 'react';
import "./SignUpCompletion.css"


const SignUpCompletion = ({ signUpCompleteModalFunc, signUpInfo }) => {
    return (
        <div className="signup-complete-modal-box">
            <div className="signup-complete-modal">
                <div className="signup-complete-modal-contents">
                    <img className="onemin_logo" src="https://i.ibb.co/7tYjgkr/1.png" />
                    <div className="signup-complete-txt">님 회원가입을 축하드립니다!</div>
                    <button className="signup-complete-button" onClick={signUpCompleteModalFunc}>1분 순삭 시작하기</button>
                </div>
            </div>
        </div>
    )
}

export default SignUpCompletion
