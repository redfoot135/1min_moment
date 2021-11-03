const db = require('../../../models');
const { tokenCheck } = require("../../token");

module.exports = async (req, res) => {
  const { id } = req.body;
  const authorization = req.headers['authorization'];
  if(!authorization) {
    //인증 정보가 없으면
    res.status(400).json({message:"Token has expired Please log in again"});
  }else {
    //토큰만 거르기
    const token = authorization.split(' ')[1];
    //토큰 검증 함수
    const check = await tokenCheck(token);
    //엑세스토큰 & 리프레시토큰 유효하지 않으면
    if(!check) {
      res.status(400).json({message:"Token has expired Please log in again"});
      //수정할 비디오 아이디 정보가 없으면
    }else if(!id){
      res.status(422).json({message: "insufficient parameters supplied"});
    }else {
      //수정할 정보
      const defalt = {};
      //for문을 돌려 있는 정보만 걸러내기
      for(let i in req.body) {
        if(i !== "id") {
          defalt[i] = req.body[i];
        }
      }
      //정보 업데이트
      db.video.update(defalt, {where: {id: id}});
      //응답
      res.status(200).send({
        data: req.body,
        message:"It is changed"
      })
    }
  }
}
