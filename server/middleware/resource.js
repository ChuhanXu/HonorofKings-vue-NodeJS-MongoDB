module.exports= option =>{
    return async(req,res,next)=>{//async中有三个参数，说明async会调用next
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../models/${modelName}`)//给请求对象上挂载一个model属性
        next()
    }
}
