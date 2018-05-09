const { mysql } = require('../qcloud')
// 登录授权接口
module.exports = async function (ctx) {
  var tel = ctx.request.body.tel || "";
  var pwd = ctx.request.body.pwd || "";
  var data = await mysql("userMaster").where({ telNumber: tel, possword: pwd });

  ctx.response.body = {
    msg: data
  }
}