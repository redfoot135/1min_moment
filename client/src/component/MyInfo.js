import React from 'react'
import "./MyInfo.css";

const MyInfo = ({openMyInfoModalFunc}) => {

    return (
        <div className="myInfo-modalbox">
            <div className="myInfo-modal">
              <span className="close" onClick={openMyInfoModalFunc}>
                  &times;
              </span>
              <div className="myInfo-modal-content">
                  <div className="myInfo-modal-title">내 정보</div>
                  <button className="myInfo-modal-editmyinfo">내 정보 수정하기</button>
                  <button className="myInfo-modal-secession">회원탈퇴</button>
              </div>                      
            </div>
        </div>
    )
}

export default MyInfo
