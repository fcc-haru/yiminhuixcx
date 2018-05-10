const { mysql } = require('../qcloud')
// 登录授权接口
module.exports = async function (ctx) {
  var userId = ctx.request.body.userId;
  console.log("aaa" + userId);
  var data = await mysql("customerMaster").where({ userId: userId, upDateInfo:"new"});

  ctx.response.body= {
    msg: data
  }
}