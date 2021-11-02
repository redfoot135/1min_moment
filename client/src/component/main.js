import Video from './video'
import './main.css'
import {useMediaQuery} from 'react-responsive'
import { useState } from 'react'
import Addcategory from './addcategory'
export default function Main(){
    const [currentCategory, setCurrentCategory]=useState('');
    const [showCategory, setshowCategory]=useState(false)
     const [categoryInfo, setcategoryInfo]= useState('')
     const [checkList, setCheckList] = useState([])
     
    const openCategory = (e) =>{
   
    setshowCategory(!showCategory)
    setCheckList([])
    console.log(showCategory)
    console.log(currentCategory)
     
    }
    
    const confirmBtn = () =>{
        if(checkList.length>3){
         alert('dkdkdk')
         console.log(checkList)
         setshowCategory(!showCategory)
        }
        else{
        setshowCategory(!showCategory)
        console.log(showCategory)
         setCurrentCategory(checkList.join())
         setCheckList([])
         console.log(currentCategory)
        }
    }
    
  
    const handleCategoty = (e) =>{
     //console.log(e.target.value)
          if(!checkList.includes(e.target.value)){
              console.log(e.target.value)
              if(e.target.checked === true){
              console.log('들어왔어요')
              //setcategoryInfo(categoryInfo+`${e.target.value}`)
              setCheckList([...checkList,e.target.value])
              //console.log(categoryInfo)
              console.log('checklist',checkList)
              }
          }
      
    }
    


    return(
     <div>
     <div className='categorycontainer'> 
      <div className='currentmenu'>{currentCategory}</div>
      <div className='addbox' onClick= {openCategory}>+</div>   
     </div> 
     <div>
       {showCategory === true ?
      (<Addcategory confirmBtn={confirmBtn} handleCategoty={handleCategoty}/>)
      :
      null}
      </div>
      <div className='videocontainer'> {/*//곧 map으로 뿌릴 예정 ;; */}
        <Video
        title="1분만에 얻는 생활 꿀팁!"
        views="10.5만 views"
        timestamp="3 days ago"
        channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
        channel="1min_moment1"
        image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
        />
        <Video
        title="1분만에 얻는 생활 꿀팁!"
        views="10.5만 views"
        timestamp="3 days ago"
        channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
        channel="1min_moment2"
        image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
        />
        <Video
        title="1분만에 얻는 생활 꿀팁!"
        views="10.5만 views"
        timestamp="3 days ago"
        channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
        channel="1min_moment3"
        image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
        />
         <Video
        title="1분만에 얻는 생활 꿀팁!"
        views="10.5만 views"
        timestamp="3 days ago"
        channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
        channel="1min_moment4"
        image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
        />
         <Video
        title="1분만에 얻는 생활 꿀팁!"
        views="10.5만 views"
        timestamp="3 days ago"
        channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
        channel="1min_moment5"
        image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
        />
         <Video
        title="1분만에 얻는 생활 꿀팁!"
        views="10.5만 views"
        timestamp="3 days ago"
        channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
        channel="1min_moment6"
        image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
        />
         <Video
        title="1분만에 얻는 생활 꿀팁!"
        views="10.5만 views"
        timestamp="3 days ago"
        channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
        channel="1min_moment7"
        image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
        />
         <Video
        title="1분만에 얻는 생활 꿀팁!"
        views="10.5만 views"
        timestamp="3 days ago"
        channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
        channel="1min_moment8"
        image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
        />
         <Video
        title="1분만에 얻는 생활 꿀팁!"
        views="10.5만 views"
        timestamp="3 days ago"
        channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
        channel="1min_moment9"
        image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
        />
         <Video
        title="1분만에 얻는 생활 꿀팁!"
        views="10.5만 views"
        timestamp="3 days ago"
        channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
        channel="1min_moment10"
        image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
        />
         <Video
        title="1분만에 얻는 생활 꿀팁!"
        views="10.5만 views"
        timestamp="3 days ago"
        channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
        channel="1min_moment11"
        image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
        />
         <Video
        title="1분만에 얻는 생활 꿀팁!"
        views="10.5만 views"
        timestamp="3 days ago"
        channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
        channel="1min_moment12"
        image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
        />
         <Video
        title="1분만에 얻는 생활 꿀팁!"
        views="10.5만 views"
        timestamp="3 days ago"
        channelImage="http://cdnimage.dailian.co.kr/news/201808/news_1535616895_736207_m_1.jpg"
        channel="1min_moment13"
        image="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
        />
        
     </div>
       </div>
    )

    
}

