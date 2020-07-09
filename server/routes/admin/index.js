//写具体的路由

const { model } = require('../../models/Category')

//导出一个函数，这个函数接受app对象，app对象是从server/index里传过来的，是一个express的实例
module.exports=app=>{
    const express = require('express')
    //express的子路由,用来完成一些增删改查的操作
    //这是一个资源路由
    const router = express.Router({
        mergeParams:true//让router可以访问到url参数resource
    })
    //Category 是一个mongo数据库的模型
    //const Category = require('../../models/Category')
    //给router添加一个post方法，接口地址是categories
    // const modelName = require('inflection').classify(rep.params.resource)
        // const Model = require(`../../models/${modelName}`)
        //categories是一个接口
        //涉及到把数据存进去，需要数据库了
        //使用Category的create方法去创建数据,数据来源是客户端提交过来的数据req.body
        //要使用req需要加上await和对应的中间件，中间件在server/index里添加
    router.post('/',async(req,res)=>{
        
        const model = await req.Model.create(req.body)
        //发送给客户端，让客户端知道创建完成了
        res.send(model)

    })
    //分类列表的接口
    router.get('/',async(req,res)=>{
        //接受items，限制数量为10条
        //如果数据库里有关联字段的话，可以用populate查出来，查出来的不仅是一个id，而是一个完整对象，包含所有信息
        //转类名 categories->Category npm i inflection
        //const Model = require(`../../models/${rep.params.resource}`)
        // const modelName = require('inflection').classify(req.params.resource)
        // //return res.send({modelName})
        // const Model = require(`../../models/${modelName}`)
        const queryOptions = {}
        if(req.Model.modelName == 'Category'){
            //既满足通用性 又要满足扩展性 可以自己去查东西，如果模型是Category，加一个populate
            queryOptions.populate='parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        //将items发送给客户端(前端)
        res.send(items)

    })
    //获取分类页详情的接口
    router.get('/:id',async(req,res)=>{
        //接受items，限制数量为10条
        // const modelName = require('inflection').classify(rep.params.resource)
        // const Model = require(`../../models/${modelName}`)
        const model = await req.Model.findById(req.params.id)//id的参数来自于req.params.id
        //将items发送给客户端(前端)
        res.send(model)

    })
    //修改记录的接口
    router.put('/:id',async(req,res)=>{//categories是一个接口
        // const modelName = require('inflection').classify(rep.params.resource)
        // const Model = require(`../../models/${modelName}`)
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)

    })
    //删除记录的接口,不需要返回值
    router.delete('/:id',async(req,res)=>{//categories是一个接口
        // const modelName = require('inflection').classify(rep.params.resource)
        // const Model = require(`../../models/${modelName}`)
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success: true
        })

    })
    //将子路由挂载上去
    //resource可以是任意字符例如 heroes，categories，items
    //async相当于一个中间件
    app.use('/admin/api/rest/:resource',
    async(req,res,next)=>{
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)//给请求对象上挂载一个model属性
        next()
    }

    ,router)
    //上传图片的接口
    //另一个路由 
    const multer = require('multer')
    //路径从当前文件夹退两层，dirname 绝对地址 从根目录C://到当前文件夹的地址
    const upload = multer({dest:__dirname+'/../../uploads'})
    //file是图片二进制格式的字段名，upload.single 上传单个文件
    app.post('/admin/api/upload',upload.single('file'),async(req,res)=>{
        //安装专门用来上传数据的中间件multer npm i multer
        const file = req.file
        //file多了一个url属性，自己拼出来的一个地址
        file.url=`http://localhost:3000/uploads/${file.filename}`
        res.send(file)

    })

}
//定义分类接口