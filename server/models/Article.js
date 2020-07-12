const mongoose = require('mongoose')
//建立数据库的结构
const schema = new mongoose.Schema({
    
    title:{type:String}, 
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],//确定该文章属于news的那个儿子，公告，新闻
    body:{type:String}, 

})
//将这个模型导出的是一个mongo的模型，哪里需要用就去哪里导入，数据库的增删改查需要用
module.exports = mongoose.model('Article',schema)