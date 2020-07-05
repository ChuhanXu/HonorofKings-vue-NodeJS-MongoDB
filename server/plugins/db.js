//数据库的插件
module.exports=app=>{
    //引用mongoose
    const mongoose = require("mongoose")
    //用mongoose去链接mongodb
    //127.0.0.1:27017 数据库端口
    //node-vue-moba 数据库名称
    mongoose.connect ('mongodb://127.0.0.1:27017/node-vue-moba',{
        //一个数据库链接的参数
        useNewUrlParser: true,
        useUnifiedTopology: true

    })

}