import React from 'react'
import "./MyInfo.css";

const MyInfo = ({openMyInfoModalFunc}) => {
    return (
        <div className="myInfo-modalbox">
            <div className="myInfo-modal">
              <span className="close" onClick={openMyInfoModalFunc}>
                  &times;
              </span>
              <div>
                  모달 만들어야 하는 페이지
              </div>                      
            </div>
        </div>
    )
}

export default MyInfo
