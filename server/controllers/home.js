const { mysql } = require('../qcloud')
// 登录授权接口
module.exports = async function (ctx) {

  var data = await mysql("productMaster").select("*");

  ctx.body = {
    msg: data
  }
}