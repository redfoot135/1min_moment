import './comments.css'
import axios from 'axios';
import { useCallback,useState, useEffect } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
const {TextArea} = Input;

 

function Comments({accessToken,videoInfo}) {
  let renderComment = null;
  let x ;
  const [commentList, setCommentList] = useState([])
  const [commentValue, setCommentValue] = useState('')
  const [posting, setPosting] = useState('') // useEffect를위한 state입니다
  const [videoId, setVideoId] = useState(null)

  
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
        setPosting('poting')
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
           renderComment = commentList.map((obj, index) =>{
            return  <div>
            <Comment
                  style={{display:'flex'}}
                  author={obj.writer}
                   content={
                         <p>
                         {obj.comment}
                         </p>
                         }
                     ></Comment>
                     <hr/>
             </div> 
           })
     
        
        
         })  
         
    }
  }, [posting]);


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
            //  renderComment = commentList.map((obj, index) =>{
            //   return  <div>
            //   <Comment
            //         style={{display:'flex'}}
            //         author={obj.writer}
            //          content={
            //                <p>
            //                {obj.comment}
            //                </p>
            //                }
            //            ></Comment>
            //            <hr/>
            //    </div> 
            //  })
             
          
           }) 
           
      },[])
 return(
     <div className='commentscontainer'>
         <br />
         <p> 댓글 </p>
         <hr/>
         
   <form style={{display:'flex'}} onSubmit={onSubmit}>
       <TextArea
            className='replyarea'
            style={{width:'100%', borderRadius: '5px'}}
            onChange = {handleclick}
            value={commentValue}
            placeholder='댓글을 입력해주세요'
            />
          <br/>
          <button style={{width: '20%',height:'52px'}} >submit</button>
          
   </form>
   
   <br />
    {commentList.map((obj, index) =>
    <div>
   <Comment
         style={{display:'flex'}}
         author={obj.writer}
          content={
                <p>
                {obj.comment}
                </p>
                }
            ></Comment>
            <hr/>
    </div> 
    )}
  
    
     </div>
 )
}
export default Comments