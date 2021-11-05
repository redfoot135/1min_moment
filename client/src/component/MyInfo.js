import axios from 'axios';
import React, {useState} from 'react';
import "./MyInfo.css";

const MyInfo = ({openMyInfoModalFunc, userInfo, isLogin, accessToken}) => {

    const [errorMessage, setErrorMessage] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const passwordInputValue = (e) => {
        setPassword(e.target.value)
    }

    const passwordConfirmInputValue = (e) => {
        setPasswordConfirm(e.target.value)
    }

    const [isSecessionOpen, setIsSecessionOpen] = useState(false)

    const openSecessionModalFunc = () => {
        setIsSecessionOpen(!isSecessionOpen)
    }
    
    // 회원탈퇴 함수
    const secessionFunc = () => {

      if(password === "" || passwordConfirm === "") {
          setErrorMessage("비밀번호륾 모두 입력해주세요")
      } else if(password !== passwordConfirm) {
          setErrorMessage("비밀번호가 서로 다릅니다")
      } else
        // 비밀번호 확인 요청 보내고
        axios.post("https://localhost:80/checkPW",
        {
          headers: {
          authorization: `Bearer ${res.data.data.accessToken}`,
          "Content-Type" : "application/json"   
          },
          withCredentials: true
        })
        .then((res) => {
            if(res.data.message === "비밀번호가 일치합니다") {
                axios.delete("https://localhost:80/userinfo",
                {
                headers: {
                authorization: `Bearer ${res.data.data.accessToken}`,
                "Content-Type" : "application/json"   
                },
                withCredentials: true
                })
                .then((res) => {
                    if(res.data.message === "deletion is complete") {
                        alert("회원탈퇴가 완료되었습니다")
                        isLogin(false)
                        userInfo(null)
                        accessToken(null)
                    }
                })
            }
        })
        .catch((err) => {
            setErrorMessage("해당 회원정보가 없거나 비밀번호가 서로 다릅니다")
        })
        // 맞다고 응답이 오면 axios.delete 요청을 또 보내는 것
        // 응답이 오면 상태 모두 null로 하고 리디렉션
    }


    return (
        <div className="myInfo-modalbox">
            <div className="myInfo-modal">
              <span className="close" onClick={openMyInfoModalFunc}>
                  &times;
              </span>
              <div className="myInfo-modal-content">
                  <div className="myInfo-modal-title">내 정보</div>
                  <div className="myInfo-modal-username">유저네임: {userInfo.name}</div>
                  {userInfo.email === null ? null : <div className="myInfo-modal-useremail">이메일: {userInfo.email}</div>}
                  {isSecessionOpen === false ? 
                  <div className="myInfo-modal-buttonbox">
                  <button className="myInfo-modal-editmyinfo btn">내 정보 수정하기</button>
                  <button className="myInfo-modal-secession btn" onClick={openSecessionModalFunc}>회원탈퇴</button>
                  </div> : 
                  <div className="myInfo-modal-inputbox">
                  <input className="secession-password" name="password" type="password" placeholder="비밀번호" onChange={passwordInputValue}></input>
                  <input className="secession-password confirm" name="password" type="password" placeholder="비밀번호 확인" onChange={passwordConfirmInputValue}></input>
                  { errorMessage === "" ? null 
                    : 
                    <div className="secession-password-errormessege">{errorMessage}</div>
                  }
                  <button className="myInfo-modal-secession-last btn" onClick={secessionFunc}>탈퇴하기</button>
                  </div>
                }
              </div>                      
            </div>
        </div>
    )
}

export default MyInfo
