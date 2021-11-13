import React from 'react'
import "./Introduce.css"
import { Carousel } from "react-bootstrap"

const Introduce = () => {
  let img1 = 'https://cdn.pixabay.com/photo/2019/06/08/21/32/castle-4261029__480.jpg'
  let img2 = 'https://cdn.pixabay.com/photo/2021/09/23/09/01/swan-6649194__480.jpg'
  let img3 = 'https://cdn.pixabay.com/photo/2021/07/30/08/21/street-6509043_1280.jpg'

  return (
      <>
        <img className="introduce1 col-11 col-md-9" src="https://i.ibb.co/x3XftJr/001.png"/>
        <img className="introduce col-11 col-md-9" src="https://i.ibb.co/bvQ67sX/001.png"/>
        <img className="introduce col-11 col-md-9" src="https://i.ibb.co/w4WsghX/001.png"/>
        <img className="introduce col-11 col-md-9" src="https://i.ibb.co/WnCvGNs/004.png"/>
        <div className="start-ment col-11 col-md-9">
          <img className="introduce col-12" src="https://i.ibb.co/2k9bF46/001.png"/>
          <div className='introduce-search seach_input_box col-6'>
            <input type='text' className="introduce-input search-input col-12" placeholder="검색 시작"/>
            <img className="search-icon" src="https://i.ibb.co/FgWPvVM/Kakao-Talk-Photo-2021-11-12-13-30-49-removebg-preview.png"/>
          </div>
        </div>
      </>    
  )
}

export default Introduce