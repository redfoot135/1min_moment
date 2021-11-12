import './nav.css'
import {useMediaQuery} from 'react-responsive'
import {Link,useHistory} from 'react-router-dom';
import Menu from './menu'
import React, { useState,useEffect,useContext } from 'react';


function Nav2({openModalFunc,}){
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
    setSearch(true)
    console.log(searchResult) 
    console.log(search)
    console.log('hi')
    history.push("/main")
    
   }
  
    return(
    <nav className='navContainer col-md-9 col-11'>
       
        <div className='navbar_left'>
        <img className='logo' src='https://i.ibb.co/YNTHNMR/Kakao-Talk-Photo-2021-11-10-16-41-47-removebg-preview.png'/>
                <ul className = 'menu'>

                <Link  to='/main'>
                <li className='category'>모든 꿀팁</li>
                </Link>

                </ul>   
            
        </div>
        <div className='navbar_right'>
            { searchBox=== false ?
             (<div className= 'searchbox' onClick={openSeachBox}>검색</div>)
             :
             (<div className='seach_input_box'>
                 <div className= 'searchbox' onClick={openSeachBox}>검색</div><input type='text'  onChange={searchHandleChange} />
             </div>)
            }
             <div className='signup' onClick={openModalFunc} >로그인</div>
        </div>
    </nav>
    )
}
export default Nav2;
