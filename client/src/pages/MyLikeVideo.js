import React, {useState} from 'react';
import LikeVideoCard from './LikeVideoCard';
import ChannelRow from './ChannelRow'
import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined"
import "./MyLikeVideo.css"


const MyLikeVideo = () => {
    return (
        
        <div className="mylikevideo-box">
            <div className="filter-box">
                <div className="filter-box-content">
                    <TuneOutlinedIcon />
                    <h2>FILTER</h2>
                </div>
                <hr />
                <ChannelRow 
                image="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment"
                subs="100k"
                uploadVideos={382}
                description="Your quality of life will increase"
                />
            </div>
            <h2 className="mylikevideo-txt">내가 찜한 영상</h2>
            <div className="videocard-box">
                <LikeVideoCard 
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                <LikeVideoCard 
                title="1분만에 얻는 부동산 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"/>
                <LikeVideoCard 
                title="나만 아는 부동산 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"/>
                <LikeVideoCard 
                title="이것만 알면 부동산 왕!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"/>
                <LikeVideoCard 
                title="1분만에 집 사는 법!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"/>
            </div>

        </div>
    )
}

export default MyLikeVideo
