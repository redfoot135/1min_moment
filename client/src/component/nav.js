import './nav.css'
import {Link} from 'react-router-dom';
import {useMediaQuery} from 'react-responsive'
import Menu from './menu'
import React, { useState,useEffect } from 'react';
function Nav({openSideBarlFunc , handleSignOut}){
    const [searchBox, setSearchBox]=useState(false)
    const isPc = useMediaQuery({
        query : "(min-width:768px)"
    })
    const isMobile = useMediaQuery({
        query : "(max-width:767px)"
    })
   const openSeachBox = () =>{
    setSearchBox(!searchBox)
   }

    return(
    <nav className='navContainer col-sm-12 '>
       
        <div className='navbar_left'> 
          <Link to={"/"}> 
              <img className='logo' src='https://i.ibb.co/YNTHNMR/Kakao-Talk-Photo-2021-11-10-16-41-47-removebg-preview.png'/>
          </Link>
            
            {isPc && <ul className = 'menu'>
                <li className='mypage' onClick={openSideBarlFunc}>마이페이지</li>
                <li className='category'>카테고리</li>
                <Link to={"/myuploadvideo"} style={{ textDecoration: 'none', color: "black" }}> 
                  <li className='postvideo'>비디오 업로드</li>
                </Link>
            </ul>}   
            {isMobile && <ul className = 'menu'>
                <Menu />
                {/* <li>menu</li> */}
                </ul>}
        </div>
        <div className='navbar_right'>
            { searchBox=== false ?
             (<div className= 'searchbox' onClick={openSeachBox}>검색</div>)
             :
             (<div className='seach_input_box'>
                 <div className= 'searchbox' onClick={openSeachBox}>검색</div><input type='text' />
             </div>)
            }
             <div className='signup' onClick={handleSignOut}>로그아웃</div>
        </div>
    </nav>
    )
}
export default Nav;
