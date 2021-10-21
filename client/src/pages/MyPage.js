import React, {useState} from 'react';
import { Link } from "react-router-dom";
import "./MyPage.css";
import MyInfo from "../component/MyInfo"

const MyPage = ({ openSideBarlFunc }) => {

    const [isMyInfoOpen, setIsMyInfoOpen] = useState(false)

    const openMyInfoModalFunc = () => {
        setIsMyInfoOpen(!isMyInfoOpen)
    }

    return (
    
        <div className="mypage-bar">
            <img className="onemin_logo" src="https://i.ibb.co/7tYjgkr/1.png" />
              <div className="my-info" onClick={ openMyInfoModalFunc }>내 정보 보기</div>
              {isMyInfoOpen === false ? null 
              : <MyInfo />
              }
              <Link to={"/likevedio"} style={{ textDecoration: 'none', color: "white" }} >
                  <div className="like-Vedio" onClick={ openSideBarlFunc }>내가 찜한 영상</div>
              </Link>
              <Link to={"/uploadvideo"} style={{ textDecoration: 'none', color: "white" }} >
                  <div className="upload-vedio" onClick={ openSideBarlFunc }>내가 올린 영상</div>
              </Link>
        </div>
    
    )
}

export default MyPage
