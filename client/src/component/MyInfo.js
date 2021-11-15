import axios from 'axios';
import React, {useState} from 'react';
import "./MyInfo.css";

const MyInfo = ({openMyInfoModalFunc, userInfo, accessToken, handleSecession}) => {

    // console.log(accessToken)

    const [errorMessage, setErrorMessage] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [password2, setPassword2] = useState('')
    const [passwordConfirm2, setPasswordConfirm2] = useState('')


    const passwordInputValue = (e) => {
        setPassword(e.target.value)
    }

    const passwordConfirmInputValue = (e) => {
        setPasswordConfirm(e.target.value)
    }

    const passwordInputValue2 = (e) => {
        setPassword2(e.target.value)
    }

    const passwordConfirmInputValue2 = (e) => {
        setPasswordConfirm2(e.target.value)
    }

    const [isSecessionOpen, setIsSecessionOpen] = useState(false)
    const [isModifiedOpen, setIsModifiedOpen] = useState(false)
    const [isModifiedOpen2, setIsModifiedOpen2] = useState(false)

    const openSecessionModalFunc = () => {
        setIsSecessionOpen(!isSecessionOpen)
    }

    const openModifiedModalFunc = () => {
        setIsModifiedOpen(!isModifiedOpen)
    }
    
    // 회원탈퇴 함수
    const secessionFunc = () => {

      if(password === "" || passwordConfirm === "") {
          setErrorMessage("비밀번호를 모두 입력해주세요")
      } else if(password !== passwordConfirm) {
          setErrorMessage("비밀번호가 서로 다릅니다")
      } else
        // 비밀번호 확인 요청 보내고
        axios.post(`${process.env.REACT_APP_SERVER}/checkPW`,{password: password},
        {
          headers: {
          authorization: `Bearer ${accessToken}`,
          "Content-Type" : "application/json"   
          },
          withCredentials: true
        })
        .then((res) => {
            if(res.data.message === "비밀번호가 일치합니다") {
                axios.delete(`${process.env.REACT_APP_SERVER}/userinfo`,
                {
                headers: {
                authorization: `Bearer ${accessToken}`,
                "Content-Type" : "application/json"   
                },
                withCredentials: true
                })
                .then((res) => {
                    // console.log("userinfo: ", res)
                    if(res.data.message === "deletion is complete") {
                        alert("회원탈퇴가 완료되었습니다")
                        handleSecession();
                    }
                })
            }
        })
        .catch((err) => {
            setErrorMessage("해당 회원정보가 없거나 비밀번호가 서로 다릅니다")
        })
    }

    // 비밀번호 변경 위한 post/ checkPW 요청 함수
    const modifiedFunc = () => {

        if(password === "" || passwordConfirm === "") {
            setErrorMessage("비밀번호를 모두 입력해주세요")
        } else if(password !== passwordConfirm) {
            setErrorMessage("비밀번호가 서로 다릅니다")
        } else
          // 비밀번호 확인 요청 보내고
          axios.post(`${process.env.REACT_APP_SERVER}/checkPW`,{password: password},
          {
            headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type" : "application/json"   
            },
            withCredentials: true
          })
          .then((res) => {
              if(res.data.message === "비밀번호가 일치합니다") {
                setIsModifiedOpen2(true)
                setPassword("")
                setPasswordConfirm("")
              }
          })
          .catch((err) => {
              setErrorMessage("해당 회원정보가 없거나 비밀번호가 서로 다릅니다")
              setPassword("")
              setPasswordConfirm("")
          })
      }

      // 비밀번호 변경 위한 put/ userinfo 요청 함수
    const modifiedFunc2 = () => {

        if(password2 === "" || passwordConfirm2 === "") {
            setErrorMessage("비밀번호를 모두 입력해주세요")
        } else if(password2 !== passwordConfirm2) {
            setErrorMessage("비밀번호가 서로 다릅니다")
        } else
          // 비밀번호 변경 요청 보내고
          axios.put(`${process.env.REACT_APP_SERVER}/userinfo`,{password: password2},
          {
            headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type" : "application/json"   
            },
            withCredentials: true
          })
          .then((res) => {
              if(res.data.message === "It is changed") {
                window.location.replace('/')
              }
          })
          .catch((err) => {
              setErrorMessage("소셜로그인은 비밀번호 변경이 불가합니다")
              setPassword2("")
              setPasswordConfirm2("")
          })
      }


    return (
        <div className="myInfo-modalbox">
            <div className="myInfo-modal">
              <span className="close" onClick={openMyInfoModalFunc}>
                  &times;
              </span>
              <div className="myInfo-modal-content">
                  <div className="myInfo-modal-title">내 정보</div>
                  <div className="myInfo-modal-username">{userInfo.name}</div>
                  {userInfo.email === null ? null : <div className="myInfo-modal-useremail">{userInfo.email}</div>}
                  {isModifiedOpen === false ? 
                  <div className="myInfo-modal-buttonbox">
                  <button className="myInfo-modal-editmyinfo btn" onClick={openModifiedModalFunc}>비밀번호 변경하기</button>
                  </div> : 
                  isModifiedOpen2 === false ? 
                  <div className="myInfo-modal-inputbox">
                  <input className="current-password" name="password" type="password" placeholder="현재 비밀번호" onChange={passwordInputValue}></input>
                  <input className="current-password confirm" name="password" type="password" placeholder="현재 비밀번호 확인" onChange={passwordConfirmInputValue}></input>
                  { errorMessage === "" ? null 
                    : 
                    <div className="password-errormessege errorMessege2">{errorMessage}</div>
                  }
                  <button className="myInfo-modal-secession-last btn" onClick={modifiedFunc}>비밀번호 변경하기</button>
                  </div>
                  :
                  <div className="myInfo-modal-inputbox">
                  <input className="modified-password" name="password" value={password2} type="password" placeholder="변경 비밀번호"onChange={passwordInputValue2} ></input>
                  <input className="modified-password confirm" name="password" value={passwordConfirm2} type="password" placeholder="변경 비밀번호 확인" onChange={passwordConfirmInputValue2}></input>
                  { errorMessage === "" ? null 
                    : 
                    <div className="password-errormessege errorMessege2">{errorMessage}</div>
                  }
                  <button className="myInfo-modal-secession-last btn" onClick={modifiedFunc2} >비밀번호 변경하기</button>
                  </div>
                }
                
                {isSecessionOpen === false ? 
                  <div className="myInfo-modal-buttonbox">
                  <button className="myInfo-modal-secession btn" onClick={openSecessionModalFunc}>회원탈퇴</button>
                  </div> : 
                  <div className="myInfo-modal-inputbox">
                  <input className="current-password" name="password" type="password" placeholder="비밀번호" onChange={passwordInputValue}></input>
                  <input className="currentn-password confirm" name="password" type="password" placeholder="비밀번호 확인" onChange={passwordConfirmInputValue}></input>
                  { errorMessage === "" ? null 
                    : 
                    <div className="password-errormessege errorMessege2">{errorMessage}</div>
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
