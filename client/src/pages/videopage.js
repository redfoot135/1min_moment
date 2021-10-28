import React, {useState, useEffect} from 'react';
import './videopage.css'


export default function VideoPage(){


    return(
        <div className='video_page_container'>
            <video src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' width='80%' controls />
            <div className='video_info_container'>
                <div className='first_row'> 
                    <div>제목</div>
                    <div>찜버튼</div>
                </div> 
                <div className='second_row'>
                    <div>업로드날짜</div>
                    <div>작성자</div>
                    <div>삭제하기</div>
                </div>
                <div className='third_row'>
                    <div>카테고리</div>
                </div>   
               
            </div>
            <div>

            </div>
        </div>
    )
}