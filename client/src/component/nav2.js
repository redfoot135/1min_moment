import './nav.css'
import {useMediaQuery} from 'react-responsive'
import {Link,useHistory} from 'react-router-dom';
import Menu from './menu'
import React, { useState,useEffect,useContext } from 'react';


function Nav2({openModalFunc,openSideBarlFunc , handleSignOut,getSearch,searchInfo}){
    const history = useHistory();
   

    const [searchBox, setSearchBox]=useState(false)
    const [searchResult, setSearchResult]=useState('')
    const [search, setSearch]=useState(false)
    const isPc = useMediaQuery({
        query : "(min-width:768px)"
    })
    const isMobile = useMediaQuery({
        query : "(max-width:767px)"
    })


    const openSeachBox = () =>{
        setSearchBox(!searchBox)
       }
       const searchHandleChange=(e)=>{
           
        
        setSearchResult(e.target.value)
        
        
       }
       const SearchClick=()=>{
        getSearch(searchResult)
        history.push({pathname: "/main" })
       }
  
    return(
    <nav className='navContainer col-12'>
      <div className="navbox col-md-9 col-11 ">
        <div className='navbar_left'>

        <Link to={"/"}> 
              <img className='logo' src='https://i.ibb.co/7RvGNZV/Kakao-Talk-Photo-2021-11-12-13-30-44-removebg-preview.png'/>
          </Link>
                <ul className = 'menu'>

                <Link  to='/main' style={{ textDecoration: 'none', color: "black" }}>
                <li className='category'>모든 꿀팁</li>
                </Link>

                </ul>   
            
        </div>
        <div className='navbar_right'>
            { searchBox=== false ?
             (<div className= 'searchbox' onClick={openSeachBox}>검색</div>)
             :
             (<div className='seach_input_box'>
                  <div className= 'searchbox' onClick={openSeachBox}>검색</div><input type='text'  className="search-input" onChange={searchHandleChange}/><img className="search-icon" src="https://i.ibb.co/FgWPvVM/Kakao-Talk-Photo-2021-11-12-13-30-49-removebg-preview.png" onClick={SearchClick}/>
             </div>)
            }
             <div className='signup' onClick={openModalFunc} ><img className="login-icon" src="https://i.ibb.co/TtLvxmP/Kakao-Talk-Photo-2021-11-13-02-51-07-001-removebg-preview.png"/></div>
         </div>
        </div>
    </nav>
    )
}
export default Nav2;