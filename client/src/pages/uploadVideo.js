import { BrowserRouter, Route, Switch, useHistory, Link} from 'react-router-dom';
import React, {useState, useEffect, useCallback} from 'react';
import axios from "axios"
import './uploadVideo.css'
import  Addcategory from '../component/addcategory'
import AWS from "aws-sdk";
import { v4 } from 'uuid';
// import { Divider } from '@material-ui/core';
import {useDropzone} from 'react-dropzone'
//axios.defaults.withCredentials = true;


function UploadVideo() {

  const history = useHistory();

  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [checkList, setCheckList] = useState([])
  const [currentCategory, setCurrentCategory]=useState('');
  const [showCategory, setshowCategory]=useState(false)
  const { Dropzone } = require("dropzone");

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
   const openCategory = (e) =>{
   
    setshowCategory(!showCategory)
    setCheckList([])
    console.log(showCategory)
    console.log(currentCategory)
     
    }


  const handleAccessToken = (tokenData) => {
    setAccessToken(tokenData)
  }

  const handleUserInfo = (userData) => {
    setIsLogin(true)
    setUserInfo(userData)
  }

  const handleTargetTitle=(e)=>{
    setTitle(e.target.value)
  }


  const uploadFile = (e) => {
    const file = e.target.files[0];
    console.log(file)
    setSelectedFile(file)
  }

  const uploadVideo = async () => {
    const S3 = new AWS.S3({
      region: 'ap-northeast-2',
      accessKeyId: process.env.REACT_APP_ACCESSKEY,
      secretAccessKey: process.env.REACT_APP_SECRETKEY,
    });

    const videoName = v4();

      S3.upload({
      Bucket: process.env.REACT_APP_BUCKET,
      Key: `${videoName}.mp4`,
      ACL: 'public-read',
      Body: selectedFile,
      ContentType: 'video/mp4',
    }, (err, data) => {
      if (err) {
        console.log("전송 에러");
      }else {
        console.log('sucess')
        console.log(data)
      }
    })

      const link =`https://${process.env.REACT_APP_BUCKET}.s3.ap-northeast-2.amazonaws.com/${videoName}.mp4`
      console.log("링크는 ", link) 
  }

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles)
    setSelectedFile(acceptedFiles[0].name)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  

  return (
          
    <div className="add_file">      
      
      
      <div>
        {/* <input type="file" onChange={uploadFile} className='addVideo'  /> */}
            <div className="filebox" > 
          
             <div {...getRootProps()}>
              <input  className="filebox"  type='file' {...getInputProps()} /> 
                {
                isDragActive ?
                <label >ssss</label> :
                <label >클릭 or 드래그로 업로드하기!</label> 
                }
              </div>
              
            </div>
            
            <div className='videoInfo'>
          <div>
            <input className="upload-name" value={selectedFile}/>
          </div>
          <div>
              <input className="upload-title" type='text' onChange={handleTargetTitle} value={title}/>
          </div>
              <div className='addbox' onClick= {openCategory}>카테고리설정</div>   
            </div>
      </div> 
     <div>
          {showCategory === true ?
          (<Addcategory confirmBtn={confirmBtn} handleCategoty={handleCategoty}/>)
          :
          null}
          <div className='currentmenu'>{currentCategory}</div>
         <div> 
          <button className='uploadBtn' onClick={uploadVideo}>영상 업로드</button>
         </div> 
          </div>
       
    </div>


  );
}

export default UploadVideo;