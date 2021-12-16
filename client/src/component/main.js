import './main.css'
import { useCallback,useState, useEffect } from 'react'
import Addcategory from './addcategory'
import axios from 'axios';
import UploadVideoCard from '../pages/UploadVideoCard';



export default function Main({searchInfo, setClickMyVideoDataFunc, accessToken}){
    const [currentCategory, setCurrentCategory]=useState('');
    const [showCategory, setshowCategory]=useState(false)
    const [checkList, setCheckList] = useState([])
    const [checkListDisplay, setCheckListDisplay] = useState([])
    const [itemList, setItemList] = useState(null)
    let used = false; 

     let x;
    const openCategory = (e) =>{
   
    setshowCategory(!showCategory)
    setCheckList([])
    setCheckListDisplay([])
    
    }
    
    const confirmBtn = () =>{
        if(checkList.length>3){

         setshowCategory(!showCategory)
        }
        else{
        setshowCategory(!showCategory)
        setCheckListDisplay(checkListDisplay=>[...checkListDisplay,...checkList])
        
         setCurrentCategory(checkList.join('/'))

         setCheckList('12121212',[])
        }
    }
    
  
    const handleCategoty = (e) =>{
          if(!checkList.includes(e.target.value)){
              if(e.target.checked === true){

              setCheckList([...checkList,e.target.value])
              }
          }
    }

    //어디선가 0.5정도 먹고있음 찾아서 처리할것!    
    const infiniteScroll = useCallback(() => {
      let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
      let clientHeight = document.documentElement.clientHeight;

      if(scrollTop + clientHeight+1 >scrollHeight && used) {
        var config = {
          method: 'get',
          url: `${process.env.REACT_APP_SERVER}/videos`,
          params: {
            category: currentCategory,
            cursor: x,
            search:searchInfo,
            limit: 10
          },
          headers: {authorization: `Bearer ${accessToken}`}
        };
        axios(config)
        .then((res)=>{
          setItemList(itemList => [...itemList, ...res.data.data])

         if(res.data.data[res.data.data.length-1]){
         x = res.data.data[res.data.data.length-1].id
         }
          
        })
       // 쿼리요청

        }
      }, []);
    
      useEffect(() => {
      window.addEventListener('scroll', infiniteScroll, true);
      return () => window.removeEventListener('scroll', infiniteScroll, true);
      }, [infiniteScroll]);

    //유즈콜백보다는 먼저 일어나는 이팩트
     useEffect(()=>{
      var config = {
        method: 'get',
        url: `${process.env.REACT_APP_SERVER}/videos`,
        params: {
          cursor: x,
          category:currentCategory,
          search:searchInfo,
          limit: 10
        },
        headers: {authorization: `Bearer ${accessToken}`, }
      };
      axios(config)
      .then((res)=>{
        used = true;
        setItemList([...res.data.data])

      if(res.data.data[res.data.data.length-1]){
       x = res.data.data[res.data.data.length-1].id
       }
      })
     
     // 쿼리요청
     
     },[searchInfo,currentCategory])

    return(

     <div className="main-container col-12 sm-px-0">
       <div className="main-box col-md-9">
          <div className="title"><img className="main-title" src="https://i.ibb.co/7XrttV3/image.png" alt=''/></div>
          <div className='category-container-box'>
          <div className='categorycontainer'> 
            <div className='addbox' onClick= {openCategory}>+</div>
            <div>
              {showCategory === true ?
              (<Addcategory confirmBtn={confirmBtn} handleCategoty={handleCategoty}/>)
              :
              null}
            </div> 
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
          </div> 
         
          </div>
          <div className='videocontainer container-fluid col-12'> {/*//곧 map으로 뿌릴 예정 ;; */}
            <div className="videocontainer-box col-12 row sm-p-5">
              {itemList !== null ?
              itemList.map((obj, index, arr) => <UploadVideoCard key={obj.id} movieData={obj} setClickMyVideoDataFunc={setClickMyVideoDataFunc}/>)
              : null }
            </div>   
          </div>
       </div>
     </div>
    )
}
            


