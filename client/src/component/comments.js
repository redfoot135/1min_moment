import './comments.css'
import axios from 'axios';
import { useCallback,useState, useEffect } from 'react'
import { Comment, Input } from 'antd';
const {TextArea} = Input;

 

function Comments({accessToken,clickMyVideoData,userInfo}) {
  let renderComment = null;
  let x ;
  const [commentList, setCommentList] = useState([])
  const [commentValue, setCommentValue] = useState('')
  
  const handleclick = (e) =>{
    setCommentValue(e.currentTarget.value)
  }
  const onSubmit = (e)=>{
    e.preventDefault(); 
    axios
    .post(
      `${process.env.REACT_APP_SERVER}/comment`,{
        video_id:clickMyVideoData.id,
        comment:commentValue
      },{
        headers: {
          authorization: `Bearer ${accessToken}`,
        "Content-Type" : "application/json"   
      },
      withCredentials: true
    }
      ).then((res)=>{
       if(res.data.message==='Comment has been completed'){
        setCommentList(commentList => [ {
          comment:commentValue,
          writer:userInfo.name,
          id:res.data.data.comment_id //comments의  id
          
        }, ...commentList])
        x=res.data.data.comment_id

       setCommentValue('')
       
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
   
    if(scrollTop + clientHeight +1>scrollHeight) {    
      axios
      .get(
        `${process.env.REACT_APP_SERVER}/comments`,{
          params:{
            id:clickMyVideoData.video_id,
            cursor:x
          },
          headers: {
            authorization: `Bearer ${accessToken}`,
          "Content-Type" : "application/json"   
        },
        withCredentials: true
      }
        ).then((res)=>{
          setCommentList(commentList => [...commentList, ...res.data.data])
          if(res.data.data[res.data.data.length-1]){
           x = res.data.data[res.data.data.length-1].id
           }
           renderComment = commentList.map((obj) =>{
            return  <div>
            <Comment key = {obj.id} style={{display:'flex'}} author={obj.writer} content={<p> {obj.comment} </p>}></Comment>
                     <hr/>
             </div> 
           })
     
        
        
         })  
         
    }


  }, []);


  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll, true);
    return () => window.removeEventListener('scroll', infiniteScroll, true);
    }, [infiniteScroll]);
      useEffect(()=>{   
        axios
        .get(
          `${process.env.REACT_APP_SERVER}/comments`,{
            params:{id:clickMyVideoData.id},
            headers: {
              authorization: `Bearer ${accessToken}`,
            "Content-Type" : "application/json"   
          },
          withCredentials: true
        }
          ).then((res)=>{
            
            setCommentList(commentList => [...commentList, ...res.data.data])
            if(res.data.data[res.data.data.length-1]){
             x = res.data.data[res.data.data.length-1].id             
             }
           }) 
           
      },[])
 return(
     <div id="comments" className='commentscontainer row-fluid col-12'>         
        <form style={{display:'flex'}} onSubmit={onSubmit} className="comment-form col-12">
            <TextArea
                 className='replyarea'
                 style={{width:'100%', borderRadius: '5px'}}
                 onChange = {handleclick}
                 value={commentValue}
                 placeholder='댓글을 입력해주세요'
                 />
               
               <button className="comment-form-btn" style={{width: '20%',height:'54px'}} >등록</button>
               
        </form>
   <div className='commentsreverse col-12'>
   <br />
    {commentList.map((obj, index) =>
    <div>
   <Comment key = {obj.id} className={"aaa"} style={{display:'flex'}} author={obj.writer} content={<p> {obj.comment} </p>}></Comment>
            <hr/>
    </div> 
    )}
    </div>
    
     </div>
 )
}
export default Comments