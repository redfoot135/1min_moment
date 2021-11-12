
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

        <div className='frisrow'>
        <div><input type='checkbox' className='checkbox'  class="form-check-input position-static" onChange={handleCategoty2} value='생활'/>생활</div>
        <div> <input type='checkbox' className='checkbox' class="form-check-input position-static" onChange={handleCategoty2} value='교통'/>교통</div>
        </div>

        <div className='secondrow'>
        <div> <input type='checkbox' className='checkbox'class="form-check-input position-static" onChange={handleCategoty2} value='법'/>법</div>
        <div><input type='checkbox' className='checkbox' class="form-check-input position-static" onChange={handleCategoty2} value='의료'/>의료</div> 
        </div>

        <div className='thirdrow'>
        <div> <input type='checkbox' className='checkbox' class="form-check-input position-static" onChange={handleCategoty2} value='교육'/>교육</div> 
        <div><input type='checkbox' className='checkbox' class="form-check-input position-static" onChange={handleCategoty2} value='무언가1'/>무언가1</div> 
        </div>

        <div className='forthrow'>
        <div><input type='checkbox' className='checkbox' class="form-check-input position-static" onChange={handleCategoty2} value='무언가2'/>무언가2</div> 
        <div><input type='checkbox' className='checkbox' class="form-check-input position-static" onChange={handleCategoty2} value='무언가3'/>무언가3</div> 
        </div>
        <div className='fithrow'>
        <div><input type='checkbox' className='checkbox' class="form-check-input position-static" onChange={handleCategoty2} value='무언가4'/>무언가4</div> 
        </div>


        <div>
        <button className ='btn' onClick={confirmBtn}>확인</button>
        </div>
    </div>
    )

    
}