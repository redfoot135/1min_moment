import React from 'react'

const MyPageList = ({ list, openSideBarlFunc }) => {
    return (
        <div className="mypage-list">
            <p className="mypage-list-text" onClick={ openSideBarlFunc }>{list.name}</p>
        </div>
    )
}

export default MyPageList
