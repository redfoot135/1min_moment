import './nav2.css'
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
    <nav className='navbar'>
       
        <div className='navbar_left'>
        <img className='logo' src='https://i.ibb.co/7tYjgkr/1.png'/>
                <ul className = 'menu'>
                    <li className='category'>category</li>
                </ul>   
            
        </div>
        <div className='navbar_right'>
            { searchBox=== false ?
             (<div className= 'searchbox' onClick={openSeachBox}>search</div>)
             :
             (<div className='seach_input_box'>
                 <div className= 'searchbox' onClick={openSeachBox}>search</div><input type='text' />
             </div>)
            }
             <div className='signup' onClick={openModalFunc} >login</div>
        </div>
    </nav>
    )
}
export default Nav2;
