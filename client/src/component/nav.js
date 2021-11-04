import './nav.css'
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
    <nav className='navbar'>
       
        <div className='navbar_left'>
            <img className='logo' src='https://i.ibb.co/7tYjgkr/1.png'/>
            
            {isPc && <ul className = 'menu'>
                <li className='mypage' onClick={openSideBarlFunc}>mypage</li>
                <li className='category'>category</li>
                <li className='postvideo'>addvidieo</li>
            </ul>}   
            {isMobile && <ul className = 'menu'>
                <Menu />
                {/* <li>menu</li> */}
                </ul>}
        </div>
        <div className='navbar_right'>
            { searchBox=== false ?
             (<div className= 'searchbox' onClick={openSeachBox}>search</div>)
             :
             (<div className='seach_input_box'>
                 <div className= 'searchbox' onClick={openSeachBox}>search</div><input type='text' />
             </div>)
            }
             <div className='signup' onClick={handleSignOut}>singnout</div>
        </div>
    </nav>
    )
}
export default Nav;
