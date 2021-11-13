import React from 'react'
import "./Introduce.css"
// import { Carousel } from "react-bootstrap"

const Introduce = () => {

  return (
      <>
        <div id="carouselExampleIndicators" class="carousel slide col-11 col-md-9" data-bs-ride="carousel" data-bs-wrap="false">
          <div id="bottom-button" class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active bottom-button" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" class="bottom-button" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" class="bottom-button" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" class="bottom-button" aria-label="Slide 4"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" class="bottom-button" aria-label="Slide 5"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="https://i.ibb.co/x3XftJr/001.png" class="d-block w-100 introduce" alt="..."/>
            </div>
            <div class="carousel-item">
              <img src="https://i.ibb.co/jr4MZp3/003.png" class="d-block w-100 introduce" alt="..."/>
            </div>
            <div class="carousel-item">
              <img src="https://i.ibb.co/JnXLHqj/004.png" class="d-block w-100 introduce" alt="..."/>
            </div>
            <div class="carousel-item">
              <img src="https://i.ibb.co/BwYNhP2/005.png" class="d-block w-100 introduce" alt="..."/>
            </div>
            <div class="carousel-item">
              <img src="https://i.ibb.co/GJwwpWP/006.png" class="d-block w-100 introduce" alt="..."/>
              <div className='carousel-caption introduce-search seach_input_box col-6'>
                <input type='text' className="introduce-input search-input col-12" placeholder="검색 시작"/>
                <img className="search-icon" src="https://i.ibb.co/FgWPvVM/Kakao-Talk-Photo-2021-11-12-13-30-49-removebg-preview.png" alt="소개글 검색 아이콘"/>
              </div>
            </div>
          </div>
          <button class="control-button carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="control-button carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

        {/* <img className="introduce1 col-11 col-md-9" src="https://i.ibb.co/x3XftJr/001.png" alt="소개글 이미지"/>
        <img className="introduce col-11 col-md-9" src="https://i.ibb.co/w4xB99n/003.png" alt="소개글 이미지"/>
        <img className="introduce col-11 col-md-9" src="https://i.ibb.co/7Sx8WwC/004.png" alt="소개글 이미지"/>
        <img className="introduce col-11 col-md-9" src="https://i.ibb.co/HqmnkxK/005.png" alt="소개글 이미지"/> */}
        {/* <div className="start-ment col-11 col-md-9">
          <img className="introduce col-12" src="https://i.ibb.co/pPDDwfX/006.png" alt="소개글 이미지"/>
          <div className='introduce-search seach_input_box col-6'>
            <input type='text' className="introduce-input search-input col-12" placeholder="검색 시작"/>
            <img className="search-icon" src="https://i.ibb.co/FgWPvVM/Kakao-Talk-Photo-2021-11-12-13-30-49-removebg-preview.png" alt="소개글 검색 아이콘"/>
          </div>
        </div> */}
      </>    
  )
}

export default Introduce