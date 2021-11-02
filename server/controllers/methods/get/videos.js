require("dotenv").config();
const db = require('../../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports =  (req, res) => {
  const { search, category1, category2, category3 } = req.query;

  // 검색어도 없고 카테고리 1,2,3 이 없을경우에는 전체 비디오 정보를 보내주기
  if(!search && !category1 && !category2 && !category3) {
    const data = db.video.findAll({})

    //무한 스크롤로 짤라서 데이터를 넘겨줘야하는지 아니면 그냥 보내도 되는지 아직 모르겠음
    return res.status(200).json({
      data: data,
      message:"completed the inquiry"
    })
  // 검색어는 없고 category1만 온다면  
  }else if(!search && category1 && !category2 && !category3) {
    const data = db.video.findAll({
      where: { category1: category1 }
    })

    //무한 스크롤로 짤라서 데이터를 넘겨줘야하는지 아니면 그냥 보내도 되는지 아직 모르겠음
    return res.status(200).json({
      data: data,
      message:"completed the inquiry"
    })
  // 검색어는 없고 category1,categoty2 가 같이 오고 category3는 없다면  
  }else if(!search && category1 && category2 && !category3) {
    const data = db.video.findAll({
      where: { category1: category1, category2: category2 }
    })


    //무한 스크롤로 짤라서 데이터를 넘겨줘야하는지 아니면 그냥 보내도 되는지 아직 모르겠음
    return res.status(200).json({
      data: data,
      message:"completed the inquiry"
    })
    //검색어는 없고 category1,category2,category3 가 전부 온다면 
  }else if(!search && category1 && category2 && category3) {
    const data = db.video.findAll({
      where: { category1: category1, category2: category2, category3: category3}
    })


    //무한 스크롤로 짤라서 데이터를 넘겨줘야하는지 아니면 그냥 보내도 되는지 아직 모르겠음
    return res.status(200).json({
      data: data,
      message:"completed the inquiry"
    })
  }
  

   //이제 검색어가 들어오고 category1만 들어온다면
   if(search && category1 && !category2 & !category3) {
     const data = db.video.findAll({
       where: {
         category1: category1,
         title: {
           [Op.like]: "%" + search + "%"
         }
       }
     })

    //  const data = categoryData.findAll({
    //    where: { title: categoryData.title.indexOf(`${search}`) }
    //  })

     //무한 스크롤로 짤라서 데이터를 넘겨줘야하는지 아니면 그냥 보내도 되는지 아직 모르겠음
     return res.status(200).json({
      data: data,
      message:"completed the inquiry"
    })
    //검색어가 들어오고 category1과 category2 들어오고 category3는 없을떄
   }else if(search && category1 && category2 & !category3) {
    const data = db.video.findAll({
      where: {
        category1: category1,
        category2: category2,
        title: {
          [Op.like]: "%" + search + "%"
        }
      }
    })

    // const data = categoryData.findAll({
    //   where: { title: categoryData.title.indexOf(`${search}`) }
    // })

    //무한 스크롤로 짤라서 데이터를 넘겨줘야하는지 아니면 그냥 보내도 되는지 아직 모르겠음
    return res.status(200).json({
      data: data,
      message:"completed the inquiry"
    })

    //검색어가 들어오고 category1과 category2와 category3가 다들어오면
   }else if(search && category1 && category2 & !category3) {
    const data = db.video.findAll({
      where: {
        category1: category1,
        category2: category2,
        category3: category3,
        title: {
          [Op.like]: "%" + search + "%"
        }
      }
    })

    // const data = categoryData.findAll({
    //   where: { title: categoryData.title.indexOf(`${search}`) }
    // })

   //무한 스크롤로 짤라서 데이터를 넘겨줘야하는지 아니면 그냥 보내도 되는지 아직 모르겠음 
    return res.status(200).json({
      data: data,
      message:"completed the inquiry"
    })
   }

   //마지막 검색어만 들어온다면 검색어에 맞게 데이터를 보내주는 분기
   if(search && !category1 && !category2 && !category3) {
     const data = db.video.findAll({
       where: {
         title: {
           [Op.like]: "%" + search + "%"
         }
       }
     })

    //무한 스크롤로 짤라서 데이터를 넘겨줘야하는지 아니면 그냥 보내도 되는지 아직 모르겠음
     return res.status(200).json({
       data: data,
       message:"completed the inquiry"
     })
   }

}