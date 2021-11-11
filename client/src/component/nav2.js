import './nav.css'
import {useMediaQuery} from 'react-responsive'
import Menu from './menu'
import React, { useState,useEffect } from 'react';
function Nav2({openModalFunc}){
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
    <nav className='navContainer col-sm-12'>
       
        <div className='navbar_left'>
        <img className='logo' src='https://i.ibb.co/YNTHNMR/Kakao-Talk-Photo-2021-11-10-16-41-47-removebg-preview.png'/>
                <ul className = 'menu'>
                    <li className='category'>category</li>
                </ul>   
            
        </div>
        <div className='navbar_right'>
            { searchBox=== false ?
             (<div className= 'searchbox' onClick={openSeachBox}>검색</div>)
             :
             (<div className='seach_input_box'>
                 <div className= 'searchbox' onClick={openSeachBox}>검색</div><input type='text' />
             </div>)
            }
             <div className='signup' onClick={openModalFunc} >로그인</div>
        </div>
    </nav>
    )
}
export default Nav2;
