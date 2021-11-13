import './comments.css'
import axios from 'axios';
import { useCallback,useState, useEffect } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
const {TextArea} = Input;

 

function Comments({accessToken,videoInfo}) {
  let x ;
  const [commentList, setCommentList] = useState([])
  const [commentValue, setCommentValue] = useState('')
  const handleclick = (e) =>{
    setCommentValue(e.currentTarget.value)
  }
  const onSubmit = (e)=>{
    e.preventDefault(); //for refresh block
    axios
    .post(
      'https://localhost:80/comment',{
        video_id:videoInfo.video_id,
        comment:commentValue
      },{
        headers: {
          authorization: `Bearer ${accessToken}`,
        "Content-Type" : "application/json"   
      },
      withCredentials: true
    }
      ).then((res)=>{
           console.log(res)
       if(res.data.message==='Comment has been completed'){
        alert("성공")
       // window.location.replace('/')
       }
       else{
        alert("실패")
       }         
      
       }) 
  }
  const uploadVideo = () => {
    axios
    .post(
      'https://localhost:80/comment',{
        video_id:videoInfo.video_id,
        comment:commentValue
      },{
        headers: {
          authorization: `Bearer ${accessToken}`,
        "Content-Type" : "application/json"   
      },
      withCredentials: true
    }
      ).then((res)=>{
           console.log(res)
       if(res.data.message==='Comment has been completed'){
        alert("성공")
       // window.location.replace('/')
       }
       else{
        alert("실패")
       }         
      
       }) 
       

  }
  const infiniteScroll = useCallback(() => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;
     
    if(scrollTop + clientHeight === scrollHeight) {    
      axios
      .get(
        'https://localhost:80/comments',{
          params:{
            id:videoInfo.video_id,
            cursor:x
          },
          headers: {
            authorization: `Bearer ${accessToken}`,
          "Content-Type" : "application/json"   
        },
        withCredentials: true
      }
        ).then((res)=>{
             console.log(res)
           
         
          
          setCommentList(commentList => [...commentList, ...res.data.data])
          if(res.data.data[res.data.data.length-1]){
            console.log('res@@@@@@@',res.data)
            console.log('res_____',res.data.data[res.data.data.length-1].id)
           x = res.data.data[res.data.data.length-1].id
           console.log(x)
           }
         
     
        
        
         })  
    }
  }, []);


  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll, true);
    return () => window.removeEventListener('scroll', infiniteScroll, true);
    }, [infiniteScroll]);
   // const itemlist = itemList.map((obj, index) => <Video title={obj.title}  timestamp={obj.createdAt}/>)
      useEffect(()=>{   
        axios
        .get(
          'https://localhost:80/comments',{
            params:{id:videoInfo.video_id,},
            headers: {
              authorization: `Bearer ${accessToken}`,
            "Content-Type" : "application/json"   
          },
          withCredentials: true
        }
          ).then((res)=>{
               console.log(res)
           
            
            setCommentList(commentList => [...commentList, ...res.data.data])
            if(res.data.data[res.data.data.length-1]){
              console.log('res@@@@@@@',res.data)
              console.log('res_____',res.data.data[res.data.data.length-1].id)
             x = res.data.data[res.data.data.length-1].id
             console.log(x)
             }
           
                 
          
           }) 
      },[])
 return(
     <div className='commentscontainer row-fluid'>         
        <form style={{display:'flex'}} onSubmit={onSubmit} className="comment-form col-md-9 col-11">
            <TextArea
                 className='replyarea'
                 style={{width:'100%', borderRadius: '5px'}}
                 onChange = {handleclick}
                 value={commentValue}
                 placeholder='댓글을 입력해주세요'
                 />
               
               <button className="comment-form-btn" style={{width: '20%',height:'54px'}} >등록</button>
               
        </form>
   
        <div className="comment-box">
        <Comment
              style={{display:'flex', justifyContent:"flex-start"}}
              author='김코딩'
               content={
                     <p className="comment-box-comment">
                     날씨가 참 맑네요
                     </p>
                     }
                 ></Comment>
                
         </div>
         <div className="comment-box">
          <Comment
                style={{display:'flex'}}
                author='김코딩'
                 content={
                       <p>
                       날씨가 참 맑네요
                       </p>
                       }
                   ></Comment>
                  
         </div>
         <div className="comment-box">
           <Comment
                 style={{display:'flex'}}
                 author='김코딩'
                  content={
                        <p>
                        날씨가 참 맑네요
                        </p>
                        }
                    ></Comment>
                   
          </div>
          {commentList.map((obj, index) =>
          <div className="comment-box">
           <Comment
                 style={{display:'flex'}}
                 author={obj.writer}
                  content={
                        <p>
                        {obj.comment}
                        </p>
                        }
                    ></Comment>
                   
          </div> 
          )}
     </div>
 )
}
export default Comments