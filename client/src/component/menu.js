import React, { useState } from 'react';
import './menu.css'
function Menu(){
    const[showTabModal, setshowTabModal ] = useState(false) 
    console.log('showTabmodal은123',showTabModal)
      
      const openModal = (e) => {
         e.stopPropagation()
          setshowTabModal(!showTabModal)
      }
      const handleClickOutside = ({ target }) => {
      
         if (showTabModal){
          setshowTabModal(!showTabModal);
         }
       };
       window.addEventListener("click", handleClickOutside);
    
    return (
        showTabModal === false ?
       <div className='tab'>
        <img onClick={openModal} src='https://i.ibb.co/s1wfvjz/Kakao-Talk-Photo-2021-10-14-17-44-47.png'/>
       </div>
     : 
       <div className='tab2'>
         <img onClick={openModal} src='https://i.ibb.co/s1wfvjz/Kakao-Talk-Photo-2021-10-14-17-44-47.png'/>
            <div className='modalcontainer'>
                <div className='tablist' >Mypage</div>
                {/* <Link to="/signup"> */}
                <div className='tablist' >Category</div>
                <div className='tablist' >AddVideo</div>
             {/* </Link> */}
         </div>
       </div >
        )
    }

    export default Menu;