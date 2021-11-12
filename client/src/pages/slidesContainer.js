import Slider from '../component/slider'
import React, {useState, useEffect, useRef} from 'react'


function SlidesContainer({getvideoInfo,getCategory}){
  
    const [idx, SetIdx] = useState(['slidercontainer1','slidercontainer2','slidercontainer3','slidercontainer4','slidercontainer5','slidercontainer6','slidercontainer7','slidercontainer8','slidercontainer9'])
    const [idx2, SetIdx2] = useState([0,1,2,3,4,5,6,7,8])

    
    return (
        <div>
        <Slider idx = {idx[0]} idx2 = {idx2[0]} getvideoInfo={getvideoInfo} getCategory={getCategory}/>
        <Slider idx = {idx[1]} idx2 = {idx2[1]} getvideoInfo={getvideoInfo} getCategory={getCategory}/>
        <Slider idx = {idx[2]} idx2 = {idx2[2]} getvideoInfo={getvideoInfo} getCategory={getCategory}/>
        <Slider idx = {idx[3]} idx2 = {idx2[3]} getvideoInfo={getvideoInfo} getCategory={getCategory}/>
        <Slider idx = {idx[4]} idx2 = {idx2[4]} getvideoInfo={getvideoInfo} getCategory={getCategory}/>
        <Slider idx = {idx[5]} idx2 = {idx2[5]} getvideoInfo={getvideoInfo} getCategory={getCategory}/>
        <Slider idx = {idx[6]} idx2 = {idx2[6]} getvideoInfo={getvideoInfo} getCategory={getCategory}/>
        <Slider idx = {idx[7]} idx2 = {idx2[7]} getvideoInfo={getvideoInfo} getCategory={getCategory}/>
        <Slider idx = {idx[8]} idx2 = {idx2[8]} getvideoInfo={getvideoInfo} getCategory={getCategory}/>
        </div>
    )
}

export default SlidesContainer;