import React from 'react'
import "./MyUploadVideo.css"
import UploadVideoCard from './UploadVideoCard';

const MyUploadVideo = () => {

    return (

    <div className="myuploadvideo-box">
        <div className="uploadvideocard-box">
            <UploadVideoCard  
            title="1분만에 얻는 생활 꿀팁!"
            views="10.5만 views"
            like="3만"
            image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
            />
            <UploadVideoCard 
            title="1분만에 얻는 부동산 꿀팁!"
            views="10.5만 views"
            like="3만"
            image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"/>
            <UploadVideoCard 
            title="나만 아는 부동산 꿀팁!"
            views="10.5만 views"
            like="3만"
            image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"/>
            <UploadVideoCard  
            title="이것만 알면 부동산 왕!"
            views="10.5만 views"
            like="3만"
            image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"/>
            <UploadVideoCard  
            title="1분만에 집 사는 법!"
            views="10.5만 views"
            like="3만"
            image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"/>
        </div>
    </div>
    )
}

export default MyUploadVideo
