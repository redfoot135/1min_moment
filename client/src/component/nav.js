import './nav.css'
import {Link} from 'react-router-dom';
import {useMediaQuery} from 'react-responsive'
import Menu from './menu'
import React, { useState,useEffect } from 'react';
function Nav({openSideBarlFunc , handleSignOut}){
    const [searchBox, setSearchBox]=useState(false)
    const isPc = useMediaQuery({
        query : "(min-width:1000px)"
    })
    const isMobile = useMediaQuery({
        query : "(max-width:999px)"
    })
   const openSeachBox = () =>{
    setSearchBox(!searchBox)
   }

    return(
    <nav className='navContainer col-md-9 col-11'>
       
        <div className='navbar_left'> 
          <Link to={"/"}> 
              <img className='logo' src='https://i.ibb.co/YNTHNMR/Kakao-Talk-Photo-2021-11-10-16-41-47-removebg-preview.png'/>
          </Link>
            
            {isPc && <ul className = 'menu'>
                <li className='mypage' onClick={openSideBarlFunc}>마이페이지</li>
                <li className='category'>모든 꿀팁</li>
                <Link to={"/uploadvideo"} style={{ textDecoration: 'none', color: "black" }}> 
                  <li className='postvideo'>꿀팁 올리기</li>
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
                 <div className= 'searchbox' onClick={openSeachBox}>검색</div><input type='text' className="search-input"/><img className="search-icon" src="https://i.ibb.co/zbXCQFj/Kakao-Talk-Photo-2021-11-11-16-13-38-removebg-preview-1.png"/>
             </div>)
            }
             <div className='signup' onClick={handleSignOut}>로그아웃</div>
        </div>
    </nav>
    )
}
export default Nav;
