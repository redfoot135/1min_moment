import React from 'react'
import "./Introduce.css"
import { Carousel } from "react-bootstrap"

const Introduce = () => {
  let img1 = 'https://cdn.pixabay.com/photo/2019/06/08/21/32/castle-4261029__480.jpg'
  let img2 = 'https://cdn.pixabay.com/photo/2021/09/23/09/01/swan-6649194__480.jpg'
  let img3 = 'https://cdn.pixabay.com/photo/2021/07/30/08/21/street-6509043_1280.jpg'

  return (
      <>
        <Carousel>
          <Carousel.Item>
            <div className="slideContainer1"></div>
            <Carousel.Caption>
              <div className="slide-coment">1번 슬라이드</div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="slideContainer2"></div>
            <Carousel.Caption>
              <div className="slide-coment">2번 슬라이드</div>
            </Carousel.Caption>
          </Carousel.Item>
          {/* <Carousel.Item>
            <div className="slideContainer"></div>
            <Carousel.Caption>
              <div className="slide-coment">3번 슬라이드</div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="slideContainer"></div>
            <Carousel.Caption>
              <div className="slide-coment">4번 슬라이드</div>
            </Carousel.Caption>
          </Carousel.Item> */}
        </Carousel>

      
      <div class="header col-12">
        <div class="inner-header">
        {/* <h1>세상의 모든 꿀팁, <br/>1분 순삭에서 만나보세요</h1> */}
        </div>
      
        <div>
          <svg class="waves" src="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
            <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g class="parallax">
              <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
              <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
              <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
              <use href="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>
      </>    
  )
}

export default Introduce