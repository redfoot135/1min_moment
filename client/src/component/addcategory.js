
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

        <div className='category-row'>
          <div>
            <div className='category-con row-fluid'>
            <div className='category-box col-12 col-md-6'>
                <input type='checkbox' className='checkbox'  class="form-check-input position-static" onChange={handleCategoty2} value='생활'/>생활
                <input type='checkbox' className='checkbox' class="form-check-input position-static" onChange={handleCategoty2} value='교통'/>교통
              </div>
              <div className='category-box col-12 col-md-6'>
                <input type='checkbox' className='checkbox'class="form-check-input position-static" onChange={handleCategoty2} value='법'/>법률
                <input type='checkbox' className='checkbox' class="form-check-input position-static" onChange={handleCategoty2} value='의료'/>의료
              </div>
            </div>
            <div className='category-con row-fluid'>
              <div className='category-box col-12 col-md-6'>
                <input type='checkbox' className='checkbox' class="form-check-input position-static" onChange={handleCategoty2} value='교육'/>교육 
                <input type='checkbox' className='checkbox' class="form-check-input position-static" onChange={handleCategoty2} value='무언가1'/>세금
              </div>
              <div className='category-box col-12 col-md-6'>
                <input type='checkbox' className='checkbox' class="form-check-input position-static" onChange={handleCategoty2} value='무언가2'/>음식
                <input type='checkbox' className='checkbox' class="form-check-input position-static" onChange={handleCategoty2} value='무언가3'/>뷰티
              </div>
            </div> 
          </div>
          <div>
          <button className ='category-btn' onClick={confirmBtn}>확인</button>
          </div>
        </div>
    </div>
  )   
}