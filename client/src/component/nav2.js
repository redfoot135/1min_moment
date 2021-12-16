import './nav.css'
import {Link,useHistory} from 'react-router-dom';
import React, { useState } from 'react';


function Nav2({openModalFunc,getSearch,searchInfo, setSearchInfo, onReset}){
    const history = useHistory();
   
    const [searchBox, setSearchBox]=useState(false)

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

       const handleKeyUp=(e)=> {
        if(e.key === "Enter") {
          return SearchClick()
        }
      }
  
    return(
    <nav className='navContainer col-12'>
      <div className="navbox col-md-9 col-11 ">
        <div className='navbar_left'>

        <Link to={"/"} onClick={onReset}> 
              <img className='logo' src='https://i.ibb.co/7RvGNZV/Kakao-Talk-Photo-2021-11-12-13-30-44-removebg-preview.png' alt='logo'/>
          </Link>
                <ul className = 'menu'>

                <Link  to='/main' style={{ textDecoration: 'none', color: "black" }} onClick={onReset}>
                <li className='category'>모든 꿀팁</li>
                </Link>

                </ul>   
            
        </div>
        <div className='navbar_right'>
            { searchBox=== false ?
             (<div className= 'searchbox' onClick={openSeachBox}>검색</div>)
             :
             (<div className='seach_input_box'>
                  <div className= 'searchbox' onClick={openSeachBox}>검색</div><input type='text'  className="search-input" onChange={searchHandleChange} onKeyUp={handleKeyUp} value={searchInfo}/><img className="search-icon" src="https://i.ibb.co/FgWPvVM/Kakao-Talk-Photo-2021-11-12-13-30-49-removebg-preview.png" alt='search-icon' onClick={SearchClick}/>
             </div>)
            }
             <div className='signup' onClick={openModalFunc} ><img className="login-icon" src="https://i.ibb.co/TtLvxmP/Kakao-Talk-Photo-2021-11-13-02-51-07-001-removebg-preview.png" alt='login-icon'/></div>
         </div>
        </div>
    </nav>
    )
}
export default Nav2;