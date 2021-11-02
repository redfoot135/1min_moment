
import { useState } from 'react'
import './addcategory.css'
//생활,교통,법,의료,교육, 

export default function Addcategory({confirmBtn,handleCategoty}){
//const [showCategory, setShowCategory]=useState(false)
  const [categoryInfo, setcategoryInfo]= useState('')
  const [checkList, setCheckList] = useState([])

   const handleCategoty2=(e)=>{
    handleCategoty(e)
   }


    return(
    <div className='categorycaontainer'>
        <div>
        <input type='checkbox' className='checkbox' onChange={handleCategoty2} value='생활'/>생활
        <input type='checkbox' className='checkbox' onChange={handleCategoty2} value='교통'/>교통
        <input type='checkbox' className='checkbox' onChange={handleCategoty2} value='법'/>법
        </div>
        <div>
        <input type='checkbox' className='checkbox' onChange={handleCategoty2} value='의료'/>의료
        <input type='checkbox' className='checkbox' onChange={handleCategoty2} value='교육'/>교육
        <input type='checkbox' className='checkbox' onChange={handleCategoty2} value='무언가1'/>무언가1
        </div>
        <div>
        <input type='checkbox' className='checkbox' onChange={handleCategoty2} value='무언가2'/>무언가2
        <input type='checkbox' className='checkbox' onChange={handleCategoty2} value='무언가3'/>무언가3
        <input type='checkbox' className='checkbox' onChange={handleCategoty2} value='무언가4'/>무언가4
        </div>
        <div>
        <button onClick={confirmBtn}>확인</button>
        </div>
    </div>
    )

    
}