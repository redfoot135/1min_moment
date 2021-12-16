import React, {useState, useCallback} from 'react';
import axios from "axios"
import './uploadVideo.css'
import AWS from "aws-sdk";
import { v4 } from 'uuid';
import {useDropzone} from 'react-dropzone'


function UploadVideo({accessToken}) {


  const [selectedFile, setSelectedFile] = useState('');
  const [title, setTitle] = useState('')
  const [imgData , setImgData] = useState(null)
 

  let checkList = []



  const handleCategoty = (e) =>{
         if(!checkList.includes(e.target.value)){
             if(e.target.checked === true){
             checkList.push(e.target.value)
             }
         }
         else {
          for(let i = 0; i < checkList.length; i++) {
            if(checkList[i] === e.target.value)  {
              checkList.splice(i, 1);
              i--;
            }
          }
         }
     
   }


  const handleTargetTitle=(e)=>{
    setTitle(e.target.value)
  }


  const uploadVideo =  () => {
    if(checkList.length >3){
     alert('체크리스트 최대갯수는 3개입니다.')
    }
    else{
    let buf =Buffer.from(imgData.replace(/^data:image\/\w+;base64,/, ""),'base64')
    const S3 = new AWS.S3({
      region: 'ap-northeast-2',
      accessKeyId: process.env.REACT_APP_ACCESSKEY,
      secretAccessKey: process.env.REACT_APP_SECRETKEY,
    });

    const videoName = v4();
      // 이게 순서 2번째
      S3.upload({
      Bucket: `${process.env.REACT_APP_BUCKET}/videos`,
      Key: `${videoName}.mp4`,
      ACL: 'public-read',
      Body: selectedFile,
      ContentType: 'video/mp4',
    }, (err, data) => {
      if (err) {
      }else {
        alert("업로드가 완료 되었습니다")
        window.location.replace('/main')
         
      }
    })

      const videoLink =`https://${process.env.REACT_APP_BUCKET}.s3.ap-northeast-2.amazonaws.com/videos/${videoName}.mp4`
        
     const imgName = v4();
      var data = {
        Bucket: `${process.env.REACT_APP_BUCKET}/images`,
        Key: `${imgName}.jpeg`, 
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
      };
     
      S3.upload(data, function(err, data){
      });
      const imgLink =`https://${process.env.REACT_APP_BUCKET}.s3.ap-northeast-2.amazonaws.com/images/${imgName}.jpeg`
    axios
    .post(
      `${process.env.REACT_APP_SERVER}/myvideo`,{
        title:title , video:videoLink, thumbnail:imgLink, category1:checkList[0], category2:checkList[1], category3:checkList[2]
      },{
        headers: {
          authorization: `Bearer ${accessToken}`,
        "Content-Type" : "application/json"   
      },
      withCredentials: true
    }
      )}
  }

  const onDrop = useCallback(acceptedFiles => {

    setSelectedFile(acceptedFiles[0])
    var canvas = document.getElementById('canvas'); 
      var video = document.getElementById('video'); 
      const file = acceptedFiles[0]; 
      const videourl = URL.createObjectURL(file); 
      video.setAttribute("src", videourl+'#t=20'); 
      video.onloadeddata = function(){ 
          canvas.getContext('2d').drawImage(video, 0, 0, 300, 200); 
         var img  = canvas.toDataURL("image/png") 
        setImgData(img)
        
      }
      
      
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

 

  return (
          
    <div className="add_file col-11 col-md-7">      
      
      <div className="uploadTitle">
        <img className="uploadTitle-text" src="https://i.ibb.co/ZmbDdtD/image.png" alt="" />
      </div>
      <div>
            <div className="filebox" > 
            <div>
          
            <video id='video'></video>
            </div>
             <div className='labelcontainer col-12' {...getRootProps()}>
              <input  className="filebox"  type='file' {...getInputProps()}/> 
                {
                isDragActive ?
                <label className='label' >들어왔어요!</label> :
                <label className='label'>클릭하거나 파일을 드래그해주세요!<canvas id='canvas' className="col-11"></canvas></label> 
                }
              </div>
              
            </div>
            
            <div className='videoInfo col-12'>
            <div className="upload-holder">
              <div className="title-margin"> 
                제목
              </div>
               <input className="upload-title col-12" type='text' onChange={handleTargetTitle} value={title} placeholder={'제목을 입력해주세요'}/>
            </div>
            <div className="title-margin"> 
                카테고리설정
              </div>
          <div className='categorycaontainer2 col-12'>
            <div className='category-column col-12'>
              <div className="categoryinbox col-12">
                <div className="checkbox-title">
                <input type='checkbox' className='checkbox' onChange={handleCategoty}  value='생활'/>생활
                  </div>
                  <div className="checkbox-title">
                    <input type='checkbox' className='checkbox' onChange={handleCategoty} value='교통'/>교통
                  </div>
                  <div className="checkbox-title">
                    <input type='checkbox' className='checkbox' onChange={handleCategoty} value='법'/>법률
                  </div>
                  <div className="checkbox-title">
                    <input type='checkbox' className='checkbox' onChange={handleCategoty} value='의료'/>의료
                  </div>
                </div>
                <div className="categoryinbox col-12">
                  <div className="checkbox-title">
                    <input type='checkbox' className='checkbox' onChange={handleCategoty} value='교육'/>교육
                  </div>
                  <div className="checkbox-title">
                    <input type='checkbox' className='checkbox' onChange={handleCategoty} value='무언가1'/>세금
                  </div>
                  <div className="checkbox-title">
                    <input type='checkbox' className='checkbox' onChange={handleCategoty} value='무언가2'/>음식
                  </div>
                  <div className="checkbox-title">
                    <input type='checkbox' className='checkbox' onChange={handleCategoty} value='무언가3'/>뷰티
                  </div>
                </div>
            </div>
        </div>
            </div>
      </div> 
     <div>
          
          <div className='currentmenu'>
          </div>
         <div> 
          <button className='uploadBtn' onClick={uploadVideo}>영상 업로드</button>
         </div> 
          </div>
       
    </div>


  );
}

export default UploadVideo;