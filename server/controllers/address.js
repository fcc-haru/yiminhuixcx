const { mysql } = require('../qcloud')
// 登录授权接口
module.exports = async function (ctx) {
  var userId = ctx.request.body.userId;
  var data = await mysql("customerMaster").where({ userId: userId, upDateinfo:"new"});

  ctx.response.body = {
    msg: data
  }
}