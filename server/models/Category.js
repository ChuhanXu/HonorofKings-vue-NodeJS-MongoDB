const mongoose = require('mongoose')
//建立数据库的结构
const schema = new mongoose.Schema({
    //字段 name
    name:{type:String}
})
//将这个模型导出的是一个mongo的模型，哪里需要用就去哪里导入，数据库的增删改查需要用
module.exports = mongoose.model('Category',schema)