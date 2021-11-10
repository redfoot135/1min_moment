import Video from './video'
import './main.css'
import {useMediaQuery} from 'react-responsive'
import { useCallback,useState, useEffect } from 'react'
import Addcategory from './addcategory'
import { Button } from '@material-ui/core'
import axios from 'axios';
export default function Main(){
    const [currentCategory, setCurrentCategory]=useState('');
    const [showCategory, setshowCategory]=useState(false)
    const [categoryInfo, setcategoryInfo]= useState('')
    const [checkList, setCheckList] = useState([])
    const [itemIndex, setItemIndex] = useState(0);
    const [itemList, setItemList] = useState([])
    const [cursor, setCursor] = useState(50)
 //   const [result, setResult] = useState(video_list.slice(0, 20));
     // 
     //저위에있는것들지우고 정해진 갯수만큼 받아올꺼에요 20~30
     // useEffect 를 사용할꺼에요 
     // 하면서.. 저기에는 정해진 갯수만큼의 정보 -> x
     let x;
     let y;
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
         setCurrentCategory(checkList.join('/'))
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

    
    const infiniteScroll = useCallback(() => {
      let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
      let clientHeight = document.documentElement.clientHeight;
        console.log('scrollHeight',scrollHeight)
        console.log('scrollTop',scrollTop)
        console.log('clientHeight',clientHeight)
        console.log('itemlist_______',itemList[itemList.length-1])
        console.log('xxxxxxxxxxxxxxxxxx',x)
      if(scrollTop + clientHeight === scrollHeight) {
        var config = {
          method: 'get',
          url: `https://localhost:80/videos`,
          params: {
            category: '법',
            cursor: x,
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
          console.log('res@@@@@@@',res.data)
          console.log('res_____',res.data.data[res.data.data.length-1].id)
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
        url: `https://localhost:80/videos?category=법`,
        params: {
          cursor: x
        },
        headers: { }
      };
      axios(config)
      .then((res)=>{
        console.log('itemList',itemList)
        //setItemList([itemList].concat(res.data))
        console.log(res.data)
        setItemList(itemList => [...itemList, ...res.data.data])
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
     
     },[])

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
    
        
        {itemList.map((obj, index) => <Video title={obj.title}  timestamp={obj.createdAt} image={obj.thumbnail}/>) }
     </div>
       </div>
    )

    
}

