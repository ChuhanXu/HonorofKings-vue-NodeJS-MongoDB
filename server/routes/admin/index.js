//写具体的路由
//导出一个函数，这个函数接受app对象，app对象是从server/index里传过来的，是一个express的实例
module.exports=app=>{
    const express = require('express')
    //express的子路由,用来完成一些增删改查的操作
    const router = express.Router()
    //Category 是一个mongo数据库的模型
    const Category = require('../../models/Category')
    //给router添加一个post方法，接口地址是categories
    router.post('/categories',async(req,res)=>{//categories是一个接口
        //涉及到把数据存进去，需要数据库了
        //使用Category的create方法去创建数据,数据来源是客户端提交过来的数据req.body
        //要使用req需要加上await和对应的中间件，中间件在server/index里添加
        const model = await Category.create(req.body)
        //发送给客户端，让客户端知道创建完成了
        res.send(model)

    })
    router.get('/categories',async(req,res)=>{
        //接受items，限制数量为10条
        const items = await Category.find().limit(10)
        //将items发送给客户端(前端)
        res.send(items)

    })
    //获取分类页详情的接口
    router.get('/categories/:id',async(req,res)=>{
        //接受items，限制数量为10条
        const model = await Category.findById(req.params.id)//id的参数来自于req.params.id
        //将items发送给客户端(前端)
        res.send(model)

    })
    //修改记录的接口
    router.put('/categories/:id',async(req,res)=>{//categories是一个接口
        const model = await Category.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)

    })
    //删除记录的接口,不需要返回值
    router.delete('/categories/:id',async(req,res)=>{//categories是一个接口
        await Category.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success: true
        })

    })
    //将子路由挂载上去
    app.use('/admin/api',router)

}
//定义分类接口