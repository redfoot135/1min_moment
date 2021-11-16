import { BrowserRouter, Route, Switch, useHistory, Link} from 'react-router-dom';
import React, {useState, useEffect, useCallback} from 'react';
import axios from "axios"
import './uploadVideo.css'
import  Addcategory2 from '../component/addcategory2'
import AWS from "aws-sdk";
import { v4 } from 'uuid';
// import { Divider } from '@material-ui/core';
import {useDropzone} from 'react-dropzone'
import { Button } from '@material-ui/core';
//const ffmpeg = require('fluent-ffmpeg');
//axios.defaults.withCredentials = true;


function UploadVideo({accessToken}) {



  const history = useHistory();


  //const [accessToken, setAccessToken] = useState(null);
  const [selectedFile, setSelectedFile] = useState('');
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  //const [checkList, setCheckList] = useState([])
  const [checkList2, setCheckList2] = useState([])
  const [currentCategory, setCurrentCategory]=useState('');
  const [showCategory, setshowCategory]=useState(false)
  const [imgData , setImgData] = useState(null)
  const { Dropzone } = require("dropzone");
 


  let checkList = []



  const confirmBtn = () =>{
    if(checkList.length>3){
     alert('dkdkdk')
     setshowCategory(!showCategory)
    }
    else{
    setshowCategory(!showCategory)
     setCurrentCategory(checkList.join())
     setCheckList2(checkList)
    // setCheckList([])
    }
}

const handleCategoty2=(e)=>{
  handleCategoty(e)
 }

  const handleCategoty = (e) =>{
         if(!checkList.includes(e.target.value)){
             if(e.target.checked === true){
             //setcategoryInfo(categoryInfo+`${e.target.value}`)
            // setCheckList([...checkList,e.target.value])
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
   const openCategory = (e) =>{
   
    setshowCategory(!showCategory)
   // setCheckList([])
     
    }


  

  const handleTargetTitle=(e)=>{
    setTitle(e.target.value)
  }


  const uploadFile = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file)
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

      S3.upload({
      Bucket: `${process.env.REACT_APP_BUCKET}/videos`,
      Key: `${videoName}.mp4`,
      ACL: 'public-read',
      Body: selectedFile,
      ContentType: 'video/mp4',
    }, (err, data) => {
      if (err) {
      }else {
      }
    })

      const videoLink =`https://${process.env.REACT_APP_BUCKET}.s3.ap-northeast-2.amazonaws.com/videos/${videoName}.mp4`
        
     // var buf = Buffer.from(imgData.replace(/^data:image\/\w+;base64,/, ""),'base64')
     const imgName = v4();
      var data = {
        Bucket: `${process.env.REACT_APP_BUCKET}/images`,
        Key: `${imgName}.jpeg`, 
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
      };
     

      S3.upload(data, function(err, data){
          if (err) { 
          } else {
          }
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
      ).then((res)=>{
       if(res.data.message==='Video registration is complete'){
        alert("성공")
       window.location.replace('/')
       }
       else{
        alert("실패")
       }
      
       }) 
      }
  }

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    //비디오태그를만들어요-> 태그를만들고 거기서 canvas 이용해서 비디오 특정부위를 따오는거에요.-> 안걸면 -> 네 
    
    //1안 썸네일 자동생성만들기 버튼
    //드래그하거나 파일 업로드하면 
    //비디오태그생성
    //그후 썸네일 생성하게끔 그런식으로 바꿀껀데 .. 이건 시간남으면 하겠습니다.
    // 편법쓴거라서 
    //잘대처해야 되지않을까 .. 싶네요
    setSelectedFile(acceptedFiles[0])
    var canvas = document.getElementById('canvas'); //이미지를 따오기
      var video = document.getElementById('video'); //video tag 넣기
      const file = acceptedFiles[0]; //파일정보를가져와서
      const videourl = URL.createObjectURL(file); //비디오 url생성
      video.setAttribute("src", videourl+'#t=20'); //비디오가만들어지는데 이거는 내장함수잖아요 ... 안되더라고요..
///////////////////////////
      video.onloadeddata = function(){ //이미지 따오는 함수 비디오가 업로드되엇을때 
        setTimeout(() => {
          let ctx = canvas.getContext('2d');  // 2d
          canvas.getContext('2d').drawImage(video, 0, 0, 300, 200); //그리기
         var img  = canvas.toDataURL("image/png") //url로변환하기
        setImgData(img)
        }, 3000);
        
      }
      
      
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  // function capture(){
  //   var canvas = document.getElementById('canvas');
  //   var video = document.getElementById('video');
  //   video.src = link
  //   canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
// }



//   const handleUploadViudeo = () => {
//     let categoryList = checkList.join()
//     if(categoryList.length===2 ){
//       categoryList.push('')
//       categoryList.push('')
//     }
//     else if(category.length===1){
//      categoryList.push('') 
//     }
//   axios
//   .post(
//     'https://localhost:4000/myvideo',{
//       title:selectedFile.name , video:link, thumbnail:`https://image.shutterstock.com/image-illustration/halloween-pumpkin-halo-angel-on-600w-1493264564.jpg`, category1:categoryList[0], category2:categoryList[1], category3:categoryList[2]
//     },
//     ).then((res)=>{
   
//      if(res.data.message==='Video registration is complete'){
//       alert("성공")
//      // window.location.replace('/')
//      }
//      else{
//       alert("실패")
//      }
    
//      })
   
// }





  return (
          
    <div className="add_file">      
      
      <div className="uploadTitle">
        <img className="uploadTitle-text" src="https://i.ibb.co/ZmbDdtD/image.png" alt="" />
      </div>
      <div>
        {/* <input type="file" onChange={uploadFile} className='addVideo'  /> */}
            <div className="filebox" > 
            <div>
          
            <video id='video'></video>
            </div>
             <div className='labelcontainer' {...getRootProps()}>
              <input  className="filebox"  type='file' {...getInputProps()} /> 
                {
                isDragActive ?
                <label className='label' >들어왔어요!</label> :
                <label className='label'><canvas id='canvas'></canvas></label> 
                }
              </div>
              
            </div>
            
            <div className='videoInfo'>
          <div className="upload-holder">
            <input className="upload-name" value={selectedFile.name} placeholder={'파일이름'}/>
          </div>
          <div className="upload-holder">
              <input className="upload-title" type='text' onChange={handleTargetTitle} value={title} placeholder={'제목'}/>
          </div>
              <Button className='addcategory_upload' onClick= {openCategory}>카테고리설정</Button>   
              {/* {showCategory === true ?
          (<Addcategory2 confirmBtn={confirmBtn} handleCategoty={handleCategoty}/>)
          :
          null} */}
          <div>
        <input type='checkbox' className='checkbox' onChange={handleCategoty}  value='생활'/>생활
        <input type='checkbox' className='checkbox' onChange={handleCategoty} value='교통'/>교통
        <input type='checkbox' className='checkbox' onChange={handleCategoty} value='법'/>법
        </div>
        <div>
        <input type='checkbox' className='checkbox' onChange={handleCategoty} value='의료'/>의료
        <input type='checkbox' className='checkbox' onChange={handleCategoty} value='교육'/>교육
        <input type='checkbox' className='checkbox' onChange={handleCategoty} value='무언가1'/>세금
        </div>
        <div>
        <input type='checkbox' className='checkbox' onChange={handleCategoty} value='무언가2'/>음식
        <input type='checkbox' className='checkbox' onChange={handleCategoty} value='무언가3'/>뷰티
        <input type='checkbox' className='checkbox' onChange={handleCategoty} value='무언가4'/>육아
        </div>
            </div>
      </div> 
     <div>
          
          <div className='currentmenu'>{currentCategory}</div>
         <div> 
          <button className='uploadBtn' onClick={uploadVideo}>영상 업로드</button>
         </div> 
          </div>
       
    </div>


  );
}

export default UploadVideo;