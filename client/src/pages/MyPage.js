import React, {useState} from 'react';
import { Link } from "react-router-dom";
import "./MyPage.css";
import MyPageList from "./MyPageList"

const MyPage = ({ openSideBarlFunc }) => {

    const lists = [
        {name: "내 정보 보기", path: "/myinfo"},
        {name: "내가 찜한 영상", path: "/myvedio"},
        {name: "내가 올린 영상", path: "/myupload"}
    ]

    return (
    
        <div className="mypage-Bar">
            <img className="onemin_logo" src="https://i.ibb.co/7tYjgkr/1.png" />
            {lists.map((list, index) => {
                return (
                    <Link to={list.path} key={index} style={{ textDecoration: 'none', color: "white" }} >
                        <MyPageList list={list} openSideBarlFunc={openSideBarlFunc} />
                    </Link>
                )
            })}
        </div>
    
    )
}

export default MyPage
