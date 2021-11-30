import './nav.css'
import {Link,useHistory} from 'react-router-dom';
import {useMediaQuery} from 'react-responsive'
import Menu from './menu'
import React, { useState,useEffect } from 'react';

function Nav({handleSignOut,getSearch,searchInfo,setSearchInfo,onReset}){
    const history = useHistory();
    const [searchBox, setSearchBox]=useState(false)
    const [tabStatus, setTabStatus]=useState({display:'none'})
    const [isTabOpen, setIstabOpen]=useState(false) 
    const isPc = useMediaQuery({
        query : "(min-width:610px)"
    })
    const isMobile = useMediaQuery({
        query : "(max-width:609px)"
    })
   const openSeachBox = () =>{
    setSearchBox(!searchBox)
   }

    const searchHandleChange=(e)=>{
      setSearchInfo(e.target.value)
   }
   const SearchClick=()=>{
    getSearch(searchInfo)
    history.push({pathname: "/main" })
   }
    
   const showTabList=()=>{
    if(isTabOpen===false){
    setTabStatus(null)
    setIstabOpen(true)
    }
    else{
        setIstabOpen(false)
        setTabStatus({display:'none'})
    }
   }

   const handleKeyUp=(e)=> {
    if(e.key === "Enter") {
      return SearchClick()
    }
  }


    return(
        
    <nav className='navContainer col-12'>
      <div className="navbox col-md-9 col-11 ">
        <div className='navbar_left'> 
          <Link to={"/"}> 
              <img className='logo' src='https://i.ibb.co/7RvGNZV/Kakao-Talk-Photo-2021-11-12-13-30-44-removebg-preview.png' onClick={onReset}/>
          </Link>
            
            {isPc && <ul className = 'menu'>
                <Link to={"/mypage"} style={{ textDecoration: 'none', color: "black" }} onClick={onReset}>
                  <li className='mypage'>마이페이지</li>
                </Link>
                <Link  to={'/main'} style={{ textDecoration: 'none', color: "black" }} onClick={onReset}>
                <li className='category'>모든 꿀팁</li>
                </Link>
                <Link to={"/uploadvideo"} style={{ textDecoration: 'none', color: "black" }} onClick={onReset}> 
                  <li className='postvideo'>꿀팁 올리기</li>
                </Link>
            </ul>}   
            {isMobile && <ul className = 'menu' onClick={showTabList}>
                <img className='menu-icon' src='https://i.ibb.co/ThFZQf9/Kakao-Talk-Photo-2021-11-13-01-59-17.png"'/>
                {/* <li>menu</li> */}
                </ul>}
        </div>
        <div className='navbar_right'>
            {/* { searchBox=== false ?
             (<div className= 'searchbox' onClick={openSeachBox}>검색</div>)
             : */}
             <div className='seach_input_box'>
                <input type='text'  className="search-input" onChange={searchHandleChange} onKeyUp={handleKeyUp} value={searchInfo}/><img className="search-icon" src="https://i.ibb.co/FgWPvVM/Kakao-Talk-Photo-2021-11-12-13-30-49-removebg-preview.png" onClick={SearchClick}/>

             </div>
            {/* } */}
             <div className='signout' onClick={handleSignOut}><img className="logout-icon" src="https://i.ibb.co/SdZL2Zm/Kakao-Talk-Photo-2021-11-13-02-51-07-002-removebg-preview.png"/></div>
        </div>
        
        </div>
        {isMobile && <ul className = 'menu_bottom'>
                <div className='menu_container'>
                <Link to={"/mypage"} style={{ textDecoration: 'none', color: "black" }}> <div style={tabStatus}>마이페이지   </div> </Link>
                <Link  to='/main' style={{ textDecoration: 'none', color: "black" }}> <div style={tabStatus}  className='menu_bottom_info'>모든 꿀팁</div> </Link>
                <Link to={"/uploadvideo"} style={{ textDecoration: 'none', color: "black" }}>  <div style={tabStatus} className='menu_bottom_info'> 꿀팁 올리기</div></Link>
                </div>
                </ul>}
    </nav>
    )
}
export default Nav;
