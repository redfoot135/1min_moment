export default function Addcategory2({confirmBtn,handleCategoty}){
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
        <input type='checkbox' className='checkbox' onChange={handleCategoty2} value='무언가1'/>세금
        </div>
        <div>
        <input type='checkbox' className='checkbox' onChange={handleCategoty2} value='무언가2'/>음식
        <input type='checkbox' className='checkbox' onChange={handleCategoty2} value='무언가3'/>뷰티
        <input type='checkbox' className='checkbox' onChange={handleCategoty2} value='무언가4'/>육아
        </div>
        <div>
        <button onClick={confirmBtn}>확인</button>
        </div>
    </div>
    )

    
}