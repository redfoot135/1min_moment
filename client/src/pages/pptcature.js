
  
  
  
  
      
     var canvas = document.getElementById('canvas'); //canvas 선언
      var video = document.getElementById('video');  //video 선언
      const file = acceptedFiles[0]; //file
      const videourl = URL.createObjectURL(file); //비디오의 파일
      video.setAttribute("src", videourl+'#t=20');;  //video 태그 생성







      video.onloadeddata = function(){ 
        console.log(canvas)
          canvas.getContext('2d').drawImage(video, 0, 0, 250, 140); //이미지크기설정
         var img  = canvas.toDataURL("image/png")  //base 64 -> /png저장
        setImgData(img) //이미지 state에저장
        
      }