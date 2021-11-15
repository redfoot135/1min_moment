//npm unstall react-slick --save
import './slider.css'
import React, {useState, useEffect, useRef} from 'react'
import Slide from "./slide"
import Video from './video'
import axios from 'axios';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import VideoPage from '../pages/videopage'
const TOTAL_SLIDES = 390;

const category = ['생활','교통','법','의료','교육','무언가1','무언가2','무언가3','무언가4']


function Slider({idx,idx2,getvideoInfo,getCategory}){
    let itemsToRender = null;
   
    const [sliderList, setSliderList] = useState([])
    const [loading, SetLoading] = useState(false)
    const [array, SetArray] = useState([])
    
    
    let categoryContainer = []

   // const [currentSlide, setCurrentSlide]=useState(0);
    const slideRef = useRef(null);
    const nextSlide = () => {
        var sliderElem = document.querySelector(`.${idx}`);
        sliderElem.dataset.currentSlide = 0
    var sliderElem = document.querySelector(`.${idx}`)
    sliderElem.style.transition = "none";
    sliderElem.append(sliderElem.firstElementChild)
    sliderElem.style.transform = `translateX(-${299.7}vw)`;
    sliderElem.getBoundingClientRect();
     sliderElem.style.transition = "all 0.5s ease-in-out";
    sliderElem.style.transform = `translateX(-${333}vw)`
    };
    const prevSlide = () =>{
        
        console.log(array)
    var sliderElem = document.querySelector(`.${idx}`)
        sliderElem.style.transition = "none";
        sliderElem.prepend(sliderElem.lastElementChild)
        sliderElem.style.transform = `translateX(-${366.6}vw)`;
        sliderElem.getBoundingClientRect();
         sliderElem.style.transition = "all 1s ease-in-out";
        sliderElem.style.transform = `translateX(-${333}vw)`
 



    }
   
     useEffect(() => {
        var sliderElem = document.querySelector( `.${idx}`)
        console.log(sliderElem)
        //sliderElem.style.transition = "all 0.5s ease-in-out";
         sliderElem.style.transform = `translateX(-${333}vw)`; // 사이드 * 3000
        // sliderElem.dataset.currentSlide = 3000

       }, []);

       useEffect(()=>{
        
         axios(
            {
            method: 'get',
            url: `${process.env.REACT_APP_SERVER}/videos`,
            params: {
             //솔트 넘겨주기
             sort: 'views',
             category:category[idx2],
             limit:10
            },
            
            headers: { }
  
          })
         .then((res)=>{
             console.log('ressssssss',res.data.data)
             SetArray(array => [...array, ...res.data.data])
             console.log(array)
        
         })

       }
       
       ,[])
       
     
       if(array){
           console.log(array[0])
        //  console.log(res.data.data)
          itemsToRender = array.map((obj, index) =>{
              console.log(obj.category1)
              console.log(obj.category2)
              console.log(obj.category3)
              return <Slide key={obj.id} title={obj.title}  timestamp={obj.createdAt} image={obj.thumbnail} video={obj.video} getvideoInfo={getvideoInfo} video_id={obj.id} category1={obj.category1} category2={obj.category2} category3={obj.category3}/>
             })
            // console.log(itemsToRender)
       }else{
          console.log(array)
            itemsToRender = '...loading'
        }
        const getrealcategory = () =>{
            getCategory(category[idx2])
            
        }
   
    return(
        <div className='slider_container'>
            <div class = 'wrapper'>
            {/* {currentSlide} */}
            <div className='slider_info'>
            <div>{category[idx2]}</div> 
            <div  className={category[idx2]} onClick={getrealcategory}>+더보기</div>
            
            </div>
            <div className={idx}>
               {itemsToRender}
               {itemsToRender}
               {itemsToRender}
            </div>
             <div onClick={prevSlide} className='prevslide slide_btn'> <div className='slide_btn2'> &lt; </div></div>
             <div onClick={nextSlide} className='nextslide slide_btn'> <div className='slide_btn2'>&gt; </div></div>
             </div>
           
           
             
         </div>
         
  
    )

    
}
export default Slider;

