module.exports= option =>{
    const jwt = require('jsonwebtoken')
    const assert = require("http-assert")
    const AdminUser = require('../models/AdminUser')

    return async(req,res,next)=>{//校验用户是否登录

        const token= String(req.headers.authorization||'').split(' ').pop()//split(' '),根据空格进行分割
        assert(token,401,'请提供jwt token')

        const { id } = jwt.verify(token,req.app.get('secret'))
        assert(id,401,'无效的jwt')

        req.user = await AdminUser.findById(id)
        assert(req.user,401,'请先登录')
        
        await next()//会继续执行下面的函数
    }
}