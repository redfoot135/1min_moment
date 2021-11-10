import React, {useState, useEffect} from 'react';
import './videopage2.css'


export default function VideoPage2({clickMyVideoData}){

    // console.log(clickMyVideoData) 

    return(
        <div className='videopage2-container'>
            <video src={clickMyVideoData.video} width='80%' controls />
            <div className='video-info-container'>
                <div className='first-row'> 
                    <div>{clickMyVideoData.title}</div>
                    <div>찜버튼</div>
                </div> 
                <div className='second-row'>
                    <div>{clickMyVideoData.createdAt}</div>
                    <div>작성자</div>
                    <div>삭제하기</div>
                </div>
                <div className='third-row'>
                    <div>{clickMyVideoData.category1}</div>
                </div>   
               
            </div>
            <div>

            </div>
        </div>
    )
}