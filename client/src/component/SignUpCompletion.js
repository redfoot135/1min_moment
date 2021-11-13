import React from 'react';
import "./SignUpCompletion.css"


const SignUpCompletion = ({ signUpCompleteModalFunc, signUpInfo, openSignUpModalFunc }) => {

    const closeSignUpModalFunc = () => {
        signUpCompleteModalFunc(); // 메일 확인 모달 닫고
        openSignUpModalFunc(); // 회원가입 모달 닫는다
    }

    return (
        <div className="signup-complete-modal-box">
            <div className="signup-complete-modal">
                <div className="signup-complete-modal-contents">
                    <img className="onemin_logo" src="https://i.ibb.co/7tYjgkr/1.png" alt="로고"/>
                    <div className="signup-complete-txt">{signUpInfo.username}님 회원가입을 축하드립니다!</div>
                    <div className="signup-complete-txt">이메일 인증 후 이용하실 수 있습니다</div>
                    <button className="signup-complete-button" onClick={closeSignUpModalFunc}>1분 순삭 시작하기</button>
                </div>
            </div>
        </div>
    )
}

export default SignUpCompletion
