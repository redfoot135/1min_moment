import { BrowserRouter, Route, Switch, useHistory, Link} from 'react-router-dom';
import React, {useState, useEffect, useCallback} from 'react';
import axios from "axios"
import './uploadVideo.css'
import  Addcategory from '../component/addcategory'
import AWS from "aws-sdk";
import { v4 } from 'uuid';
// import { Divider } from '@material-ui/core';
import {useDropzone} from 'react-dropzone'
//const ffmpeg = require('fluent-ffmpeg');
//axios.defaults.withCredentials = true;


function UploadVideo({userInfo}) {

  const history = useHistory();


  const [accessToken, setAccessToken] = useState(null);
  const [selectedFile, setSelectedFile] = useState('');
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [checkList, setCheckList] = useState([])
  const [checkList2, setCheckList2] = useState([])
  const [currentCategory, setCurrentCategory]=useState('');
  const [showCategory, setshowCategory]=useState(false)
  const [imgData , setImgData] = useState(null)
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
     setCheckList2(checkList)
     console.log('체크리스트!!!!!',checkList)
     setCheckList([])
     console.log(checkList2)
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


  

  const handleTargetTitle=(e)=>{
    setTitle(e.target.value)
  }


  const uploadFile = (e) => {
    const file = e.target.files[0];
    console.log(file)
    setSelectedFile(file)
  }

  const uploadVideo =  () => {
    let buf =Buffer.from(imgData.replace(/^data:image\/\w+;base64,/, ""),'base64')
    console.log(buf)
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
        console.log("전송 에러");
      }else {
        console.log('sucess')
        console.log(data)
        console.log(checkList2)
      }
    })

       console.log('img22222222222',imgData)
      const videoLink =`https://${process.env.REACT_APP_BUCKET}.s3.ap-northeast-2.amazonaws.com/videos/${videoName}.mp4`
      console.log("링크는 ", videoLink) 
        
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
            console.log(err);
            console.log('Error uploading data: ', data); 
          } else {
            console.log('successfully uploaded the image!');
          }
      });
      const imgLink =`https://${process.env.REACT_APP_BUCKET}.s3.ap-northeast-2.amazonaws.com/images/${imgName}.jpeg`
      console.log('링크2',imgLink)
    axios
    .post(
      'https://localhost:80/myvideo',{
        title:title , video:videoLink, thumbnail:imgLink, category1:checkList2[0], category2:checkList2[1], category3:checkList2[2]
      },{
        headers: {
          authorization: `Bearer ${userInfo.accessToken}`,
        "Content-Type" : "application/json"   
      },
      withCredentials: true
    }
      ).then((res)=>{
           console.log(res)
       if(res.data.message==='Video registration is complete'){
        alert("성공")
       // window.location.replace('/')
       }
       else{
        alert("실패")
       }
      
       }) 

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
    console.log(acceptedFiles)
    setSelectedFile(acceptedFiles[0])
    var canvas = document.getElementById('canvas'); //이미지를 따오기
      var video = document.getElementById('video'); //video tag 넣기
      const file = acceptedFiles[0]; 
      const videourl = URL.createObjectURL(file); 
      video.setAttribute("src", videourl); //비디오가만들어지는데 이거는 내장함수잖아요 ... 안되더라고요..

      video.onloadeddata = function(){ //이미지 따오는 함수 비디오가 업로드되엇을때 
        console.log(canvas)
        setTimeout(() => {
          let ctx = canvas.getContext('2d');  // 2d
          canvas.getContext('2d').drawImage(video, 0, 0, 250, 140); //그리기
         var img  = canvas.toDataURL("image/png") //url로변환하기
        console.log('imgimgimgimgimgs',img) 
        console.log('heeeeeeeeeee',video.videoHeight)
        console.log('wiiiiiiiiiiid',video.videoWidth)     
        setImgData(img)
        console.log('22223838585858',imgData)
        }, 1000);
        
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
//          console.log(res)
   
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
      
      
      <div>
        {/* <input type="file" onChange={uploadFile} className='addVideo'  /> */}
            <div className="filebox" > 
          <canvas id='canvas' width="250" height="140" ></canvas>
          <video  id='video' ></video>
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
            <input className="upload-name" value={selectedFile.name}/>
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