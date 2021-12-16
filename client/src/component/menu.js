import React, { useState } from 'react';
import './menu.css'
function Menu(){
    const[showTabModal, setshowTabModal ] = useState(false) 
      
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
       <div className='tab' onClick={openModal}><img className="menu-icon" src="https://i.ibb.co/ThFZQf9/Kakao-Talk-Photo-2021-11-13-01-59-17.png" alt='menu-icon'/></div>
     : 
       <div className='tab2' onClick={openModal}><img className="menu-icon" src="https://i.ibb.co/ThFZQf9/Kakao-Talk-Photo-2021-11-13-01-59-17.png" alt='menu-icon'/><div className='modalcontainer'>
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