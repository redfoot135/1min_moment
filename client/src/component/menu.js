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
       <div className='tab' onClick={openModal}>메뉴</div>
     : 
       <div className='tab2' onClick={openModal}>메뉴<div className='modalcontainer'>
                <div className='tablist' >마이페이지</div>
                {/* <Link to="/signup"> */}
                <div className='tablist' >카테고리</div>
                <div className='tablist' >비디오 업로드</div>
             {/* </Link> */}
         </div>
       </div >
        )
    }

    export default Menu;