//npm unstall react-slick --save
import './slider.css'
import React, {useState, useEffect, useRef} from 'react'
import Slide from "./slide"
import Video from './video'
let img1 = 'https://cdn.pixabay.com/photo/2019/06/08/21/32/castle-4261029__480.jpg'
let img2 = 'https://cdn.pixabay.com/photo/2021/09/23/09/01/swan-6649194__480.jpg'
let img3 = 'https://cdn.pixabay.com/photo/2021/07/30/08/21/street-6509043_1280.jpg'
let img4 = 'https://cdn.pixabay.com/photo/2021/08/07/08/50/staircase-6528080_1280.jpg'
let img5 = 'https://cdn.pixabay.com/photo/2021/09/02/02/34/sunset-6592545_1280.jpg'
let img6 = 'https://cdn.pixabay.com/photo/2020/12/03/14/35/horror-5800684_1280.jpg'
let img7 = 'https://cdn.pixabay.com/photo/2021/09/25/18/21/witch-6655568_1280.jpg'
let img8 = 'https://cdn.pixabay.com/photo/2021/08/20/18/00/shaving-6560988_1280.jpg'
let img9 = 'https://cdn.pixabay.com/photo/2021/01/01/21/31/halloween-5880068_1280.jpg'
let img10 = 'https://cdn.pixabay.com/photo/2018/11/26/19/43/autumn-3840138_1280.jpg'
const img = [img1,img2,img3,img4,img5,img6,img7,img8,img9,img10]
const TOTAL_SLIDES = 390;
function Slider(){
   // const [currentSlide, setCurrentSlide]=useState(0);
    const slideRef = useRef(null);
    const nextSlide = () => {
        var sliderElem = document.querySelector(".slidercontainer");
        sliderElem.dataset.currentSlide = 0
        
    //     if(currentSlide >= TOTAL_SLIDES){
    //    // setCurrentSlide(0);
        
    //     document.querySelector(".slidercontainer")
    //     }else if(currentSlide===0){
    //     //setCurrentSlide(currentSlide+85);
    //     }else if(currentSlide=== 85){
    //     //setCurrentSlide(currentSlide+90);
    //     }else if(currentSlide=== 170 || currentSlide=== 205){
    //     //setCurrentSlide(currentSlide+90);
    //     }else{
    //     //setCurrentSlide(currentSlide+30);    
    //     }
    var sliderElem = document.querySelector(".slidercontainer")
    sliderElem.style.transition = "none";
    sliderElem.append(sliderElem.firstElementChild)
    sliderElem.style.transform = `translateX(-${2700}px)`;
    sliderElem.getBoundingClientRect();
     sliderElem.style.transition = "all 0.5s ease-in-out";
    sliderElem.style.transform = `translateX(-${3000}px)`
    };
    const prevSlide = () =>{
    var sliderElem = document.querySelector(".slidercontainer")
        sliderElem.style.transition = "none";
        sliderElem.prepend(sliderElem.lastElementChild)
        sliderElem.style.transform = `translateX(-${3300}px)`;
        sliderElem.getBoundingClientRect();
         sliderElem.style.transition = "all 0.5s ease-in-out";
        sliderElem.style.transform = `translateX(-${3000}px)`

    }
    // const rendering = () =>{
    //     let result = []
    //     for (let i = 0 ; i < img.length; i++ ){
    //         if(currentSlide= 0){
    //             result.push()
    //         }
    //     }
    // }
     useEffect(() => {
        var sliderElem = document.querySelector(".slidercontainer")
        //sliderElem.style.transition = "all 0.5s ease-in-out";
         sliderElem.style.transform = `translateX(-${3000}px)`; // 사이드 * 3000
        // sliderElem.dataset.currentSlide = 3000
       }, []);
    
    return(
    
        <div>
            <div class = 'wrapper'>
            {/* {currentSlide} */}
            <div className='slidercontainer'>
              {/* <div className="row"> */}
                <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment1"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment2"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment3"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment4"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment5"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment6"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                 <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment7"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                 <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment8"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
               
                <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment9"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment10"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment11"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment12"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment13"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment14"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment15"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment16"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                 <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment17"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                 <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment18"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
               
                <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment19"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment20"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                 <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                 <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
               
                <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
                <Slide
                title="1분만에 얻는 생활 꿀팁!"
                views="10.5만 views"
                timestamp="3 days ago"
                channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
                channel="1min_moment"
                image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
                />
              {/* </div> */}
               
                
            </div>
             <div onClick={prevSlide} className='prevslide slide_btn'> <div className='slide_btn2'> &lt; </div></div>
             <div onClick={nextSlide} className='nextslide slide_btn'> <div className='slide_btn2'>&gt; </div></div>
             </div>
             
         </div>
  
    )

    
}
export default Slider;

