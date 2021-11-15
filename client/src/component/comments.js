import './comments.css'
import axios from 'axios';
import { useCallback,useState, useEffect } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
//import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders';
const {TextArea} = Input;

 

function Comments({accessToken,videoInfo,userInfo}) {
  console.log(userInfo)
  let renderComment = null;
  let x ;
  const [commentList, setCommentList] = useState([])
  const [commentValue, setCommentValue] = useState('')
  const [posting, setPosting] = useState('') // useEffect를위한 state입니다
  const [videoId, setVideoId] = useState(null)
  //timestamp
  
  const handleclick = (e) =>{
    setCommentValue(e.currentTarget.value)
  }
  const onSubmit = (e)=>{
    e.preventDefault(); //for refresh block
    axios
    .post(
      `${process.env.REACT_APP_SERVER}/comment`,{
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
        setCommentList(commentList => [ {
          comment:commentValue,
          writer:userInfo.name,
          id:res.data.data.comment_id //comments의  id
          
        }, ...commentList])
        x=res.data.data.comment_id
        console.log('xxxxxx',x)
        // setPosting({
        //   comment:commentValue,
        //   writer:userInfo.name,
        //   id:parseInt(Math.random()*10000) //comments의  id
        // })
       // window.location.replace('/')
       setCommentValue('')
       
       }
       else{
        alert("실패")
       }         
      
       }) 
      
  }

  const uploadVideo = () => {
    axios
    .post(
      `${process.env.REACT_APP_SERVER}/comment`,{
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
   
    if(scrollTop + clientHeight +1>scrollHeight) {    
      console.log('hi!')
      axios
      .get(
        `${process.env.REACT_APP_SERVER}/comments`,{
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
                  key = {obj.id}
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
    console.log('123123123123',videoInfo.videoId)
    window.addEventListener('scroll', infiniteScroll, true);
    return () => window.removeEventListener('scroll', infiniteScroll, true);
    }, [infiniteScroll]);
   // const itemlist = itemList.map((obj, index) => <Video title={obj.title}  timestamp={obj.createdAt}/>)
      useEffect(()=>{   
        axios
        .get(
          `${process.env.REACT_APP_SERVER}/comments`,{
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
           
      },[posting])
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
   <div className='commentsreverse'>
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
    
     </div>
 )
}
export default Comments