const { mysql } = require('../qcloud')
// 登录授权接口
module.exports = async function (ctx) {
  var tel = ctx.request.body.tel || "";
  var pwd = ctx.request.body.pwd || "";
  var hasUser = await mysql("userMaster").where({ telNumber: tel});
  if (hasUser.length > 0){
    var hasPwd = await mysql("userMaster").where({ telNumber: hasUser[0].telNumber, possword: pwd, });
    if (hasPwd.length > 0){
      ctx.response.body = {
        msg:"Success",
        data:hasPwd
      }
    }else{
      ctx.response.body = {
        msg:"Error",
        data: hasUser
      }
    }
  }else{
    await mysql("userInfo").insert({ 
      telNumber: tel, 
      password: pwd,
      wechatNumber:"",
      createDate:new Date()
      })
    ctx.response.body = {
      msg: "User not found",
      data:[]
    }
  } 
}