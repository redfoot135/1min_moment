import './nav.css'
import {Link,useHistory} from 'react-router-dom';
import {useMediaQuery} from 'react-responsive'
import Menu from './menu'
import React, { useState,useEffect } from 'react';

function Nav({openSideBarlFunc , handleSignOut,getSearch,searchInfo}){
    const history = useHistory();
    const [searchBox, setSearchBox]=useState(false)
    const [searchResult, setSearchResult]=useState('')
    const isPc = useMediaQuery({
        query : "(min-width:1000px)"
    })
    const isMobile = useMediaQuery({
        query : "(max-width:999px)"
    })
   const openSeachBox = () =>{
    setSearchBox(!searchBox)
   }
   const searchHandleChange=(e)=>{
    getSearch(e.target.value)
    
    console.log(searchResult) 
    history.push({pathname: "/main" })
    if(searchInfo===''){
        history.push('/')
    }
   }

    return(
    <nav className='navContainer col-md-9 col-11'>
       
        <div className='navbar_left'> 
          <Link to={"/"}> 
              <img className='logo' src='https://i.ibb.co/7RvGNZV/Kakao-Talk-Photo-2021-11-12-13-30-44-removebg-preview.png'/>
          </Link>
            
            {isPc && <ul className = 'menu'>
                <Link to={"/mypage"} style={{ textDecoration: 'none', color: "black" }}>
                  <li className='mypage'>마이페이지</li>
                </Link>
                <Link  to='/main'>
                <li className='category'>모든 꿀팁</li>
                </Link>
                <Link to={"/myuploadvideo"} style={{ textDecoration: 'none', color: "black" }}> 
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
                 <div className= 'searchbox' onClick={openSeachBox}>검색</div><input type='text' onChange={searchHandleChange} className="search-input"/><img className="search-icon" src="https://i.ibb.co/FgWPvVM/Kakao-Talk-Photo-2021-11-12-13-30-49-removebg-preview.png"/>

             </div>)
            }
             <div className='signup' onClick={handleSignOut}>로그아웃</div>
        </div>
    </nav>
    )
}
export default Nav;
