require("dotenv").config();
const db = require('../../../models');
const { Op } = require('sequelize');

// 단어로만 지금 검색은 되지만  문장으로는 검색이 지금 안되고있어야함 후에 생각해볼일!
// 마지막 커서를 받아와서 
// 그커서를 넣어주고 
//
module.exports = async (req, res) => {
  console.log('123',req.query.cursor)
  const { search, cursor } = req.query;
  const category = req.query.category.split("/");
  let query = {};
  if(category.length === 3) {
    query = 
    {
      [Op.and]: 
      {
        category1: { [Op.or]: category}, category2: {[Op.or]: category},category3: {[Op.or]: category}
      }
    }
  }else if(category.length === 2) {
    query = 
    {
      [Op.or]: 
      [
        { [Op.and]: {category1: {[Op.or]: category}, category2: {[Op.or]: category}}},
        { [Op.and]: {category1: {[Op.or]: category}, category3: {[Op.or]: category}}},
        { [Op.and]: {category2: {[Op.or]: category}, category3: {[Op.or]: category}}}
      ]
    }
  }else if(category.length === 1) {
    query = 
    {
      //[Op.or]: [{category1: category , category2: category, category3: category },{id : {[Op.between]: [cursor,cursor+10]}}],
      //{[Op.gt]:cursor}}],
      [Op.or]: {category1: category , category2: category, category3: category },
   
    }
    
  }
  if(search) {
    query.title = {[Op.like]: "%" + search + "%"}
  }

  const userdata = await db.video.findAll({ where: {id:{[Op.lt]:[cursor]}} , limit:10,order: [
      ['createdAt', 'DESC']
  ]
    } );

  res.json(userdata)  
}