//写具体的路由

const { model } = require('../../models/Category')



module.exports=app=>{//导出一个函数，这个函数接受app对象，app对象是从server/index里传过来的，是一个express的实例
    const express = require('express')//express的子路由,用来完成一些增删改查的操作
    const router = express.Router({//这是一个资源路由
        mergeParams:true//让router可以访问到url参数resource
    })

    //新建列表接口
    router.post('/',async(req,res)=>{
        const model = await req.Model.create(req.body)
        res.send(model)//发送给客户端，让客户端知道创建完成了
    })


    //分类列表的接口
    //有的页面可能需要parent去查一些东西，有的不需要，所以既要满足通用性 又要满足扩展性 
    //比如，如果模型是Category，加一个populate来满足parent查询的需要
    //如果数据库里有关联字段的话，可以用populate查出来，查出来的不仅是一个id，而是一个完整对象，包含所有信息
    //通过setOptions
     router.get('/',async(req,res)=>{
     // const Model = require(`../../models/${rep.params.resource}`)
     // const modelName = require('inflection').classify(req.params.resource)
        const queryOptions = {}
            if(req.Model.modelName == 'Category'){//判断是否是'Category'
                queryOptions.populate='parent'
            }
        const items = await req.Model.find().setOptions(queryOptions).limit(10) 
        res.send(items)

    })


    //获取分类页详情的接口
    router.get('/:id',async(req,res)=>{
        const model = await req.Model.findById(req.params.id)//id的参数来自于req.params.id
        res.send(model)//将items发送给客户端(前端)
    })


    //修改记录的接口
    router.put('/:id',async(req,res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })


    //删除记录的接口,不需要返回值
    router.delete('/:id',async(req,res)=>{
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success: true
        })
    })


    //CRUD接口，使用包 inflection，转类名 categories(接口名)=>Category(模型名)
    //resource可以是任意字符例如 heroes，categories，items
    //async相当于一个中间件
    app.use('/admin/api/rest/:resource',async(req,res,next)=>{
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)//给请求对象上挂载一个model属性
        next()
    },router)


    //上传图片的接口
    //另一个路由，不属于api/rest了
    //安装专门用来上传数据的中间件multer npm i multer
    const multer = require('multer')
    const upload = multer({dest:__dirname+'/../../uploads'})//upload是一个中间件，路径从当前文件夹退两层，dirname 绝对地址 从根目录C://到当前文件夹的地址
    app.post('/admin/api/upload',upload.single('file'),async(req,res)=>{//file是图片二进制格式的字段名，upload.single 上传单个文件
        const file = req.file 
        file.url=`http://localhost:3000/uploads/${file.filename}`//file多了一个url属性，自己拼出来的一个地址
        res.send(file)

    })

    //1.通过前端将用户名和密码传上来
    //2.在这里校验，看看是否匹配成功，然后返回给前端一个密钥，让它保存这段密钥
    //通过这段密钥来证明自己是哪一个用户
    app.post('/admin/api/login',async(req,res)=>{
        //解构赋值
        const{username,password}=req.body
        //1.根据用户名找用户
        const AdminUser = require('../../models/AdminUser')//引用模型
        const user = await AdminUser.findOne({
            username:username//第一个username是模型数据库里的username，第二个username是解构的变量
            }).select('+password')//因为才开始密码设置的为false，无法获取，就无法完成校验，因此添加了('+password')
        //判断，如果用户存在校验密码，如果不存在报错
        if(!user){
            return res.status(422).send({//442是一个状态码，不是正常的200
                message:'用户不存在'
            })

        }
    
        //2.校验密码
        const isValid = require('bcrypt').compareSync(password,user.password)//
        if(!isValid){
            return res.status(422).send({
                message:'密码错误'
            })
        }
        //3.返回token
        const jwt = require('jsonwebtoken')
        //生成一个token
        const token = jwt.sign({id:user._id},app.get('secret'))//secret定义在全局中 index.js server
        res.send({token})
    })

}
