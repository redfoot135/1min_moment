import Video from './video'
import './main.css'
import {useMediaQuery} from 'react-responsive'
import { useCallback,useState, useEffect } from 'react'
import Addcategory from './addcategory'
import { Button } from '@material-ui/core'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import UploadVideoCard from '../pages/UploadVideoCard';


export default function Main({category,searchResult,searchInfo,getvideoInfo,setSearchInfo, setClickMyVideoDataFunc, setIsUploadVideo}){
    const [currentCategory, setCurrentCategory]=useState('');
    const [showCategory, setshowCategory]=useState(false)
    const [categoryInfo, setcategoryInfo]= useState('')
    const [checkList, setCheckList] = useState([])
    const [checkListDisplay, setCheckListDisplay] = useState([])
    const [itemIndex, setItemIndex] = useState(0);
    const [itemList, setItemList] = useState([])
    const [cursor, setCursor] = useState(50)
    console.log('searchInfosearchInfosearchInfo',searchInfo)
 //   const [result, setResult] = useState(video_list.slice(0, 20));
     // 
     //저위에있는것들지우고 정해진 갯수만큼 받아올꺼에요 20~30
     // useEffect 를 사용할꺼에요 
     // 하면서.. 저기에는 정해진 갯수만큼의 정보 -> x
     let x;
     let y;
     const history = useHistory()
    const openCategory = (e) =>{
   
    setshowCategory(!showCategory)
    console.log(checkListDisplay)
    setCheckList([])
    setCheckListDisplay([])
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
        setCheckListDisplay(checkListDisplay=>[...checkListDisplay,...checkList])
        
         setCurrentCategory(checkList.join('/'))
         
         console.log(checkListDisplay)
         setCheckList('12121212',[])
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
        console.log(checkListDisplay)
              }
          }
      
    }

    //어디선가 0.5정도 먹고있음 찾아서 처리할것!    
    const infiniteScroll = useCallback(() => {
      let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
      let clientHeight = document.documentElement.clientHeight;
        console.log('scrollHeight',scrollHeight)
        console.log('scrollTop',scrollTop)
        console.log('clientHeight',clientHeight)
        console.log('itemlist_______',itemList[itemList.length-1])
        console.log('xxxxxxxxxxxxxxxxxx',x)
      if(scrollTop + clientHeight+1 >scrollHeight) {
        var config = {
          method: 'get',
          url: `https://localhost:80/videos`,
          params: {
            category: currentCategory,
            cursor: x,
            search:searchInfo,
            limit: 10
          },
          headers: { }
        };
        axios(config)
        .then((res)=>{
          console.log('itemList',itemList)
          //setItemList([itemList].concat(res.data))
          setItemList(itemList => [...itemList, ...res.data.data])
          //console.log('res_____',res.data[res.data.length-1].id)
        
          // console.log('itemlist2_______',itemList)
         // setCursor(res.data[res.data.length-1].id)
         if(res.data.data[res.data.data.length-1]){
        //  console.log('res@@@@@@@',res.data)
        //  console.log('res_____',res.data.data[res.data.data.length-1].id)
         x = res.data.data[res.data.data.length-1].id
         console.log(x)
         }
          
        })
       // 쿼리요청
       console.log('itemlist3_______',itemList)
       console.log('get요청')

        }
      }, []);
    
      useEffect(() => {
      window.addEventListener('scroll', infiniteScroll, true);
      return () => window.removeEventListener('scroll', infiniteScroll, true);
      }, [infiniteScroll]);
      //const itemlist = itemList.map((obj, index) => <Video title={obj.title}  timestamp={obj.createdAt}/>)


     useEffect(()=>{
      var config = {
        method: 'get',
        url: `https://localhost:80/videos`,
        params: {
          cursor: x,
          category:currentCategory,
          search:searchInfo
        },
        headers: { }
      };
      axios(config)
      .then((res)=>{
        setItemList([])
       // setSearchInfo('')
        console.log('itemList',itemList)
        //setItemList([itemList].concat(res.data))
        console.log(res.data)
        setItemList(itemList => [...itemList, ...res.data.data])
        setIsUploadVideo(res.data.data)
        //console.log('res_____',res.data[res.data.length-1].id)
      
        // console.log('itemlist2_______',itemList)
       // setCursor(res.data[res.data.length-1].id)
      //  if(res.data.data[0]){
        
      //  x = res.data.data[0].id
      //  }
      if(res.data.data[res.data.data.length-1]){
        console.log('res@@@@@@@',res.data)
        console.log('res_____',res.data.data[res.data.data.length-1].id)
       x = res.data.data[res.data.data.length-1].id
       console.log(x)
       }
      })
     
     // 쿼리요청
     
     },[searchInfo,currentCategory])
     
     console.log(itemList)

    return(

     <div className="main-container col-12 sm-px-0">
       <div className="main-box col-md-10">
          <div className="title"><img className="main-title" src="https://i.ibb.co/7XrttV3/image.png"/></div>
          <div className='categorycontainer'> 
            {checkListDisplay.length ===3 ? 
            ( <div className='categorycontainer2'>
                <div className='currentmenu_category'>{checkListDisplay[0]}</div>
                <div className='currentmenu_category'>{checkListDisplay[1]}</div>
                <div className='currentmenu_category'>{checkListDisplay[2]}</div>
              </div>) : null }
  
            {checkListDisplay.length ===2 ? 
            ( <div  className='categorycontainer2'>
                <div className='currentmenu_category'>{checkListDisplay[0]}</div>
                <div className='currentmenu_category'>{checkListDisplay[1]}</div>
                
              </div>) : null }
            
            {checkListDisplay.length ===1 ? 
            ( <div  className='categorycontainer2'>
                <div className='currentmenu_category'>{checkListDisplay[0]}</div>
              </div>) : null }
                     
            <div className='addbox' onClick= {openCategory}>+</div>      
          </div> 
          <div>
            {showCategory === true ?
              (<Addcategory confirmBtn={confirmBtn} handleCategoty={handleCategoty}/>)
              :
              null}
          </div>
          <div className='videocontainer container-fluid'> {/*//곧 map으로 뿌릴 예정 ;; */}
            <div className="videocontainer-box row sm-p-5">
              {itemList.map((obj, index) => <Video key={obj.id} movieData={obj} setClickMyVideoDataFunc={setClickMyVideoDataFunc}/>) }
            </div>   
          </div>
       </div>
     </div>
    )
}
            


