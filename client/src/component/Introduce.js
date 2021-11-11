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
        <img className="introduce col-11 col-md-9" src="https://i.ibb.co/n1k9GLT/002.png"/>
        <img className="introduce col-11 col-md-9" src="https://i.ibb.co/y5P6yZz/003.png"/>
        <img className="introduce col-11 col-md-9" src="https://i.ibb.co/WnCvGNs/004.png"/>
        <img className="introduce col-11 col-md-9" src="https://i.ibb.co/LCjrTRf/005.png"/>
      </>    
  )
}

export default Introduce